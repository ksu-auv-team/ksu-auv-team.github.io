import {useState, useEffect } from 'react';
import {fetch} from 'cross-fetch'
export default function usePath() {

    const [path, setPath] = useState([])
    const [namesObj, setNamesObj] = useState({})
    
    async function getFiles(path) {
    var out = [];  
    var dir = await fetch("https://api.github.com/repos/" + process.env.REACT_APP_OWNER + "/" + process.env.REACT_APP_REPO + "/contents/" + path, {
        method: "get",
        headers: {
          "Accept": "application/json",
          // "Authorization": "Bearer " + process.env.REACT_APP_GITHUB_TOKEN,
          // "X-GitHub-Api-Version": "2022-11-28"
        }
      }).then(result => result.json()).then(json => {return json});
        for (var i in dir) {
          var entry = dir[i];
          if (entry.path === "paths.json") {
            var namesObj2 = await fetch(entry.download_url, {
                method: "get",
                headers: {
                    "Accept": "application/json"
                }
              }).then(result => result.json()).then(json => {return json});
              if (JSON.stringify(namesObj).length !== JSON.stringify(namesObj2).length) setNamesObj(namesObj2)
              console.log(JSON.stringify(namesObj).length !== JSON.stringify(namesObj2.length))
          }
          

          else {
            var name2 = ""
            var displayNames = [];
            var displaySetup = [];
            var keys = Object.keys(namesObj);
            var pathSplit = entry.path.replaceAll("/", "$").split("$")
            

            var displayOut = "";
            for (var j = 0; j < pathSplit.length-1; j++) {
                displayOut += pathSplit[j];
                displaySetup.push(displayOut);
                displayOut += "$"
            }
            for (var j = 0; j < keys.length; j++) {
                for (var k = 0; k < displaySetup.length; k++) {
                    if (keys[j] === displaySetup[k]) {
                        displayNames.push(namesObj[keys[j]])
                    }
                    else displayNames.push("")
                }
                if (keys[j] === entry.path.replaceAll("/", "$")) {
                    console.log(keys[j])
                    console.log(entry.path.replaceAll("/", "$"))
                    name2 = namesObj[keys[j]];
                    break;
                }
            }
            if (entry.type === "file") {
                if (entry.name === "index.md") {
                    var entry_out = {
                        type: "markdown",
                        path: path.replaceAll("index.md", ""),
                        url: entry.download_url,
                        name: entry.name,
                        dirDisplay: displayNames,
                        display: name2
                    }
                    out.push(entry_out)
                }
                else if (entry.name.endsWith(".md")) {
                    var entry_out = {
                        type: "markdown",
                        path: entry.path,
                        url: entry.download_url,
                        name: entry.name,
                        dirDisplay: displayNames,
                        display: name2
                    }
                    out.push(entry_out)
                }
                else if (entry.name.endsWith(".html")) {
                    var entry_out = {
                        type: "html",
                        path: entry.path,
                        url: entry.download_url,
                        name: entry.name,
                        dirDisplay: displayNames,
                        display: name2
                    }
                    out.push(entry_out)
                }
            }
            else if (entry.type === "dir") {
                var out2 = await getFiles(entry.path);
                for (var j in out2) {
                out.push(out2[j])
                }
            }
          }
        }
        return out;
    }

    async function getPath() {
        var path2 = await getFiles("")
        if (path.length === path2.length) return;
        setPath(path2)
    }
    useEffect(() => {
        getPath()
    })
    
    

    return path;
}