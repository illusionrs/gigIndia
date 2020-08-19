import React from "react";
import "./Header.css";
import Axios from "axios";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      front: "",
      value: 0,
      valuepast:0,
      past:"",
      valueComment:0,
      comment:"",
      valueask:0,
      ask:""

    };
  }

  componentDidMount() {
    let that = this;

    Axios.get("https://hn.algolia.com/api/v1/search?tags=front_page")
      .then(function (response) {
       
      
        that.setState({
          front: response.data.hits,
          value: 1,
          valuepast:0,
          valueComment:0,
          valueask:0,
        });

        console.log(response.data.hits);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  pastHandler() {

    console.log("past called")

    let that = this;

    Axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story")
      .then(function (response) {
        
        
        that.setState({
          past: response.data.hits,
          value: 0,
          valuepast:1,
          valueComment:0,
          valueask:0,
        });

        console.log(response.data.hits);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


  }
  frontHandler(){
     this.setState({
         valuepast:0,
         value:1
     })
  }

  commentHandler(){
    
   let that=this
    Axios.get("https://hn.algolia.com/api/v1/search?tags=comment")
      .then(function (response) {
       
        
        that.setState({
          comment: response.data.hits,
          value: 0,
          valuepast:0,
          valueComment:1,
          valueask:0
        });

        console.log(response.data.hits);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


  }

  askHandler(){

    let that=this
    Axios.get("https://hn.algolia.com/api/v1/search?tags=ask_hn")
      .then(function (response) {
       
        
        that.setState({
          ask: response.data.hits,
          value: 0,
          valuepast:0,
          valueComment:0,
          valueask:1,
        });

        console.log(response.data.hits);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


  }


  render() {
    return (
      <div id="hs">
        <div className="headcontainer">
          <p className="logo" onClick={this.frontHandler.bind(this)}>Y</p>
          <p className="logoname pointer" onClick={this.frontHandler.bind(this)}>Hacker News</p>
          <p> new |</p>
          <p  className="pointer" onClick={this.pastHandler.bind(this)}>past |</p>
          <p onClick={this.commentHandler.bind(this)}  className="pointer">Comments |</p>
          <p className="pointer"  onClick={this.askHandler.bind(this)}>asks |</p>
          <p>show |</p>
          <p>jobs |</p>
          <p>submit |</p>
        </div>

        <div className="frontData">
          {this.state.value === 1
            ? this.state.front.map((ds) => {
                return (
                  <div className="titlebody" key={ds.objectID}>
                    <a href={ds.url} className="link">
                      <p className="title" key={ds}>
                        {this.state.front.indexOf(ds) + 1}.{ds.title}{" "}
                      </p>
                    </a>

                    <p className="desc">
                      {ds.points} points by {ds.author}{" "}
                      {ds.created_at.charAt(12)} hours ago | hide |{" "}
                      {ds.num_comments} comments
                    </p>
                  </div>
                );
              })
            : ""}
        </div>

        <div >
          {this.state.valuepast === 1
            ?
             <div className="frontData"> 

<p id="7"> Stories from {Date(this.state.past[0].created_at)}</p>
              
           { this.state.past.map((ds) => {
                return (
                  <div className="titlebody" key={ds.objectID}>
                    <a href={ds.url} className="link">
                      <p className="title" key={ds}>
                        {this.state.past.indexOf(ds) + 1}.{ds.title}{" "}
                      </p>
                    </a>

                    <p className="desc">
                      {ds.points} points by {ds.author}{" "}
                      {ds.created_at.charAt(12)} hours ago | hide |{" "}
                      {ds.num_comments} comments
                    </p>
                  </div>
                );
              }) }

</div>
            : ""}
        </div>
        <div key="commentsec">
            {
                this.state.valueComment===1?

                <div  key="commentbox" className="frontData">

                {
                    this.state.comment.map((ds)=>{

                        return (
                            <div key={ds.objectID}> 
                                <p className="desc" key={ds.story_title}>{ds.author} | parent | on:  { ds.story_title}</p>
                                <p > {ds.comment_text}</p>
                            </div>
                        )
                    })
                }

                </div> 
                :""

            }
        </div>

        <div>
        {
                this.state.valueask===1?

                <div  className="frontData">

                {
                    this.state.ask.map((ds)=>{

                        return (
                            <div key={ds.created_at_i}> 
                               
                                <p key={ds.objectID}>{this.state.ask.indexOf(ds) + 1} {ds.title}</p>
                              <p className="desc">{ds.points} by {ds.author} |  { ds.num_comments} comments</p>
                            </div>
                        )
                    })
                }

                </div> 
                :""

            }

        </div>
      </div>
    );
  }
}

export default Header;
