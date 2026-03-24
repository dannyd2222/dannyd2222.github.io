import React, { useState } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
//import Link from '@mui/material/Link';
import AppBar from "../components/Appbar";
import Copyright from "../components/Copyright";

export default function Login() {
  // Hardcoded credentials
  const hcEmail = "johndoe@email.com";
  const hcPw = "password";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openErrMsg, setOpenErrMsg] = useState(false);

  const handleChange = (event) => {
    event.target.name == 'email' ? setEmail(event.target.value) : setPassword(event.target.value);
  };

  const handleClick = () => {
    email == hcEmail && password == hcPw ? console.log("Access granted") : setOpenErrMsg(true);
  };

  return (
    <div>
      <Head>
        <title>DDN Login</title>
      </Head>
      <AppBar parent="/" />
      <Container maxWidth="md">
        <Box
          sx={{
            width: "100%",
            maxWidth: 340,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <div>
            <Typography variant="h5" align="center">
              <strong>Benvenuto!</strong>
            </Typography>

            <Box m={1} />

            <Typography variant="subtitle1" color="textSecondary" align="center">
              Accedi per modificare il contenuto del profilo.
            </Typography>
          </div>

          <Box m={1} />

          <Box
            sx={{
              margin: "auto",
              width: "80%",
              minWidth: 320
            }}
          >
            <Collapse in={openErrMsg}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenErrMsg(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Email o passwor errati!
              </Alert>
            </Collapse>
          </Box>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              onChange={handleChange}
              value={email}
            />
          </FormControl>

          <Box m={1} />

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
              value={password}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={handleClick}>Log in</Button>
        </Box>

        <Box my={4} display="flex" flexDirection="column" alignItems="center">
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
