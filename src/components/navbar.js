import React, {useState} from 'react';
import {useTranslation} from 'react-multi-lang';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { useTheme } from '@mui/material/styles';

const Navbar = (props) => {
    const navigate = useNavigate()
    const t = useTranslation(props.language)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const theme = useTheme();

    const pages = [
        {
            name: t('navbar.home'),
            login_required: false,
            onclick: () => {
                navigate('/')
            }
        },
        {
            name: t('navbar.dashboard'),
            login_required: true,
            onclick: () => {
                navigate('dashboard')
            }
        }];
    const settings = [
        {
            name: t('navbar.account'),
            login_required: true,
            display_when_auth: true,
            onclick: () => {
                navigate('account')
            }
        },
        {
            name: theme.palette.mode === 'light' ? t('navbar.toggle_color_mode_dark') : t('navbar.toggle_color_mode_light'),
            login_required: false,
            display_when_auth: true,
            onclick: () => {
                props.set_color_mode(theme.palette.mode === 'light' ? 'dark' : 'light')
            }
        },
        {
            name: t('navbar.logout'),
            login_required: true,
            display_when_auth: true,
            onclick: () => {
                removeCookie('token')
                navigate('/')
            }
        },
        {
            name: t('navbar.login'),
            login_required: false,
            display_when_auth: false,
            onclick: () => {
                navigate('login')
            }
        }
    ];


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [anchorElLang, setAnchorElLang] = useState(null);
    const openedLangMenu = Boolean(anchorElLang);
    const handleClickLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElLang(event.currentTarget);
    };
    const handleCloseLanguageMenu = () => {
        setAnchorElLang(null);
    };

    return (
        <AppBar id={'navbar'} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Budgeterro
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => {
                                if (page.login_required && (cookies['token'] == null)) return null;
                                return <MenuItem key={page.name} onClick={() => {
                                    handleCloseNavMenu();
                                    page.onclick()
                                }}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            })}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Budgeterro
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => {
                            if (page.login_required && (cookies['token'] == null)) return null;
                            return <Button
                                key={page.name}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    page.onclick()
                                }}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.name}
                            </Button>
                        })}
                    </Box>

                    <IconButton
                        // id="basic-button"
                        // aria-controls={openedLangMenu ? 'basic-menu' : undefined}
                        // aria-haspopup="true"
                        // aria-expanded={openedLangMenu ? 'true' : undefined}
                        sx={{color: theme.palette.primary.contrastText}}
                        onClick={handleClickLanguageMenu}
                    >
                        <LanguageIcon></LanguageIcon>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElLang}
                        open={openedLangMenu}
                        onClose={handleCloseLanguageMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            props.set_app_language('gb')
                            handleCloseLanguageMenu();
                        }}>English</MenuItem>
                        <MenuItem onClick={() => {
                            props.set_app_language('pl')
                            handleCloseLanguageMenu();
                        }}>Polski</MenuItem>
                    </Menu>

                    <Box sx={{flexGrow: 0}}>
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="" src="/static/images/avatar/1.jpg"/>
                        </IconButton>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => {

                                if (
                                    (setting.login_required && (cookies['token'] == null))
                                    ||
                                    (!setting.display_when_auth && cookies['token'] != null)
                                ) return null;
                                return <MenuItem key={setting.name} onClick={() => {
                                    handleCloseUserMenu();
                                    setting.onclick()
                                }}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;