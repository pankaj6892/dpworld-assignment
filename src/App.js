import Login from "./Components/Login/Login";
import ProjectAllocation from "./Components/ProjectAllocation/ProjectAllocation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/project">
            <ProjectAllocation page="project"/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <ProjectAllocation page="dashboard"/>
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
