import Login from "./Components/Login/Login";
import ProjectAllocation from "./Components/ProjectAllocation/ProjectAllocation";
import axios from "axios";
import TestDragDrop from "./Components/TestDragDrop/TestDragDrop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  let state = {};

  state = axios
    .get("http://localhost:3001/project_details")
    .then((response) => {
      response = response.data;
      return response;
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("There was an error!", error);
      return { errorMessage: error.message };
    });

  // state.project_details.then(
  //   console.log(state.project_details)
  // )

  console.log(state);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/project">
            <ProjectAllocation data={state} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/test">
            <TestDragDrop />
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
