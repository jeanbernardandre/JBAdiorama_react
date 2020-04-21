import React, { Component} from 'react';
import './GaleryDioramas.css';
import {ADRESS_IMAGES, LOADER_COLOR, ADDRESS_PAGES, PAGE_GALLERY} from '../../constants';
import {CircleLoader, RingLoader} from 'react-spinners';
import ModalImage from 'react-modal-image';
import pinterest from './../../img/pinterest.svg';

class GaleryDioramas extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            error: null,
            page: 1,
            total_pages: 1,
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

    loadMore = () => {
        if (this.state.page < this.state.total_pages) {
            this.setState(
                prevState => ({
                    page: prevState.page + 1,
                    scrolling: true
                }),
                this.loadUser
            );
        } else {
            document.querySelector('.loadMoreButton').style.display = 'none';
        }
    };

    handleScroll = () => {
        let lastLi = document.querySelector('.scrollbottom') !== null;
        if (lastLi) {
            let lastLi = document.querySelector(".scrollbottom");
            let lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
            let pageOffset = window.pageYOffset + window.innerHeight;
            if (pageOffset > lastLiOffset) {
                this.loadMore();
            }
        }
    };

    loadTxtpage = () => {
        let {pageGalery} = this.state;
        this.setState({loading: true});
        let pageurl = ADDRESS_PAGES + PAGE_GALLERY;
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pageGalery: response,
                    loading: false})
            })
            .catch(
                error => this.setState({
                    error,
                    loading: false
                })
            );
    };

    loadUser = () => {
        let {dioramas, page, total_pages} = this.state;
        this.setState({loading: true});
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
                    dioramas: [...dioramas, ...data],
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
    };

    componentDidMount() {
/*        console.log(this.state.total_pages + 'total_pageds');
        console.log(this.state.page + ' ' + this.state.total_pages);*/

        this.loadUser();
        this.loadTxtpage();
        window.addEventListener('scroll', e => {
            this.handleScroll(e);
        });

    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        const {pageGalery, dioramas, loading, error, total_pages, page} = this.state;

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
                <div className="columns">
                    <div className="column">
                        <div className="masonry">
                            {error ? <p>{error.message}</p> : null}
                            {page <= total_pages ?
                                loading === false ? (
                                    ls
                                ) : (
                                    <div className="loading">
                                        <div className='sweet-loading'>
                                            <CircleLoader
                                                color={LOADER_COLOR}
                                                loading={true}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>END</div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <button style={{ float:"left", clear: "both", display:"block" }}
                    onClick={e => {
                        this.loadMore();
                    }}
                    className="loadMoreButton"
                >
                    Load More
                </button>
                <div style={{ float:"left", clear: "both" }}
                     className="scrollbottom"
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </React.Fragment>
        );
    }
}

export default GaleryDioramas;
