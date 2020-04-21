import React, { Component } from 'react';

import './DioralistTags.css';

import Tags from './../Tags'; // single
import AutoC from './../AutoC'; // single
import Diorabox from './../Diorabox'; // single


import {Link} from 'react-router-dom';
import { RingLoader } from 'react-spinners';

import Img from 'react-image';

class DioralistTags extends Component {
  constructor(){
    super();
    this.state={
      dioramas:[],
      loading: true,
      error: null,
    }
  }

//https://www.robinwieruch.de/react-fetching-data/
  componentDidMount(){
    this.setState({ loading: true });
    alert(this.props.match.params.tag);


  let pageurl = "http://www.distant-shores.com/wp-json/wp/v2/posts/?categories=2&tags=" + this.props.match.params.tag;
//   if(typeof this.props.match.params.number!='undefined'){
// alert('d');
//   const tag = parseInt(this.props.match.params.number, 10);
//   let pageurl ="http://www.distant-shores.com/wp-json/wp/v2/posts/?categories=2&tags=29";
//   console.log(tag);
//   }


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
        dioramas:data,
        loading:false,
      })
    })
    .catch(error => this.setState({ error, loading: false }));
  }



  render() {
    //console.log(this.state);
    let {dioramas, loading, error} = this.state;

    //console.log(loading);

    if(loading){
      return(
        <div className="loading">
           <div className='sweet-loading'>
             <RingLoader
               color={'#f13ab8'}
               loading={true}
             />
           </div>
         </div>
      )
    }

    if (error) {
       return <p>{error.message}</p>;
     }


    // console.log(this.state+'eeee');
          //
    return (
      <div>
        <AutoC />
          <section className="vignette">
            <div className="column is-one-third header-page"><h1 className="header-page">Dioramas</h1></div>
            <div className="column is-one-third" style={{margin:'30px', zIndex:'999999' }}>

            </div>
            <div className="columns  is-multiline  liste is-centered">
              <React.Fragment>
                <Diorabox dioramas={dioramas}  loading={loading}  error={error} isthree={true}  />
              </React.Fragment>
            </div>
          </section>
      </div>
    );
  }
}



export default DioralistTags;
