import React from "react";
import axios from "axios";
import xml2js from "xml2js";
import { EpisodeListWrapper } from "./Styled";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ViewDrama extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      iframeUrl: ""
    };
  }

  componentDidMount() {
    const { iframeUrl } = this.state;
    const apiUrl = window.location.search.replace("?link=", "");

    let videoUrl = apiUrl.includes("xml")
      ? apiUrl.replace("?xml=1", "") + ".html"
      : apiUrl;
    this.setState({
      iframeUrl: videoUrl
    });

    console.log(videoUrl);
    this.openWithoutReferrer(videoUrl);
    // this.renderIframe(videoUrl);
  }

  openWithoutReferrer = url => {
    let site = window.open("", "hide_referrer");
    site.document.open();
    site.document.writeln(
      '<script type="text/javascript">window.location = "' + url + '";</script>'
    );
    site.document.close();
  };

  updateUrl = () => {
    const { iframeUrl } = this.state;
    let iframeWrapper = document.getElementById("view-iframe-wrapper");
  };

  renderIframe = videoUrl => {
    const { iframeUrl } = this.state;
    // let viewIframe = document.getElementById("view-iframe");
    // console.log(viewIframe.querySelector("#vb_player a"));
    let iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.referrerPolicy = "no-referrer";
    iframe.id = "view-iframe";
    iframe.allowFullscreen = true;
    let body = document.getElementById("view-iframe-wrapper");
    body.appendChild(iframe);
  };

  render() {
    return <div onLoad={this.updateUrl} id="view-iframe-wrapper" />;
  }
}

export default ViewDrama;
