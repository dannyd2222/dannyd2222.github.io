import React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import settings from "../data.json";

export default function Copyright() {
  const websiteName = settings.companyName;
  const websiteUrl = settings.webSite;
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href={websiteUrl}>
        {websiteName}
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
