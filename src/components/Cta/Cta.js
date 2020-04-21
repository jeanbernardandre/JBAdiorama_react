import React, { Component } from 'react';
import './Cta.css';

class Cta extends Component
{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {bg, txt, link, target} = this.props;
        let classname = 'cta '
        if (bg !== '') {
            classname += bg;
        }
        if (txt !== '') {
            return (
                <div>
                    <a
                        className= {classname}
                        href={link}
                        target={target === true && ' _blank'}
                    >
                        {txt}
                    </a>
                </div>
            )
        }
    }
}

export default Cta;