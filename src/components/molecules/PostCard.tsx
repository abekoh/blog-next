import { Card, CardActionArea, CardContent, makeStyles, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { TagResponse } from "../../types/tag";
import { dateToString } from "../../utils/dateToString";
import Link from "../utils/Link";
import TagList from "./TagList";

const useStyles = makeStyles(() => ({
    title: {
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
    dateText: {
        color: grey[500],
    },
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
        <Link href={`/posts/${id}`} className={classes.link}>
            <Card sx={{ display: 'flex' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5">{title}</Typography>
                        <Typography variant="subtitle1" className={classes.dateText}>{dateToString(publishedAt)}</Typography>
                        <TagList tags={tags} linkable={false} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default PostCard;
