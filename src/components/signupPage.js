import React, {useContext, useState} from 'react';
import {Box, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material'
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import {useTranslation} from "react-multi-lang";
import {signup_api} from "../utils/api";
import {useNavigate} from "react-router-dom";
import {AlertsContext} from "../mainViews/App";
import AlertDock from "./alertDock";

const SignupPage = () => {
        const t = useTranslation()
        const navigate = useNavigate()
        const alertsContext = useContext(AlertsContext)
        const pushAlert = alertsContext.pushAlert
        const clearAlerts = alertsContext.clearAlerts
        const alerts = alertsContext.alerts;

        const handleSignup = async (response) => {
            // console.log(response)
            const body = await response.json()
            // console.log(body)
            if (response.ok === false) {
                if (body.non_field_errors != null) {
                    pushAlert('warning', t('errors.login_failed', {error: body.non_field_errors}))
                }
                else if (body.username != null) {
                    pushAlert('warning', t('errors.login_failed', {error: body.username}))
                }
                else {
                    pushAlert('error', t('errors.unexpected', {error: JSON.stringify(body)}))
                }
            } else {
                pushAlert('success', t('login.succ_signup'))
                navigate('/login')
            }

        }
        const handleSubmit = (event) => {
            event.preventDefault();
            clearAlerts()
            if (!event.currentTarget.reportValidity()) {
                pushAlert('error', t('errors.form_invalid'));
                return
            }
            const data = new FormData(event.currentTarget);
            // console.log({
            //     username: data.get('username'),
            //     email: data.get('email'),
            //     password: data.get('password'),
            // });
            signup_api(data).then(response => handleSignup(response))
        };

        return (
            <Container component="main" maxWidth="xs">
                <AlertDock variant={"outlined"} alerts={alerts}></AlertDock>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t('login.signup')}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label={t('login.username')}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label={t('login.emailaddr')}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label={t('login.password')}
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            {t('login.signup')}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="login" variant="body2">
                                    {t('login.have_acc')}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        );
    }
;

export default SignupPage;