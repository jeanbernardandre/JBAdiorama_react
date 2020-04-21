import React from 'react';
import './Footer.css';

const dat = new Date().getFullYear();

const Footer =() =>(
  <div>
    <footer>
      <div className="columns">
        <div className="column">
        </div>
        <div className="column has-text-right">
          <p>
            @jeanDiorama {dat}
          </p>
        </div>
      </div>
    </footer>
    <a href="#0" className="cd-top">Top</a>
  </div>
);

export default Footer;
