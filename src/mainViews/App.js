import './App.css';
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar'
import LandingPage from '../components/landingPage'
import 'bootstrap/dist/js/bootstrap.min'
import {
    setTranslations,
    setDefaultLanguage, setLanguage
} from 'react-multi-lang';
import pl from '../lang/pl.json'
import gb from '../lang/gb.json'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useCookies } from 'react-cookie'

setTranslations({gb, pl});
setDefaultLanguage('gb');

function App() {
    const [cookies, setCookie] = useCookies(['lang'])
    if (!cookies['lang']) {
        setCookie('lang', 'gb')
    }
    setLanguage(cookies['lang'])
    useEffect(() => {
        setLanguage(cookies['lang'])
    }, [cookies['lang']])
    return (
        <div className="App">
            <Navbar/>
            <LandingPage/>
        </div>
    );
}

export default App;
