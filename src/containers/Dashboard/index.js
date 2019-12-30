import React from "react";
import myimage from "../../assets/images/nice-piccy3.jpg";
import { compose } from "recompose";
import {
  withAuthorization,
  withEmailVerification
} from "../../components/Session";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes.js";
import labsLogo from "../../assets/images/ctd-labs-logo.png";
import { withFirebase } from "../../components/Firebase";
import ListItems from "../../components/ListItems";
import Create_article from '../Create-article'
import FilterDropDown from "../../components/FilterDropDown";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }
  componentDidMount() {
    // let articles =this.props.firebase.articles()
    this.unsubscribe = this.props.firebase.articles().onSnapshot(snapshot => {
      let articles = [];
      snapshot.forEach(doc => articles.push({ ...doc.data(), uid: doc.id }));

      console.log("Articles loaded here yo!", articles);
      this.setState({ articles });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {


    console.log("M*8",this.props.authUser)
    return (
      <div className="wrapper">
        <div className="create-post">
        <Create_article/>
          {/* <a href="#" title="upload image" style={{ float: "right" }}>
            <i className="fa fa-image"></i>
          </a> */}
          <a href="#" title="upload image" style={{ float: "right" }}>
            <i className="fa fa-link"></i>
          </a>
          {/*<Link to={ROUTES.CREATEARTICLE}>Create article</Link>*/}
        </div>

        <button
          onClick={() => {

            console.log(this.state.articles[2])
            let article = this.state.articles[2]
            this.props.firebase
              .article("B5x4fBiKQufH2MjXVXh5")
              .set({ ...article,
              commentID: "TLd6KEj0yGlrLyKL6On1" });
          }}
        >
          Edit Post
        </button>
        <button
          onClick={() => {
            this.props.firebase
              .articles()
              .add({ 
                title: "Live TEST FINAL",
                 authorID: "N5OzGWJFHUYUxK5UDbfjFuuKYN52",
                 downvotes: 0,
                 timeCreated:"December 10, 2019 at 3:00:00 PM UTC-6",
                 upvotes:16,
                 url:""
                });
          }}
        >


          New Post
        </button>
        <div className="popular-title">
          {/* <p style={{ float: "left" }}>Popular Posts</p> */}
<FilterDropDown/>
        </div>
        <div>
          <ListItems
            articles={this.state.articles}
            //recipes={this.state.recipes}
          />
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Dashboard);
