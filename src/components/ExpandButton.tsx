import React from 'react';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ExpandButton({ expanded = false, onClick = (e: React.MouseEvent<HTMLButtonElement>) => { }, label = "show more" }) {
  const classes = useStyles();

  return (
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={label}
      size="large">
      <ExpandMoreIcon />
    </IconButton>
  );
}

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))
