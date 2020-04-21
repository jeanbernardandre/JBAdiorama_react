import React, { Component} from 'react';
import './GaleryDioramas.css';
import {ADRESS_IMAGES, LOADER_COLOR, ADDRESS_PAGES, PAGE_GALLERY} from '../../constants';
import {CircleLoader, RingLoader} from 'react-spinners';
import ModalImage from 'react-modal-image';
import pinterest from './../../img/pinterest.svg';
import InfiniteScroll from 'react-infinite-scroller';

class GaleryDioramas extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            error: null,
            page: 1,
            total_pages: 1,
            total_increased: false,
            pageGalery: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                featured_media: {
                    rendered: ''
                }
            }
        }
    }

    loadUser = (pageD) => {
        let {dioramas, page, total_pages, total_increased} = this.state;

        page +=1;
        let pageurl = ADRESS_IMAGES + page;

        fetch (pageurl)
            .then(response => {
                for (let pair of response.headers.entries()) {
                    if (pair[0] === 'x-wp-totalpages') {
                        total_pages =  pair[1];
                    }
                }
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                this.setState({
                    dioramas: data,
                    loading: false,
                    scrolling: false,
                    total_pages: total_pages
                })
            })
            .catch(
                error => this.setState({
                    error,
                    loading: false
                })
            );

        if (page === total_pages) {
            total_increased = true;
        }
    };


    render() {
        const {pageGalery, dioramas, loading, error, total_pages, page, total_increased} = this.state;
console.log()

        let ls = dioramas.map(diorama => {
            if (typeof diorama.better_featured_image.media_details.sizes.medium_large !== 'undefined') {
                return (
                    <div key={diorama.id} className="item">
                        <a
                            href={`http://pinterest.com/pin/create/button/?url=${diorama.fimg_url}&media=${diorama.fimg_url}&description=${diorama.title.rendered}`}
                            className="pin-it-button"
                            data-pin-round="round"
                            target="blank"
                        >
                            <img src={pinterest} alt="" />
                        </a>
                        <ModalImage
                            small={diorama.better_featured_image.media_details.sizes.medium_large.source_url}
                            large={diorama.fimg_url}
                            alt={diorama.title.rendered}
                            loader={<RingLoader color={LOADER_COLOR} loading='true'/>}
                        />
                    </div>
                );
            }
        })

        return (
            <React.Fragment>
                <div key={pageGalery.id} className="header-galery">
                    <h1 dangerouslySetInnerHTML={{
                        __html: pageGalery.title.rendered
                    }}/>
                    <div dangerouslySetInnerHTML={{
                        __html: pageGalery.content.rendered
                    }}/>
                </div>
                <div style={{ height:"700px", overflow:"auto" }}>
                    <div>
                        <div className="columns">
                            <div className="column">
                                <div className="masonry">
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.loadUser.bind(this)}
                                        hasMore={total_increased}
                                        loader={
                                            <div className="loading" key={0}>
                                                <div className='sweet-loading'>
                                                    <CircleLoader
                                                        color={LOADER_COLOR}
                                                        loading={true}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    >
                                        {ls}
                                    </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GaleryDioramas;
