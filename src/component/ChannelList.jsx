import React from "react";
import axios from "axios";
import xml2js from "xml2js";
import { DramaListWrapper } from "./Styled";
import { Link } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barThickness: 5,
  barColors: {
    "0": "rgba(26,  188, 156, .7)",
    ".3": "rgba(41,  128, 185, .7)",
    "1.0": "rgba(231, 76,  60,  .7)"
  },
  shadowColor: "rgba(0, 0, 0, .5)",
  shadowBlur: 5
});

const apiUrl = "http://allrss.se/dramas/";

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      showBar: true
    };
  }

  componentDidMount() {
    this.ajax(apiUrl);
    this.setState({
      showBar: false
    });
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
        ? xmlSource.substring(0, xmlSource.length - 2)
        : xmlSource;
      window.open(videoUrl);
    }
  };

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
              to={`/drama${url.substring(url.indexOf("?"), url.length)}`}
              key={i}
              className={`drama-list-item ${url.includes('/change.html') ? 'hide' : ''}`}
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

export default ChannelList;
