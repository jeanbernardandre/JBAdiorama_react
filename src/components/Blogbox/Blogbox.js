import React, { Component } from 'react';
import './Blogbox.css';
import { RingLoader } from 'react-spinners';
import {ADDRESS_V2} from '../../constants';
import Img from 'react-image';

class Blogbox extends Component {
  constructor() {
    super();
    this.state = {
      dioramas: [],
    }
  }

  componentDidMount(){
      this.setState({ loading: true });
      let pageurl = ADDRESS_V2 + "posts/?categories=6&per_page=1";
      fetch (pageurl)
      .then(response => response.json())
      .then(response => {
      this.setState({
        dioramas:response,
        loading:false,
      })
    })
  }

  render() {
    //console.log(this.state);
    let {dioramas} = this.state;
    let ls= dioramas.map( (diorama,index) => {
      const dioramacat = diorama.categories;
      //console.log('diocat '+ dioramacat );
      //console.log(diorama.better_featured_image.alt_text+'ee');
      return(
        dioramacat === 6 &&
        <div key={index} className="item">
             <h2 dangerouslySetInnerHTML={{__html: diorama.title.rendered}}/>
             <h3>{diorama.date.substring(0,10)}</h3>
               <Img
                 alt={diorama.better_featured_image.alt_text}
                 src={[
                   diorama.better_featured_image.media_details.sizes.medium_large.source_url,
                 ]}
                 loader={
                   <RingLoader
                   color={'#123abc'}
                   loading={true}
                    />
                  }
                />
              <span dangerouslySetInnerHTML = {{__html: diorama.content.rendered}} />
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

export default Blogbox;
