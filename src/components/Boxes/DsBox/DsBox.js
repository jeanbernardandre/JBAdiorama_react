import React, {Component} from 'react';
import './DsBox.css';
import {RingLoader} from 'react-spinners';
import {DSBOXADDRESS, LOADER_COLOR} from '../../../constants';
import Img from 'react-image';
import Cta from "../../Lames/Cta/Cta";
import {gen4} from "../../../utils/keygen";

class DsBox extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            dioramas: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: true});
        let pageUrl = DSBOXADDRESS;
        //console.log(pageUrl);
        fetch(pageUrl)
        .then(response => response.json())
        .then(response => {
            this.setState({
                dioramas: response,
                loading: false,
            })
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {dioramas} = this.state;
        let ls = dioramas.map((diorama, index) => {
            return (
                <div className="purple-wrapper" key={gen4()}>
                    <section className="container vignette">
                        <div className="column">
                                <div key={index} className="blogbox-home">
                                    <div className="blogbox-txt">
                                        <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}/>
                                        <span dangerouslySetInnerHTML={{__html: diorama.content.rendered}}/>
                                        <Cta
                                            link={diorama.acf.cta_link}
                                            txt={diorama.acf.cta_txt}
                                            bg={diorama.acf.cta_bg}
                                            target={diorama.acf.cta_target}
                                            index={index}
                                        />
                                    </div>
                                    <div className="blogbox-img">
                                        <Img
                                            alt={diorama.better_featured_image.alt_text}
                                            src={[
                                                diorama.better_featured_image.media_details.sizes.medium_large.source_url,
                                            ]}
                                            loader={
                                                <RingLoader
                                                    color={LOADER_COLOR}
                                                    loading={true}
                                                />
                                            }
                                        />
                                    </div>

                                </div>
                        </div>
                    </section>
                </div>
            )
        });
        return (
            <div>
                {ls}
            </div>
        );
    }
}

export default DsBox;
