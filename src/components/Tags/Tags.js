import React, {Component} from 'react';
import './Tags.css';


import { RingLoader } from 'react-spinners';

// ça arrive sous forme d'array au lieu d'un simple nb

class Tags extends Component {
  constructor(props){
    super(props);
    this.state={
      tags:[],
      loading:true,
    }
  }
  componentDidMount(){
        this.setState({ loading: true });

        const {postid} = this.props;
        //  console.log(typeof tags);  object
        let pageurl = "http://www.distant-shores.com/wp-json/tags/v1/tag-post?post_id=" + postid;
      //  console.log(pageurl);


    fetch (pageurl)
    .then(response => response.json())
    .then(response => {
    this.setState({
      tags:response,
      loading:false,
    })
  })
  }

  render() {
  //console.log(this.state);

   let {tags, loading} = this.state;

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

   //console.log(typeof tags);

//if(typeof tags===Object){
    let ls= tags.map( (tag,index) => {
    //  console.log(tag.name);
      return(
        <span key={index}>
        {tag.name} |
        </span>
      )
    });
  //}

    // console.log(this.state+'eeee');
          //
    return (
      <div>
        {ls}
      </div>
    );
  }
}



export default Tags;
