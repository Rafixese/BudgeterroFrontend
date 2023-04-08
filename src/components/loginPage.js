import React from 'react';
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

const LoginPage = () => {
    const t = useTranslation()

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!event.currentTarget.reportValidity()) return
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
    };

    return (
        <Container component="main" maxWidth="xs">
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
                        control={<Checkbox value="remember" color="primary" />}
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