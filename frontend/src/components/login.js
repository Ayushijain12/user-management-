import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { loginToEmp } from '../redux/actions'; 

const defaultTheme = createTheme();
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


export default function SignInSide() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handSubmit = async (values) => {
        if (values.email !== "" && values.password !== "") {
            try {
                const response = await dispatch(loginToEmp(values));
                console.log(response, 'response');
                if (response.message === "Login successful") {
                    alert(response.message);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate('/dashboard'); 
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
                            Login Employee
                        </Typography>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
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
                                        helperText={touched.password ? errors.password : ''}
                                        error={touched.password && Boolean(errors.password)}
                                    />
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Login
                                    </Button>
                                    <Grid container style={{ margin: '10px' }}>
                                        <Grid item>
                                            <Link onClick={() => navigate('/register')} variant="body2">
                                                {"Don't have an account? Sign Up"}
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
}