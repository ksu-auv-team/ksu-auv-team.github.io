import {fetch} from 'cross-fetch'
import React, {useState} from 'react'
import parse from "html-react-parser"
import useWindowDimensions from '../hooks/useWindowDimensions'

const GitHtml = (props) => {
    const [data, setData] = useState("")

    const { height, width } = useWindowDimensions();

    function widthPercent(initial) {
      return (initial / 1920) * width;
  }

  function heightPercent(initial) {
      return (initial / 1080) * height;
  }
    async function getData() {
        var val = await fetch(props.path, {
        method: "get",
        headers: {
            "Accept": "text/plain"
        }
      }).then(result => {return result.text()});
      if (data !== val)
      {
        setData(val)
        props.setCurrent(props.path2);
      }
    }

    getData()
    return (
      <div style={{"overflow": "hidden", padding: 0, margin: 0}}>
        <iframe srcDoc={data} style={{width: `${widthPercent(props.w)}px`, height: `${heightPercent(props.h)}px`, overflow: 'hidden', padding: 0, margin: 0, left: 0}}></iframe>
      </div>
    )
}

export default GitHtml