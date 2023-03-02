import React, {useEffect} from 'react';
import './navbar.css'
import {
    useTranslation
} from 'react-multi-lang';
import $ from 'jquery'
import {NavLink, Link} from 'react-router-dom'

const Navbar = (props) => {
    const t = useTranslation(props.language)

    useEffect(() => {
        $('.dropdown-menu.lang-item')[0].classList.toggle('show')
    }, [props.language])

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
                            <span className="nav-link active" aria-current="page">
                                <NavLink className='nav-link-react' exact to="/">
                                    {t('navbar.home')}
                                </NavLink>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page">
                                <NavLink className='nav-link-react' exact to="/home">
                                    EEE
                                </NavLink>
                            </span>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <span className="nav-link">Link</span>*/}
                        {/*</li>*/}

                        {/*<li className="nav-item">*/}
                        {/*    <span className="nav-link disabled">Disabled</span>*/}
                        {/*</li>*/}
                    </ul>
                    <div className="nav-item dropdown me-3">
                            <span className={`nav-link dropdown-toggle fi fi-${props.language}`} role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false">
                            </span>
                        <ul className="dropdown-menu lang-item">
                            <li className="lang-item"><span className="fi fi-gb dropdown-item"
                                                            onClick={() => props.set_app_language('gb')}></span>
                            </li>
                            <li className="lang-item"><span className="fi fi-pl dropdown-item"
                                                            onClick={() => props.set_app_language('pl')}></span>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-primary">{t('navbar.login')}</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;