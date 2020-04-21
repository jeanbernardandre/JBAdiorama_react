import React, { Component } from 'react';
import './Homediorama.css';
import { CircleLoader } from 'react-spinners';
import Diorabox from './../Diorabox'; // single
import {ADDRESS_V2, CATEGORIE_DIORAMA, MAX_DIORAMAS_HOME, LOADER_COLOR} from './../../constants';
import { HashLink as Link } from 'react-router-hash-link';

class Homediorama extends Component
{
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            dioramas:[],
            loading:true,
        }
    }

    componentDidMount() {
        this._isMounted = true; //permet d'éviter des  warnings https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
        this.setState({ loading: true });
        let pageurl =  ADDRESS_V2 + 'posts/?categories=' + CATEGORIE_DIORAMA + '&per_page=' + MAX_DIORAMAS_HOME;
        fetch (pageurl)
        .then (response => response.json())
        .then (response => {
            if (this._isMounted) {
                this.setState({
                    dioramas: response,
                    loading: false,
                })
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let {dioramas, loading, error} = this.state;

        if (loading) {
            return(
                <div className="loading">
                    <div className='sweet-loading'>
                        <CircleLoader
                            color={LOADER_COLOR}
                            loading={true}
                        />
                    </div>
                </div>
            )
        }

        if (error) {
            return <p>{error.message}</p>;
        }

        return (
            <div key={444444}>
                <section className="vignette" key={5444444}>
                    <div className="columns is-multiline liste is-centered">
                        <React.Fragment>
                            <Diorabox dioramas={dioramas} loading={loading} error={error} isthree={true} />
                        </React.Fragment>
                    </div>
                </section>
                <div className={'homediorama'}>
                    <div className={'more'}><Link className="btn" to="/Diora#suite-9">More dioramas</Link></div>
                </div>
            </div>
        );
    }
}

export default Homediorama;
