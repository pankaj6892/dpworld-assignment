import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ProjectAllocation.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { Link } from "react-router-dom";

const ProjectAllocation = (props) => {
  const dispatch = useDispatch();

  const [employeeList, setEmployeeList] = useState([]);
  const [projectCard, setProjectCard] = useState([]);
  const [error, setError] = useState({});
  const [searchCriteria, setSearchCriteria] = useState({
    shift: "morning",
    department: "software",
  });

  const state = useSelector((state) => state);

  const getProjectData = () => {
    let errorFlag = 0;

    if (!searchCriteria.date) {
      setError({ ...error, date: "Select Date" });
      errorFlag = 1;
    } else {
      delete error.date;
    }
    if (searchCriteria.shift === "" || searchCriteria.shift === undefined) {
      setError({ ...error, shift: "Select Shift" });
      errorFlag = 1;
    }
    if (
      searchCriteria.shift === "" ||
      searchCriteria.department === undefined
    ) {
      setError({ ...error, department: "Select Department" });
      errorFlag = 1;
    }

    dispatch({ type: "getProjects" });
    if (errorFlag === 0) {
      state.project_details.then((data) => {
        let project = [];
        for (let i = 0; i < data.length; i++) {
          project.push(data[i]);
        }
        project = project.filter((pro) => {
          return (
            pro.date === searchCriteria.date &&
            pro.shift === searchCriteria.shift &&
            pro.department === searchCriteria.department
          );
        });
        setProjectCard(project);
      });

      getEmployeeData();
    } else {
      setProjectCard([]);
    }
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
    let filteredEmployeeTemp = employeeList.filter((employee) => {
      return employee.id === id;
    });
    setFilteredEmployee(filteredEmployeeTemp);
  };

  let projects = [];

  if (projectCard.length !== 0) {
    projects = projectCard.map((project) => {
      return <ProjectCard key={project.id} records={project} setEmployee={setEmployeeDetails} />;
    });
  }



  return (
    <div className="background__dark">
      <div className="row">
        <div className="column-left">
          <div className="navbar">
          <div>
              <Link to="/dashboard">
                <button className="navigation">Dashboard</button>
              </Link>
            </div>
            <div>
              <Link to="/project">
                <button className="navigation">Project Allocation</button>
              </Link>
            </div>
          </div>
          {props.page === "project" &&
          <div className="sidebar">
             
            <div className="filter__form">
              <div className="input__field">
                <label>Date: </label>
                <input
                  className="input__values"
                  type="date"
                  id="date"
                  name="date"
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      date: e.target.value,
                    })
                  }
                />
                <span className="validation__error">
                  {error.date ? error.date : " "}
                </span>
              </div>
              <div className="input__field">
                <label>Shift: </label>
                <select
                  id="shift"
                  name="shift"
                  className="input__values"
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      shift: e.target.value,
                    })
                  }
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
                <span className="validation__error"> </span>
              </div>
              <div className="input__field">
                <label>Dept: </label>
                <select
                  id="department"
                  name="department"
                  className="input__values"
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      department: e.target.value,
                    })
                  }
                >
                  <option value="software">Software Engg</option>
                  <option value="accounts">Accounts</option>
                  <option value="administration">Admin</option>
                </select>
                <span className="validation__error"> </span>
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
                      <td>Emp. No</td>
                      <td>
                        {filteredEmployee.length !== 0
                          ? filteredEmployee[0].id
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Emp. Name</td>
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
          </div>}
        </div>
        <div className="column-right">
          <div className="top__navigation">
            <div className="nav__text">{props.page === "project" ? "PROJECT WISE - EMPLOYEE ALLOCATION" : "DASHBOARD"}</div>
          </div>
          { props.page === "project" && <div className="projects">{projects}</div> }
        </div>
      </div>
    </div>
  );
};

export default ProjectAllocation;
