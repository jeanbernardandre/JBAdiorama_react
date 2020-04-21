import React , {Component} from 'react';
import './Lame_header_txt_cta.css';
import {RingLoader} from "react-spinners";
import VideoImages from './../../VideoImages';
import {isMobile} from "react-device-detect";
import Cta from "../../Cta";

class Lame_header_txt_cta extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    gen4() {
        return Math.random().toString(16).slice(-4)
    }
    render() {
        return;
    }
}
export default Lame_header_txt_cta;
