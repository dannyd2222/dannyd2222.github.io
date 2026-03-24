import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, IconButton, TextField, Alert, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import validate from 'validate.js';
import emailjs from 'emailjs-com';

const USER_ID = "osjvnUxRhaIdVX_QR";
const TEMPLATE_ID = "template_5dmy9xh";
const SERVICE_ID = "service_75ednvg";

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
};


export default function ContactForm() {
  const [open, setOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

        emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          e.target,
          USER_ID
        )
        .then((res) => setOpen(true))
        .catch(error => console.log('FAILED...', error));

        setFormState(formState => ({
          ...formState,
          isValid: false,
          values: {
            name: '',
            email: ''
          },
          touched: {},
          errors: {
            name: [],
            email: []
          }
        }));
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: '',
      email: ''
    },
    touched: {},
    errors: {
      name: [],
      email: []
    },
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (e) => {
    e.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]:
          e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value,
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };
  //console.log(formState);

  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  }

  //console.log(hasError('name'));
  return (
    <div>
      <Box
        sx={{
          margin: "auto",
          width: "80%",
          minWidth: 320
        }}
      >
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Grazie, ho ricevuto la tua mail! Ti risponderò appena possibile.
          </Alert>
        </Collapse>
      </Box>
      <form
        name="contact-form"
        style={{padding: 10}}
        onSubmit={sendEmail}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <strong>Scrivimi!</strong>
            </Typography>
            <Typography variant="h6" color="textSecondary" align="center">
              Inserisci almeno il tuo nome e una mail a cui poterti ricontattare
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="Name"
              label="Name *"
              variant="outlined"
              size="medium"
              name="name"
              id="name"
              fullWidth
              helperText={
                hasError('name') ? formState.errors.name[0] : null
              }
              error={hasError('name')}
              onChange={handleChange}
              type="text"
              value={formState.values.name || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              placeholder="E-mail"
              label="E-mail *"
              variant="outlined"
              size="medium"
              name="email"
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              error={hasError('email')}
              onChange={handleChange}
              type="email"
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Message"
              label="Message"
              variant="outlined"
              size="medium"
              name="message"
              fullWidth
              multiline
              type="message"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              size="large"
              variant="contained"
              type="submit"
              color="primary"
              disabled={!formState.isValid}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
