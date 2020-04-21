import React, { Component } from 'react';
import './Diorabox.css';
import {Link} from 'react-router-dom';
import {CircleLoader} from 'react-spinners';
import {LOADER_COLOR } from './../../constants';
import Tags from './../Tags';
import Img from 'react-image';

class Diorabox extends Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        const {dioramas, loading, error, isthree} = this.props;
        if (loading) {
            return (
                <div className='sweet-loading'>
                    <CircleLoader
                      color={LOADER_COLOR}
                      loading={true}
                    />
                </div>
            )
        }
        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            dioramas.map((diorama, index) => {
                const dioramacat = parseInt(diorama.categories[0]);
                console.log(diorama);
                return(
                    dioramacat === 14 &&
                    <div className={isthree ? 'column is-3' : ''} key={index} id={`suite-${index}`}>
                        <div className="item_d">
                            <Link to={`/Diora/${diorama.id}`}>
                                <Img
                                alt={diorama.title}
                                src={[
                                    diorama.fimg_url
                                ]}
                                loader={
                                    <CircleLoader
                                        color={LOADER_COLOR}
                                        loading={true}
                                    />
                                }
                                />
                            </Link>
                        <div className="item-overlay top"></div>
                    </div>
                    <div className="item_d">
                       <Link to = {`/Diora/${diorama.id}`}>  <h2>{diorama.title.rendered}</h2></Link>
                          <div dangerouslySetInnerHTML={{__html: diorama.excerpt.rendered}} />
                                <Link to = {`/Diora/${diorama.id}`} className="plus">+</Link>
                          <div>
                              <div style={{display:'none'}}>
                                  <Tags postid={diorama.id} />
                              </div>
                          </div>
                        </div>
                    </div>
                )
            })
        );
    }
}

export default Diorabox;
