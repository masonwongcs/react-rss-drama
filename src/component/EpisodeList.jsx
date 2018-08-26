import React from "react";
import axios from "axios";
import xml2js from "xml2js";
import { DramaListWrapper, EpisodeListWrapper } from "./Styled";
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

class EpisodeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      showBar: true
    };
  }

  componentDidMount() {
    const apiUrl = "http://allrss.se/dramas/" + window.location.search;
    this.ajax(apiUrl);
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
    if (xmlSource.includes("v.") || xmlSource.includes("vb.")) {
      let videoUrl = xmlSource.includes("xml")
        ? xmlSource.replace("?xml=1", "") + ".html"
        : xmlSource;
      window.open(videoUrl);
    } else {
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
    }
  };

  filterImageQuality = imgSrc => {
    let imgSrcRegex = /<img.*?src='(.*?)'/;
    let imgURLRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    let imgUrl =
      imgSrc && imgSrc.match(imgSrcRegex) && imgSrcRegex.exec(imgSrc)[1];

    console.log(imgUrl);
    if (imgUrl.includes("static.hddb.se")) {
      imgUrl = imgUrl.match(imgURLRegex) && imgURLRegex.exec(imgUrl)[0];
    }

    return imgUrl;
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { itemList, showBar } = this.state;
    return (
      <EpisodeListWrapper>
        {showBar && <TopBarProgress style={{ zIndex: 9 }} />}
        <div
          className="bg-poster"
          style={{
            backgroundImage: `url(${this.filterImageQuality(
              itemList.length !== 0 ? itemList[1].description : ""
            )})`
          }}
        />
        <div className="episode-poster">
          {/*<h3 className="drama-title">*/}
          {/*{itemList.length !== 0 && itemList[0].title}*/}
          {/*</h3>*/}
          <div
            className="poster"
            style={{
              backgroundImage: `url(${this.filterImageQuality(
                itemList.length !== 0 ? itemList[1].description : ""
              )})`
            }}
          />
        </div>
        <div className="episode-list-wrapper">
          <ul>
            {itemList.map((k, i) => {
              let title = k.title;

              // let imgUrl = this.filterImageQuality(k.description);

              let url = k.enclosure.$.url;

              let videoUrl = url.includes("xml")
                ? url.replace("?xml=1", "").replace("&xml=1", "")
                : url;

              console.log(k);

              return (
                <li
                  key={i}
                  className={url.includes("/change.html") ? "hide" : ""}
                >
                  <a
                    href={
                      videoUrl.includes("http://allrss.se") ? "#" : videoUrl
                    }
                    target={
                      videoUrl.includes("http://allrss.se") ? "" : "_blank"
                    }
                    className={`drama-list-item ${
                      url.includes("/change.html") ? "hide" : ""
                    }`}
                    onClick={() => {
                      videoUrl.includes("http://allrss.se")
                        ? this.handleClick(videoUrl)
                        : null;
                    }}
                  >
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </EpisodeListWrapper>
    );
  }
}

export default EpisodeList;
