import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar'
import LandingPage from '../components/landingPage'
import 'bootstrap/dist/js/bootstrap.min'
import {
    setTranslations,
    setDefaultLanguage, setLanguage, getLanguage
} from 'react-multi-lang';
import pl from '../lang/pl.json'
import gb from '../lang/gb.json'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {useCookies} from 'react-cookie'
import {BrowserRouter, Routes, Route} from "react-router-dom";

setTranslations({gb, pl});

function App() {
    const set_app_language = (lang) => {
        let exp_date = new Date()
        exp_date.setFullYear(new Date().getFullYear() + 1)
        setCookie('lang', lang, {expires: exp_date})
        setLanguage(lang)
    }

    const [cookies, setCookie] = useCookies(['lang'])
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
            <BrowserRouter>
                <Navbar set_app_language={set_app_language} language={cookie_lang}/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
