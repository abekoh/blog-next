import { Card, CardActionArea, CardContent, makeStyles, Typography } from "@material-ui/core";
import { TagResponse } from "../../types/tag";
import { dateToString } from "../../utils/dateToString";
import Link from "../utils/Link";
import TagList from "./TagList";

const useStyles = makeStyles(() => ({
    title: {
    }
}));

type Props = {
    id: string;
    title: string;
    publishedAt: Date;
    tags: TagResponse[];
};

const PostCard: React.FC<Props> = ({ id, title, publishedAt, tags }) => {
    const classes = useStyles();
    return (
        <Link href={`/posts/${id}`}>
            <Card sx={{ display: 'flex' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">{title}</Typography>
                        <Typography variant="subtitle1">{dateToString(publishedAt)}</Typography>
                        <TagList tags={tags} linkable={false} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default PostCard;
