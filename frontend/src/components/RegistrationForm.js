import React from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterToEMP } from '../redux/actions';


const defaultTheme = createTheme();


// Validation schema
const validationSchema = Yup.object({
  username: Yup.string().required('User Name is required'),
  companyname: Yup.string().required('Company Name is required'),
  department: Yup.string().required('Department is required'),
  mobile: Yup.string().required('Mobile is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegistrationForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handSubmit = async (values) => {
    if (values.email !== "" && values.password !== "" && values.username !== "") {
      try {
        const response = await dispatch(RegisterToEMP(values));
        if (response.message === "Register successful") {
          alert(response.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  return (


    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("/test.jpg")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register Employee
            </Typography>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="username"
                    as={TextField}
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    helperText={touched.username ? errors.username : ''}
                    error={touched.username && Boolean(errors.username)}
                  />
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    helperText={touched.email ? errors.email : ''}
                    error={touched.email && Boolean(errors.email)}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    helperText={touched.password ? errors.password : ''}
                    error={touched.password && Boolean(errors.password)}
                  />
                  <Field
                    name="companyname"
                    as={TextField}
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    helperText={touched.companyname ? errors.companyname : ''}
                    error={touched.companyname && Boolean(errors.companyname)}
                  />

                  <Field
                    name="department"
                    as={TextField}
                    label="Department"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    helperText={touched.department ? errors.department : ''}
                    error={touched.department && Boolean(errors.department)}
                  />
                  <Field
                    name="mobile"
                    type="number"
                    as={TextField}
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    helperText={touched.mobile ? errors.mobile : ''}
                    error={touched.mobile && Boolean(errors.mobile)}
                    inputProps={{ maxLength: 10 }} // Set max length here
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                  <Grid container style={{ margin: '10px' }}>
                    <Grid item>
                      <Link onClick={() => navigate('/login')} variant="body2">
                        {"Already had account? Login here"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
};

export default RegistrationForm;
