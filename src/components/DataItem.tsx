import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import Hidden from '@mui/material/Hidden';
import Link from '@mui/material/Link';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ExpandButton from './ExpandButton';
import { getGoogleImageWithSize } from '../utils/googlePhotos';

export default function DataItem({ image = null, title = "", place = "", timePeriod = "", placeUrl = "", contentParagraphs = [] }) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isExpandable = contentParagraphs && contentParagraphs.length > 0;

  const imageWithSize = useMemo(() => getGoogleImageWithSize(image, 100), [image]);

  return (
    <Card className={classes.root}>

      <Box display="flex" width="100%" justifyContent="space-between">
        <CardMedia
          component="img"
          alt={title}
          width="100"
          image={imageWithSize}
          title={title}
          className={classes.image}
        />
        <Hidden smDown>
          <Content classes={classes} title={title} place={place} timePeriod={timePeriod} placeUrl={placeUrl} />
        </Hidden>

        {isExpandable ? <Actions isExpanded={isExpanded} setIsExpanded={setIsExpanded} /> : null}
      </Box>

      <Hidden smUp>
        <CustomDivider classes={classes} />
        <Box display="flex">
          <Content classes={classes} title={title} place={place} timePeriod={timePeriod} placeUrl={placeUrl} />
        </Box>
      </Hidden>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CustomDivider classes={classes} />
        <CardContent className={classes.content}>
          {contentParagraphs.map((it, index) => <Typography className={classes.paragraph} component="p" key={index}>{it}</Typography>)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const CustomDivider = ({ classes }) => {
  return <Divider className={classes.mobileDivider} orientation="horizontal" />
}

const Content = ({ classes, title, place, placeUrl, timePeriod }) => {
  return (<CardContent className={classes.content}>
    <Typography variant="h6" component="h2" noWrap>
      {title}
    </Typography>
    <PlaceLink placeUrl={placeUrl}>
      <Typography variant="body2" color="textSecondary" component="p" noWrap>
        @{place} {" "}
        <Typography component="i">
          {timePeriod}
        </Typography>
      </Typography>
    </PlaceLink>
  </CardContent>)
}

const PlaceLink = ({ placeUrl, children }) => {
  if (placeUrl) return <Link href={placeUrl} target="_blank" color="inherit">{children}</Link>
  return <>{children}</>
}

const Actions = ({ isExpanded, setIsExpanded }) => {
  return (<CardActions>
    <ExpandButton expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
  </CardActions>)
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  content: {
    flexGrow: 1,
    overflow: "hidden"
  },
  mobileDivider: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  image: {
    width: 50,
    height: 50,
    margin: theme.spacing(2)
  },
  paragraph: {
    textIndent: theme.spacing(1),
    textAlign: "justify"
  }
}))
