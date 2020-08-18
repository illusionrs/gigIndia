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
      past:""
    };
  }

  componentDidMount() {
    let that = this;

    Axios.get("http://hn.algolia.com/api/v1/search?tags=front_page")
      .then(function (response) {
        var data = response.data.hits;
        var temp = data.map((ds) => {
          return ds.title;
        });
        that.setState({
          front: response.data.hits,
          value: 1,
          valuepast:0
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

    Axios.get("http://hn.algolia.com/api/v1/search_by_date?tags=story")
      .then(function (response) {
        var data = response.data.hits;
        
        that.setState({
          past: response.data.hits,
          value: 0,
          valuepast:1
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
  render() {
    return (
      <div>
        <div className="headcontainer">
          <p className="logo">Y</p>
          <p className="logoname pointer" onClick={this.frontHandler.bind(this)}>Hacker News</p>
          <p> new |</p>
          <p  className="pointer" onClick={this.pastHandler.bind(this)}>past |</p>
          <p>Comments |</p>
          <p>asks |</p>
          <p>show |</p>
          <p>jobs |</p>
          <p>submit |</p>
        </div>

        <div className="frontData">
          {this.state.value === 1
            ? this.state.front.map((ds) => {
                return (
                  <div className="titlebody">
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
                  <div className="titlebody">
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
      </div>
    );
  }
}

export default Header;
