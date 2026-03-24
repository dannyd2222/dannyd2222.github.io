import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandButton from './ExpandButton';
import Popover from '@mui/material/Popover';

interface ReferenceIconProps {
  icon?: any,
  description?: any,
  href?: string,
  expandContent?: any,
}

export default function ReferenceIcon({ icon: Icon, description = "", href = "", expandContent }: ReferenceIconProps) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'icon-popover' : undefined;

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" height={48}>
        <Icon />
        <Box ml={1} />
        <Typography>
          {href ? <Link href={href} target="_blank" color="inherit">{description}</Link> : description}
        </Typography>
        {expandContent ? <ExpandButton expanded={isExpanded} onClick={handleClick} /> : null}
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {expandContent}
      </Popover>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
  }
}))
