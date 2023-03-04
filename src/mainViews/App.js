import './App.css';
import React from "react";
import Navbar from '../components/navbar'
import LandingPage from '../components/landingPage'
import {
    setTranslations,
    setDefaultLanguage, setLanguage, getLanguage
} from 'react-multi-lang';
import pl from '../lang/pl.json'
import gb from '../lang/gb.json'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {useCookies} from 'react-cookie'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {theme_light, theme_dark} from "../consts/theme"


setTranslations({gb, pl});


function App() {
    const [cookies, setCookie] = useCookies(['lang', 'mode'])

    const set_color_mode = (mode) => {
        let exp_date = new Date()
        exp_date.setFullYear(new Date().getFullYear() + 1)
        setCookie('mode', mode, {expires: exp_date})
    }
    if (cookies['mode'] == null) set_color_mode('light');

    const theme = createTheme(cookies['mode'] === 'light'? theme_light: theme_dark);
    const set_app_language = (lang) => {
        let exp_date = new Date()
        exp_date.setFullYear(new Date().getFullYear() + 1)
        setCookie('lang', lang, {expires: exp_date})
        setLanguage(lang)
    }

    let cookie_lang = cookies['lang']
    if (getLanguage() === 'pt' && cookie_lang) {
        setDefaultLanguage(cookie_lang)
    } else if (getLanguage() === 'pt' && !cookie_lang) {
        if (window.navigator.language.startsWith('pl')) {
            setDefaultLanguage('pl')
            set_app_language('pl')
        } else if (window.navigator.language.startsWith('en')) {
            setDefaultLanguage('gb')
            set_app_language('gb')
        }
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar set_app_language={set_app_language} language={cookie_lang} set_color_mode={set_color_mode}/>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
