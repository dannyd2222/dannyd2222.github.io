import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import settings from '../data.json';

const useStyles = makeStyles((theme) => ({
  list: {
    minWidth: 250
  }
}))

const menus = {
  readBooks: 'readBooks',
}

export default function ApplicationBar({ onClose = () => { } }) {
  const classes = useStyles();
  const readBooks = settings.recommendedBooks;
  const [opened, setOpened] = useState({});

  const isMenuOpened = (menu: string) => Boolean(opened[menu])
  const toggleMenu = (menu: string) => setOpened({ ...opened, [menu]: !opened[menu] })

  const readBooksOpened = isMenuOpened(menus.readBooks)
  return (
    <div className={classes.list}>
      <List subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          @{settings.companyName}
        </ListSubheader>
      }>

        {/* ===== Login ===== */}
        <ListItem button>
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <Link href={"/login"} color="inherit" component={NextLink}>
            <ListItemText primary={"Login"} />
          </Link>
        </ListItem>

      </List>
    </div>
  );
}

interface MenuItemProps {
  level: number,
  title: string,
  github?: string,
  web?: string,
  npm?: string,
  nuget?: string,
}
