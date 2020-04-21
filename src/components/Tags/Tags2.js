import React, {Component} from 'react';
import './Tags.css';

import Dioralist from './../Dioralist'; // single
import Diorama from './../Diorama'; // single

// ça arrive sous forme d'array au lieu d'un simple nb

class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: ''
    }
  }

  componentDidMount() {
    const {postid} = this.props;
    //  console.log(typeof tags);  object
    let pageurl = "http://www.distant-shores.com/wp-json/tags/v1/tag-post?post_id=" + postid;
    console.log(pageurl);

    fetch(pageurl).then(response => response.json()).then(response => {
      this.setState({tags: response})
    })
  }

  render() {
    const {tags} = this.state;
    //console.log(tags);

    let ls = '';
    return (<div >{ls}</div>)
  }
}

export default Tags;
