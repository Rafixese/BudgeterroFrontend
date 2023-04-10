import React, {useState, useContext} from 'react';
import {useTranslation} from "react-multi-lang";
import {
    Box,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AlertDock from "./alertDock";
import {login_api} from "../utils/api";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {AlertsContext} from '../mainViews/App'

const LoginPage = () => {
    const t = useTranslation()
    const alertsContext = useContext(AlertsContext)
    const pushAlert = alertsContext.pushAlert
    const clearAlerts = alertsContext.clearAlerts
    const alerts = alertsContext.alerts;

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [checkedRememberMe, setCheckedRememberMe] = React.useState(false);
    const navigate = useNavigate()

    const handleLogin = async (response) => {
        // console.log(response)
        const body = await response.json()
        // console.log(body)
        if (response.ok === false) {
            if(body.non_field_errors != null) {
                pushAlert('warning', t('errors.login_failed', {error:body.non_field_errors}))
            }
            else{
                pushAlert('error', t('errors.unexpected', {error:body}))
            }
        }
        else {
            let exp = {}
            if(checkedRememberMe) {
                let exp_date = new Date()
                exp = { expires: exp_date }
                exp_date.setFullYear(new Date().getFullYear() + 1)
            }
            removeCookie('token')
            setCookie('token', body.token, exp)
            navigate('/dashboard')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        clearAlerts()
        if(!event.currentTarget.reportValidity()) {
            pushAlert('error', t('errors.form_invalid'));
            return
        }
        const data = new FormData(event.currentTarget);
        // console.log({
        //     username: data.get('username'),
        //     password: data.get('password'),
        // });
        login_api(data).then(response => handleLogin(response))
    };

    return (
        <Container component="main" maxWidth="xs">
            <AlertDock variant={"outlined"} alerts={alerts}></AlertDock>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t('login.signin')}
                </Typography>
                <Box id={"form-signin"} component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={t('login.username')}
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('login.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" defaultChecked={checkedRememberMe} onChange={() => setCheckedRememberMe(current => !current)} />}
                        label={t('login.rememberme')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('login.signin')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {t('login.forgot')}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {t('login.no_account')}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;