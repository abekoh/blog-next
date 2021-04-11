import { Grid, GridSize, makeStyles } from "@material-ui/core";

import { PostResponse } from "../../types/post";
import PostCard from "../molecules/PostCard";

const useStyles = makeStyles(() => ({
}));

type Props = {
    posts: PostResponse[];
    pickuped?: boolean;
};

const PostCardList: React.FC<Props> = ({ posts, pickuped = false }) => {
    const classes = useStyles();
    const gridItemProp: {
        xs?: GridSize,
        sm?: GridSize,
        md?: GridSize,
        lg?: GridSize,
        xl?: GridSize
    } = pickuped
            ? { md: 6, sm: 12 }
            : { xs: 12 };
    return <>
        <Grid container spacing={1} justifyContent="flex=start">
            {posts.map((post) => {
                return post.title && (
                    <Grid item {...gridItemProp}>
                        <PostCard id={post.id} title={post.title} publishedAt={post.publishedAt} tags={post.tags || []} />
                    </Grid>)
            })}
        </Grid>
    </>;
};

export default PostCardList;
