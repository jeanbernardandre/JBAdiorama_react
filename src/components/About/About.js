import React, {Component} from 'react';
import './About.css';
import AboutText from './../AboutText';
import Links from './../Links';
import Contact from './../Contact';
import {Helmet} from "react-helmet";

class About extends Component
{
  render() {
    return (
      <div className="">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>About, contact Jean Diorama for his Nature miniatures 1 35 - Distant Shores</title>
          <meta name="description" content="Contact distant-shores and the nature centered dioramas built throughout the last part of 2017 and in 2018. "/>
          <link rel="canonical" href="http://www.distant-shore.com/About"/>
        </Helmet>
        <section className="purplepage">
          <div className="columns">
            <div className="column is-three-quarters bio">
              <AboutText/>
            </div>
            <div className="column form">
              <div className="columns is-multiline is-mobile bordertop">
                <div className="column is-12">
                  <h2 className="contact">Contact</h2>
                  <Contact/>
                </div>
                <div className="column is-12 links">
                  <h2>LINKS</h2>
                  <React.Fragment>
                    <Links/>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    );
  }
}

export default About;
