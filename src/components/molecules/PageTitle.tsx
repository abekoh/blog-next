import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    title: {
    }
}));

type Props = {
    title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h4" m={1.5} >{title}</Typography>
        </>
    );
};

export default PageTitle;
