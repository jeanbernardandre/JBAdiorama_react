import React, { Component } from 'react';
import './DioramaOSMaps.css';
import {ADDRESS_PAGES, ADDRESS_V2, PAGE_GALLERY} from '../../constants';
import {CATEGORIE_DIORAMA, LOADER_COLOR, SECONDARY_COLOR, PAGE_MAPS} from '../../constants';
import {Link} from 'react-router-dom';
import { Map as LeafletMap, Marker, Popup , GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import worldGeoJSON from 'geojson-world-map';

const DEFAULT_VIEWPORT = {
    center: [51.505, -0.09],
    zoom: 3,
}

class DioramaOSMaps extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                acf: {
                    gmapes: {
                        lng: '',
                        lat: '',
                    }
                }
            },
            pageMaps: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                },
                featured_media: {
                    rendered: ''
                }
            },
            isOpen: false,
            lat: 50.505,
            lng: 1,
            zoom: 3,
            viewport: DEFAULT_VIEWPORT,
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    onClickReset = () => {
        this.setState({ viewport: DEFAULT_VIEWPORT })
    }

    loadTxtpage = () => {
        let {pageMaps} = this.state;
        this.setState({loading: true});
        let pageurl = ADDRESS_PAGES + PAGE_MAPS;
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    pageMaps: response,
                    loading: false})
            })
            .catch(
                error => this.setState({
                    error,
                    loading: false
                })
            );
    };

    componentDidMount() {
        this.setState({loading: true});
        this.loadTxtpage();

        let pageurl = ADDRESS_V2 + 'posts/?categories=' + CATEGORIE_DIORAMA;
        console.log(pageurl);
        fetch(pageurl)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dioramas: response,
                    loading: false,
                })
            })
    }

    handleSearch(val) {
        window.location = '/Diora/' + val;
    }

    render() {
        let {dioramas, pageMaps} = this.state;
        const iconPerson = new L.Icon({
            iconUrl: require('../../img/markerb.svg'),
            iconRetinaUrl: require('../../img/markerb.svg'),
            iconSize: new L.Point(30, 30),
            className: 'leaflet-div-icon'
        });

        const renderedMarkers = (dioramas && dioramas.length > 0)
            ? dioramas.map(diorama => {
                return (
                    <Marker icon={iconPerson} key={diorama.id} position={[diorama.acf.gmapes.lat, diorama.acf.gmapes.lng]}>
                        {diorama.title.rendered && <Popup>
                            <span><Link to = {`/Diora/${diorama.id}`}> {diorama.title.rendered}</Link></span>
                        </Popup>}
                    </Marker>
                )
            }): null;

        return (
            <div>
                <div key={pageMaps.id} className="header-galery">
                    <h1 dangerouslySetInnerHTML={{
                        __html: pageMaps.title.rendered
                    }}/>
                    <div dangerouslySetInnerHTML={{
                        __html: pageMaps.content.rendered
                    }}/>
                </div>
                <div className="leafletwrapper">
                    <LeafletMap
                        center={[50, 10]}
                        zoom={2}
                        maxZoom={10}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                    >
                        <GeoJSON
                            data={worldGeoJSON}
                            style={() => ({
                                color: SECONDARY_COLOR,
                                weight: 0.5,
                                fillColor: SECONDARY_COLOR,
                                fillOpacity: 0.8,
                            })}
                        />
                        <React.Fragment>
                            {renderedMarkers}
                        </React.Fragment>
                    </LeafletMap>
                </div>
            </div>

        );
    }
}

export default DioramaOSMaps;
