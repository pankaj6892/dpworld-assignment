import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProjectAllocation.css";
import ReactDataGrid from "react-data-grid";
import Board from "../Board/Board";
import Card from "../Card/Card";
import ProjectCard from "../ProjectCard/ProjectCard";

const ProjectAllocation = (props) => {
  const dispatch = useDispatch();

  const [employeeList, setEmployeeList] = useState([]);
  const [projectCard, setProjectCard] = useState([]);

  //props.data.then((data) => {setEmployeeList(data[0].employees[0])});
  const state = useSelector((state) => state);

  console.log(state);

  const getProjectData = () => {
    dispatch({ type: "getProjects" });
    state.project_details.then((data) => {
      let project = [];
      for (let i = 0; i < data.length; i++) {
        project.push(data[i]);
      }
      setProjectCard(project);
    });

    getEmployeeData();
  };

  const getEmployeeData = () => {
    dispatch({ type: "getEmployeeDetails" });
    state.employee_details.then((data) => {
      let employee = [];
      for (let i = 0; i < data.length; i++) {
        employee.push(data[i]);
      }
      setEmployeeList(employee);
    });
  };

  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const setEmployeeDetails = (id) => {
    console.log("Filter called with id ", id);
    console.log(employeeList);
    let filteredEmployeeTemp = employeeList.filter((employee) => {
      return employee.id === id;
    });
    setFilteredEmployee(filteredEmployeeTemp);
  };

  let projects = [];

  if (projectCard.length !== 0) {
    projects = projectCard.map((project) => {
      return <ProjectCard records={project} setEmployee={setEmployeeDetails} />;
    });
  }

  console.log(projects);

  const columns = [{ key: "id", name: "ID", editable: true }];

  const rows = [{ id: 0 }, { id: 1 }, { id: 2 }];
  return (
    <div className="background__dark">
      <div className="row">
        <div className="column-left">
          <div className="sidebar">
          <div><button className="navigation">Dashboard</button></div>
            <div><button className="navigation">Project Allocation</button></div>
            <div className="filter__form">
              <div className="input__field">
                <label for="Date">Date: </label>
                <input
                  className="input__values"
                  type="date"
                  id="date"
                  name="date"
                />
                <p> </p>
              </div>
              <div className="input__field">
                <label for="Shift">Shift: </label>
                <select id="shift" name="shift" className="input__values">
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="Night">Night</option>
                </select>
                <p> </p>
              </div>
              <div className="input__field">
                <label for="Dept">Dept: </label>
                <select
                  id="department"
                  name="department"
                  className="input__values"
                >
                  <option value="software">Software Engg</option>
                  <option value="accounts">Accounts</option>
                  <option value="administration">Admin</option>
                </select>
                <p> </p>
              </div>
              <button className="submit__button" onClick={getProjectData}>
                Display
              </button>
            </div>
            {filteredEmployee.length !== 0 && (
              <div className="employee__details">
                <table className="styled__table">
                  <thead>
                    <tr>
                      <th colSpan="2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Employee No</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].id
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Employee Name</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].name
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Controller</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].controller
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Manager</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].manager
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Project</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].project
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Skill</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].skill
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].role
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Grade</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].grade
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="column-right">
          <div className="top__navigation">
            <div className="nav__text">PROJECT WISE - EMPLOYEE ALLOCATION</div>
          </div>
          <div className="projects">{projects}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAllocation;
