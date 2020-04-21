import React, { Component } from 'react';
import './Dioralist.css';
import Diorabox from './../Diorabox';
import {ADDRESS_V2} from '../../constants';
import {CATEGORIE_DIORAMA, LOADER_COLOR} from '../../constants';
import {gen4} from "../../utils/keygen";

class Dioralist extends Component {
    constructor() {
        super();
        this.state = {
            dioramas: [],
            loading: true,
            error: null,
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        let pageurl = ADDRESS_V2 + 'posts/?categories=' + CATEGORIE_DIORAMA;
        console.log(ADDRESS_V2 + 'posts/?categories=' + CATEGORIE_DIORAMA);

        fetch (pageurl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
             })
            .then(data => {
                this.setState({
                    dioramas: data,
                    loading: false
                })
            })
        .catch(error => this.setState({error, loading: false}));
    }

    render() {
        let {dioramas, loading, error} = this.state;
        return (
            <React.Fragment>
                <div key={gen4()}>
                    <section className="vignette" id="top">
                        <div className="column is-one-third header-page">
                            <h1 className="header-page">Dioramas</h1>
                        </div>
                        <div className="columns is-multiline liste is-centered">
                            <React.Fragment>
                                <Diorabox dioramas={dioramas} loading={loading} error={error} isthree={true} />
                            </React.Fragment>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        )
    }
}

export default Dioralist;
