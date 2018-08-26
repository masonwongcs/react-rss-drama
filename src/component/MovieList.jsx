import React from "react";
import axios from "axios";
import xml2js from "xml2js";
import { DramaListWrapper } from "./Styled";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barThickness: 5,
  barColors: {
    "0": "rgba(26,  188, 156)",
    ".3": "rgba(41,  128, 185)",
    "1.0": "rgba(231, 76,  60)"
  },
  shadowColor: "rgba(0, 0, 0, .5)",
  shadowBlur: 5
});

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      showBar: true
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const apiUrl = "http://allrss.se/dramas/" + window.location.search;
    this.ajax(apiUrl);
    history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${
          location.hash
        }`
      );
      console.log(`The last navigation action was ${action}`);
      this.ajax(apiUrl);
    });

    this.timeout = setTimeout(() => {
      this.setState({
        showBar: false
      });
    }, 2000);
  }

  handleClick = url => {
    this.ajax(url);
  };

  ajax = xmlSource => {
    // If its include v. as sub domain, it is an video
    if (!xmlSource.includes("v.")) {
      const query = 'select * from xml where url="' + xmlSource + '"';
      const url =
        "https://query.yahooapis.com/v1/public/yql?q=" +
        encodeURIComponent(query) +
        "&format=xml";
      axios.get(url).then(response => {
        const xml = response.data;
        // console.log(response.data)
        let parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(xml, (err, result) => {
          let resultDataItem = result.query.results.rss.channel.item;
          // resultDataItem.reverse().pop();
          // resultDataItem.reverse();
          this.setState({
            itemList: resultDataItem
          });
        });
      });
    } else {
      let videoUrl = xmlSource.includes("xml")
        ? xmlSource.replace("?xml=1", "")
        : xmlSource;
      window.open(videoUrl);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { itemList, showBar } = this.state;
    return (
      <DramaListWrapper style={{ marginTop: 60 }}>
        {showBar && <TopBarProgress style={{ zIndex: 9 }} />}
        {itemList.map((k, i) => {
          let imgSrcRegex = /<img.*?src='(.*?)'/;
          let imgURLRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
          let title = k.title;
          let description = k.description;
          let imgUrl =
            description &&
            description.match(imgSrcRegex) &&
            imgSrcRegex.exec(description)[1];
          if (imgUrl.includes("static.hddb.se")) {
            imgUrl = imgUrl.match(imgURLRegex) && imgURLRegex.exec(imgUrl)[0];
          }
          let url = k.enclosure.$.url;

          console.log(k);
          return (
            <Link
              to={`/${
                url.includes("?film") ? "drama/episode" : "drama"
              }${url.substring(url.indexOf("?"), url.length)}`}
              key={i}
              className={`drama-list-item ${
                url.includes("/change.html") ? "hide" : ""
              }`}
            >
              <h3 className="drama-title">{title}</h3>
              <div
                className="poster"
                style={{ backgroundImage: `url(${imgUrl})` }}
              />
            </Link>
          );
        })}
      </DramaListWrapper>
    );
  }
}

export default withRouter(MovieList);
