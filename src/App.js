import logo from './logo.svg';
import usePath from './hooks/usePath';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {fetch} from 'cross-fetch';
import GitMarkdown from './components/GitMarkdown';

import GitHtml from './components/GitHtml';
import Header from './components/Header';
import { useState } from 'react';

const App = () => {
  const path = usePath();

  const [current, setCurrent] = useState("/");

  var routerObj = []
  for (var i in path) {
    var obj = path[i];

    if (obj.type === "markdown") {
      if (obj.name === "index.md") {
        var pathN = obj.path.replaceAll("index.md", "");

        routerObj.push({
            path: "/" + pathN,
            element: <GitMarkdown path={obj.url} setCurrent={setCurrent} path2={"/" + pathN} />
        })
      }
      else {
          var pathN = obj.path.replaceAll(".md", "");
        routerObj.push({
            path: "/" + pathN,
            element: <GitMarkdown path={obj.url} setCurrent={setCurrent} path2={"/" + pathN} />
        })
      }
    }
    else if (obj.type === "html") {
      var pathN = obj.path.replaceAll(".html", "");
      routerObj.push({
        path: "/" + pathN,
        element: <GitHtml path={obj.url} w={1920} h={1080} setCurrent={setCurrent} path2={"/" + pathN}/>
    })
    }
  }
  if (routerObj.length > 0) {
    const router = createBrowserRouter(routerObj)
    return (
      <div className="App">
        <Header paths={path} current={current} />
        <RouterProvider router={router}/>
      </div>
    );
  }
  else return (
    <div className="App">
      <h1>Test Page</h1>
    </div>
  );

}

export default App;
