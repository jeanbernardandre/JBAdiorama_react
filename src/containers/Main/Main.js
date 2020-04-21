import React, {Component} from 'react';
import './Main.css';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Diora from './../../components/Diora';
import Home from './../../components/Home';
import Blog from './../../components/Blog';
import About from './../../components/About';
import GaleryDioramas from '../../components/GaleryDioramas';
import NotFound from './../../components/NotFound';

import {
    ADRESS_MENU,
    ROOT_ADRESS
} from '../../constants';

import facebook from './../../img/facebook.svg';
import instagram from './../../img/instagram.svg';
import logo from './../../img/logo.png';
import DioramaOSMaps from "../../components/DioramaOSMaps";

class Main extends Component
{
    constructor() {
        super();
        this.state = {
            liens: [],
            active: false
        }
        this.toggleClass= this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    componentDidMount() {
        fetch(ADRESS_MENU).then(response => response.json()).then(response => {
            this.setState({liens: response.items});
        });

/*        if (!window.doBuild) {
            this.preloadWidgetScript();
        } else {
            window.doBuild();
        }*/
    }

    cinq = (el) => {
        return (el.substring(0, 5));
        return (el.replace(' ', '_'));
    }

/*    preloadWidgetScript = () => {
        const script = document.createElement('script');
        script.async = true;
        script.dataset.pinBuild = 'doBuild';
        script.src = '//assets.pinterest.com/js/pinit.js';
        document.body.appendChild(script);
    }*/

    render() {
        let {liens} = this.state;
        let ls = liens.map((lien, index) => {
                return (
                    <Link key={index} to={'/' + this.cinq(lien.title)} className="navbar-item baisse" onClick={this.toggleClass}>
                        {lien.title}
                    </Link>)
            }
        );

        return (
            <main id="main">
                <Router>
                    <div>
                        <div>
                            <nav className="navbar">
                                <div className="navbar-brand">
                                    <a className="navbar-item logo" href={ ROOT_ADRESS }>
                                        <img className="dslogo" src={logo} alt="Distant Shores Dioramas"  />
                                    </a>
                                    <div
                                        className={this.state.active ? 'navbar-burger burger is-active': 'navbar-burger burger'}
                                        id="burgerking"
                                        data-target="navMenubd-example"
                                        onClick={this.toggleClass}
                                    >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div id="navMenubd-example" className={this.state.active ? 'navbar-menu is-active' : 'navbar-menu'} >
                                        <div className="navbar-start">
                                            <Link to={'/'} className="navbar-item baisse">
                                                Home
                                            </Link>
                                            {ls}
                                        </div>
                                </div>
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="field is-grouped">
                                            <a
                                                className="navbar-item"
                                                href="https://www.facebook.com/jbadiorama"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="icon" style={{color: '#bbb'}}>
                                                  <img src={facebook} alt=""/>
                                                </span>
                                            </a>
                                            <a
                                                className="navbar-item "
                                                href="https://www.instagram.com/jean_diorama/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span className="icon" style={{color: '#bbb'}}>
                                                  <img src={instagram} alt="" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/Diora' component={Diora}/>
                            <Route exact path='/About' component={About}/>
                            <Route exact path='/Blog' component={Blog}/>
                            <Route exact path='/Maps' component={DioramaOSMaps}/>
                            <Route exact path='/Galer' component={GaleryDioramas}/>
                            <Route component={ NotFound } />
                        </Switch>
                    </div>
                </Router>
            </main>
        );
    }
}

export default Main;
