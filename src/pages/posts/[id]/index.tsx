import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import { PostResponse } from "../../../types/post";
import { client } from "../../../utils/api";
import { toStringId } from "../../../utils/toStringId";

type StaticProps = {
  post: PostResponse;
  draftKey?: string;
};
type PageProps = InferGetServerSidePropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { post } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const body = post.isHtml ? post.htmlBody : post.body;

  return (
    <>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <main>
        <header>
          <h1>{post.title}</h1>
        </header>
        {body && (
          <article
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
        )}
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context;
  if (!params?.id) {
    throw new Error("Error: not found");
  }
  const id = toStringId(params.id);
  try {
    const post = await client.v1.posts._id(id).$get({
      query: {
        fields: "id,title,body,htmlBody,isHtml",
      },
    });
    return {
      props: { post },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Page;
