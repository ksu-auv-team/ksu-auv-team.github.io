
import Emblem from "../svg/emblem.svg"
const Header = (props) => {

    const paths = props.paths;
    const currentP = props.current;
    var dirs = [];

    var dirs2 = []
    for (var i in paths) {
        var obj = paths[i]
        dirs = setDirFromPath(dirs, obj, 0)
    }

    function setDirFromPath(dirs, object, iter) {
        var pathSplit = object.path.split("/");
        //It's a directory
        if (iter < pathSplit.length-1) {
            var found = false;
            var foundi = -1
            for (var i = 0; i < dirs.length; i++) {
                if (dirs[i].path === pathSplit[iter]) found = true;
                foundi = i;
                break;
            }
            if (found === false) {
                dirs.push({
                    type: "dir",
                    path: pathSplit[iter],
                    display: object.display,
                    dirDisplay: object.dirDisplay,
                    children: []
                })
                dirs[dirs.length - 1].children = setDirFromPath(dirs[dirs.length - 1].children, object, iter+1)
            }
            else {
                dirs[foundi].children = setDirFromPath(dirs[foundi].children, object, iter+1)
            }
        }
        else {
            var name = pathSplit[iter].split(".");

            var nameout = "";
            for (var j = 0; j < name.length-1; j++) {
                nameout += name[j]
            }
            dirs.push({
                type: 'file',
                path: nameout,
                display: object.display,
            })
        }
        return dirs
    }


    const GetFolder = (props) => {
            const path = props.path
            const obj = props.obj
            const name = props.name
            const deep = props.deep


            const GetDirs = ((props) => {
                var tempObj = obj;
                return tempObj.map((current) => {
                    if (current.type === "dir") {
                        var displayText = current.path;
                        if (current.dirDisplay[deep] !== "") displayText = current.dirDisplay[deep];
                        return (<GetFolder path={"/" + path + current.path + "/"} obj={current.children} name={displayText} deep={deep+1}/>)
                    }
                })
            })
            const GetFiles = ((props) => {
                var tempObj = obj;
                return tempObj.map((current) => {
                    if (current.type === "file") {
                        if (current.path === "index.md") return <div />;
                        var currentText = "";
                        if (currentP === path + "/" + current.path) currentText = " current";
                        var displayText = current.path;
                        if (current.display !== "") displayText = current.display;
                        if (path === "") { 
                            return (<RootFile path={path + "/" + current.path} name={displayText} current={currentText} />);
                        }
                        else return (<File path={path + "" + current.path} name={displayText} current={currentText} />);
                    }
                })
            })
        if (path === "") {
            return (
                <nav className="full-navigation">
                    <ul>
					<GetFiles />
                    </ul>
                    <ul>
                    <GetDirs />
                    </ul>
                </nav>
            )
        }
        else 
        return (
        <li className="nav-item top-level">
        <a href={path}>{name}</a>
        <ul>
        <GetFiles />
        </ul>
        <ul>
        <GetDirs />
        </ul>
</li>
        ) 
        
    }


    const File = (props) => {
        return (<li className={`nav-item${props.current}`}><a href={props.path}>{props.name}</a></li>)
    }

    const RootFile = (props) => {
        return (<li className={`nav-item top-level${props.current}`}><a href={props.path}>{props.name}</a></li>)
    }



    return (
        <header>
			<h1>
				<a href="/"><img src={Emblem} width="40" height="40" alt="logo" /></a>
				KSU AUV
				<button type="button" className="open-nav" id="open-nav"></button>
			</h1>

			{/* <form action="http://ksu-auv-team.github.io/search/" method="get">
				<input type="text" name="q" id="search-input" placeholder="Search" autofocus="">
				<input type="submit" value="Search" style="display: none;">
			</form> */}

				<GetFolder obj={dirs} name="" path="" deep={0}/>
		</header>
        
    )

}
export default Header;