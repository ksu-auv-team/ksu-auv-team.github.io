import ReactMarkdown from 'react-markdown'
import {fetch} from 'cross-fetch'
import React, {useState} from 'react'

const GitMarkdown = (props) => {
    const [data, setData] = useState("")
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
        <section className="main">
          <div className="page-header"></div>
          <article className="content"><ReactMarkdown>{data}</ReactMarkdown></article>
        </section>
    )
}

export default GitMarkdown