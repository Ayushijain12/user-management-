import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Deposits from './Deposits';
import Orders from './Orders';
import {  Avatar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { addMethod } from 'yup';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(53, 162, 235)',
        },
    ],
};


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [profileopen, setProfileOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const user = localStorage.getItem('user');
    const IsSuperAdmin = localStorage.getItem('isSuper');

    console.log('user', user,IsSuperAdmin);
    let UserArray = [] ;
    
    if(IsSuperAdmin) {
        UserArray = [...JSON.parse(user)];

    }else{
        UserArray = JSON.parse(user);
    }
    console.log('UserArray', UserArray);

    const navigate = useNavigate();


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {IsSuperAdmin ? `Hello ${UserArray[0].name} !!` : 'Admin'}
                        </Typography>
                        <IconButton onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                        }} color="inherit">
                            <Badge color="secondary">
                                <LogoutIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <React.Fragment>
                            <ListItemButton onClick={() => { setProfileOpen(false) }}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                            <ListItemButton onClick={() => { setProfileOpen(true) }}>
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </React.Fragment>
                        <Divider sx={{ my: 1 }} />
                        <React.Fragment>
                            <ListSubheader component="div" inset>
                                Saved reports
                            </ListSubheader>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Current month" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Last quarter" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Year-end sale" />
                            </ListItemButton>
                        </React.Fragment>
                    </List>
                </Drawer>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    {profileopen ?
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 700,
                                            width: 1200
                                        }}
                                    >
                                        <Grid container spacing={4} alignItems="center">
                                            <Grid item xs={12} sm={4} container justifyContent="center">
                                                <Avatar
                                                    // src={""}
                                                    alt={UserArray[0].name}
                                                    sx={{ width: 150, height: 150 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant="h4" gutterBottom>
                                                    {UserArray[0].name}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Email: {UserArray[0].email}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Phone Number: {UserArray[0].mobile}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Address: {UserArray[0].department}
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Company: {UserArray[0].companyname}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<EditIcon />}
                                                    style={{ marginTop: '20px' }}
                                                >
                                                    Edit Profile
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                        :
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <Bar options={options} data={data} />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <Deposits />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Orders />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>}
                </Box>
            </Box>
        </ThemeProvider>
    );
}