import React from "react";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../store/Authorization.store' 
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("E-mail inválido.").required("O campo email é obrigatório."),
    password: Yup.string().required("O campo senha é obrigatório").min(8, "Senha muito curta"),
  })
  
  const {email, password} = useSelector((state: RootState) => state.userDefault)

  return (
      <Formik 
      initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
          console.log(values.email, values.password)
          if(values.email === email && values.password === password){
            dispatch(login('testes'))
            localStorage.setItem('authorized', 'true');
            navigate('/')
          }else{
            alert('Login ou senha incorretos');
            actions.resetForm();
            localStorage.setItem('authorized', 'false');
          }   
      }}
      >
  {formik => (
    <ThemeProvider theme={theme}>
      <Container sx={{margin: 'auto', height: '100%'}}component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            paddingTop: 30,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{color:'text.primary'}}>
            Login
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{bgcolor:'white', borderRadius: 2}}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{bgcolor:'white', borderRadius: 2}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )}
  </Formik>
  )
}