    import React, {Component} from 'react';
    import './Diorama.css';
    import {ADDRESS_V2, ADDRESS_V3} from '../../constants';
    import Lightbox from 'react-image-lightbox';
    import 'react-image-lightbox/style.css';
    import Pinterest from './../Pinterest';

    class Diorama extends Component {
    constructor() {
        super();
        this.state = {
            diorama: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                acf: {
                    completed_on: '',
                    vendu: '',
                    size_of_the_scene: '',
                    size_of_the_frame: ''
                }
            },
            galerie: [],
            photoIndex: 0, //lightbox
            isOpen: false //lightbox
        }
    }

    componentWillMount() {
        let pageul = ADDRESS_V2 + "posts/" + this.props.match.params.number;
        fetch(pageul)
        .then(response => response.json())
        .then(response => {
            this.setState({diorama: response})
        });

        let pageurl = ADDRESS_V3 + "posts/" + this.props.match.params.number + '/galerie';
        fetch(pageurl)
        .then(response => response.json())
        .then(data => {
            this.setState({galerie: data.galerie});
        });
    }

    render() {
        let {galerie, diorama, photoIndex, isOpen} = this.state;
        let nbPhotos = galerie.length;
        let photos = [];

        photoIndex = Number(photoIndex);

        galerie.map((galf, index) => {
          return photos.push(galf.url);
        });
        galerie.slice(0, 2);
        let i = 0;
        let ls = galerie.map((gal, photoIndex) => {
            i++;
            if (i < 3) { // on limite la qtté de photos dans la galerie
                return (
                    <div key={photoIndex} className="pinterestImageWrapper">
                        <Pinterest
                            url={gal.link}
                            img= {gal.sizes.large}
                            alt= {gal.alt}
                        />
                        <img
                            alt=""
                            src={gal.sizes.medium_large}
                            onClick={() => this.setState({isOpen: true, photoIndex: photoIndex})}
                            className="cinqcent"
                        />
                    </div>
                )
            }
        });

        return (
            <div key={diorama.id}>
                <section className="illustration">
                    <section className="texte">
                        <h2 className="titre" dangerouslySetInnerHTML={{ __html: diorama.title.rendered }}/>
                    </section>
                    <div className="wrapped">
                        {ls}
                    </div>
                </section>
                {
                    isOpen && (
                        <Lightbox
                            mainSrc={photos[(photoIndex)]}
                            nextSrc={photos[(photoIndex + 1) % nbPhotos]}
                            prevSrc={photos[(photoIndex + nbPhotos - 1) % nbPhotos]}
                            onCloseRequest={() => this.setState({isOpen: false})}
                            onMovePrevRequest={() => {
                                this.setState({
                                  photoIndex: (photoIndex + nbPhotos - 1) % nbPhotos
                                });  //alert(photos[(photoIndex)]);
                            }}
                            onMoveNextRequest={() => {
                                this.setState({
                                  photoIndex: (photoIndex + 1) % nbPhotos
                                });  //alert(photos[(photoIndex)]);
                            }}
                        />
                    )
                }

                <section className="texte">
                    <div className="columns">
                        <div className="column is-two-thirds">
                        </div>
                        <div className="column  ">
                            <div className="data">Completed on {diorama.acf.completed_on.substring(0,4)}-{diorama.acf.completed_on.substring(2,4)}-{diorama.acf.completed_on.substring(4,6)} </div>
                        </div>
                        <div className="column has-text-centered sold">
                            {
                              diorama.acf.vendu
                                ? <div className="purple">sold</div>
                                : <div className="neutral"></div>
                            }
                        </div>
                    </div>
                    <div className="columns v2">
                        <div className="column is-one-third size">
                            Size of the scene : {diorama.acf.size_of_the_scene}cm
                            <br/>
                            Size of the frame : {diorama.acf.size_of_the_frame}cm
                        </div>
                        <div className="column desc">
                            <h2>About</h2>
                            <p className="dioramaText" dangerouslySetInnerHTML={{ __html: diorama.content.rendered }} />
                        </div>
                    </div>
                </section>
            </div>);
        }
    }

    export default Diorama;
