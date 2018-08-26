import React from "react";
import ChannelList from "./component/ChannelList";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EpisodeList from "./component/EpisodeList";
import MovieList from "./component/MovieList";
import { HeaderWrapper } from "./component/Styled";
import ViewDrama from "./component/View";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderWrapper>
            <ul>
              <li>
                <Link className="home" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </HeaderWrapper>
          <Route exact path="/" component={ChannelList} />
          <Route exact path="/drama" component={MovieList} />
          <Route exact path="/drama/episode" component={EpisodeList} />
          <Route exact path="/view" component={ViewDrama} />
        </div>
      </Router>
    );
  }
}

export default App;
