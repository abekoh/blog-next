import { Grid, makeStyles } from "@material-ui/core";
import { PostResponse } from "../../types/post";
import PostCard from "../molecules/PostCard";

const useStyles = makeStyles(() => ({
}));

type Props = {
    posts: PostResponse[];
};

const PostCardList: React.FC<Props> = ({ posts }) => {
    const classes = useStyles();
    return <>
        <Grid container spacing={1}>
            {posts.map((post) => {
                return post.title && (
                    <Grid item xs={12}>
                        <PostCard id={post.id} title={post.title} publishedAt={post.publishedAt} tags={post.tags || []} />
                    </Grid>)
            })}
        </Grid>
    </>;
};

export default PostCardList;
