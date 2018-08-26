import axios from "axios";
import xml2js from "xml2js";

export const ajax = xmlSource => {
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
                resultDataItem.reverse().pop();
                resultDataItem.reverse();
                return resultDataItem
                // this.setState({
                //     itemList: resultDataItem
                // });
            });
        });
    } else {
        let videoUrl = xmlSource.includes("xml")
            ? xmlSource.substring(0, xmlSource.length - 2)
            : xmlSource;
        window.open(videoUrl);
    }
};