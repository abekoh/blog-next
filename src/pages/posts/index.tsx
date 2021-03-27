import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { PostListResponse } from "../../types/post";
import { client } from "../../utils/api";

type StaticProps = {
    postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
    const { postList } = props;
    return (
        <main>
            <section>
                <h2>投稿一覧</h2>
                <ul>
                    {postList.contents.map((post) => (
                        <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
    const postList = await client.v1.posts.$get({
        query: { fields: "id,title", orders: "-publishedAt" },
    });
    return {
        props: { postList },
        revalidate: 60,
    };
};


export default Page;