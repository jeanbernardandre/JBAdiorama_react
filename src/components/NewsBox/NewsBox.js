import React, { Component } from 'react';
import './Newsbox.css';
import Diorabox from './../Diorabox'; // single
import { RingLoader } from 'react-spinners';
import {ADDRESS_V2} from '../../constants';

class NewsBox extends Component
{
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      dioramas: [],
      loading: true,
      error: null,
    }
  }
//https://www.robinwieruch.de/react-fetching-data/
  componentDidMount() {
    this._isMounted = true; //permet d'éviter des  warnings https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
    this.setState({ loading: true });

    let pageurl = ADDRESS_V2 + 'posts/?categories=2&per_page=1';
    fetch (pageurl)
    .then(response => {
       if (response.ok) {
         return response.json();
       } else {
         throw new Error('Something went wrong ...');
       }
     })
    .then(data => {
        if (this._isMounted) {
            this.setState({
                dioramas: data,
                loading: false,
            })
        }
    })
    .catch(error => this.setState({ error, loading: false }));
  }

  componentWillUnmount() {
      this._isMounted = false;
  }

  render() {
    //console.log(this.state);
    let {dioramas, loading, error} = this.state;
    if(loading){
      return(
        <div className='sweet-loading'>
          <RingLoader
            color={'#123abc'}
            loading={true}
          />
        </div>
      )
    }

    if (error) {
       return <p>{error.message}</p>;
     }
    // console.log(this.state+'eeee');

    return (
      <div>
        <React.Fragment>
          <Diorabox dioramas={dioramas} loading={loading} error={error} isthree={false}/>
        </React.Fragment>
      </div>
    );
  }
}

export default NewsBox;
