import React, {useEffect, useState} from 'react';
import './navbar.css'
import {
    useTranslation,
    setLanguage
} from 'react-multi-lang';
import {useCookies} from "react-cookie";
import $ from 'jquery'

const Navbar = () => {
    const [cookies, setCookie] = useCookies(['lang'])
    const [choosenLang, setChoosenLang] = useState(cookies['lang'])
    const t = useTranslation()
    // onClick={() => setChoosenLang('gb')}
    // onClick={() => setChoosenLang('pl')}

    useEffect(() => {
        setCookie('lang', choosenLang)
        // setLanguage(choosenLang)
        $('.dropdown-menu.lang-item')[0].classList.toggle('show')
    }, [choosenLang])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand">Home Budget Planner</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page">{t('navbar.home')}</span>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <span className="nav-link">Link</span>*/}
                        {/*</li>*/}

                        {/*<li className="nav-item">*/}
                        {/*    <span className="nav-link disabled">Disabled</span>*/}
                        {/*</li>*/}
                    </ul>
                    <div className="nav-item dropdown me-3">
                            <span className={`nav-link dropdown-toggle fi fi-${choosenLang}`} role="button" data-bs-toggle="dropdown"
                                  aria-expanded="false">
                            </span>
                        <ul className="dropdown-menu lang-item">
                            <li className="lang-item"><span className="fi fi-gb dropdown-item" onClick={() => setChoosenLang('gb')}></span>
                            </li>
                            <li className="lang-item"><span className="fi fi-pl dropdown-item" onClick={() => setChoosenLang('pl')}></span>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;