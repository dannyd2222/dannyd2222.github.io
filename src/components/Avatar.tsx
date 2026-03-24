import React, { useMemo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import MuiAvatar from '@mui/material/Avatar';
import { getGoogleImageWithSize } from '../utils/googlePhotos';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  avatar: {
    width: theme.spacing(40),
    height: theme.spacing(30),
  },
}))


export default function Avatar({imgSrc, imgAlt }: {imgSrc:any, imgAlt:any}) {
  const classes = useStyles();
  const avatarWithSize = useMemo(() => getGoogleImageWithSize(imgSrc, 480), [imgSrc]);

  return (
    <div className={classes.root}>
      <MuiAvatar alt={imgAlt} src={avatarWithSize} className={classes.avatar} />
    </div>
  );
}
