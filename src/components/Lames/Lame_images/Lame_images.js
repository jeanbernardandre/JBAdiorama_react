import React , {Component} from 'react';
import './Lame_images.css';
import {RingLoader} from "react-spinners";
import VideoImages from './../../VideoImages';
import {isMobile} from "react-device-detect";

class Lame_images extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    gen4() {
        return Math.random().toString(16).slice(-4)
    }
    render() {
        const {li_imgs, loading} = this.props;

        let widthDiv = '';
        if (li_imgs && li_imgs.length > 0) {
            const nb = li_imgs.length;
            if (nb === 1) {
                if (isMobile) {
                    widthDiv = 100;
                } else {
                    widthDiv = 90;
                }
            } else if (isMobile) {
                widthDiv = 100;
            } else {
                widthDiv = Math.round(100 / nb) - 4;
            }
        }

        const images = (li_imgs && li_imgs.length > 0) ? li_imgs.map(li_img => {
            if (li_img.li_link !== '') {
                return (
                    <div className="image" style={{width: widthDiv + '%'}} key={li_img.li_img.ID}>
                        <a href={li_img.li_link} target={li_img.li_target === true ? '_blank' : ''}>
                            <img
                                src={li_img.li_img.sizes.large}
                                alt=""
                                className="img_responsive"
                            />
                        </a>
                    </div>
                );
            } else {
                return (
                    <div className="image" style={{width: widthDiv + '%'}} key={li_img.li_img.ID}>
                        <img
                            src={li_img.li_img.sizes.large}
                            alt=""
                            className="img_responsive"
                        />
                    </div>
                );
            }
        }) : null;

        return (
            <section className="container lame_image" key={this.gen4()}>
                <div className="images">
                    {images}
                </div>
            </section>
        );
    }
}
export default Lame_images;
