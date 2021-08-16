import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Upload from "./components/Upload";

const Routing = ():JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route exact path="/upload" component={Upload} />
            </Switch>
        </Router>
    )
}

export default Routing;