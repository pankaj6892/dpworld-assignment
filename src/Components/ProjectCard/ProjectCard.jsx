import React, { useState } from "react";
import Board from "../Board/Board";
import Card from "../Card/Card";

const ProjectCard = (props) => {
  console.log(props);
  const [employeeList, setEmployeeList] = useState(props.records.employees);

  let employees = {};

  if (employeeList.length !== 0) {
    employees = employeeList.map((employee) => {
      return (
        <Card
          id={employee.id}
          className="card"
          draggable="true"
          setEmployee={props.setEmployee}
        >
          <p>{employee.id}</p>
        </Card>
      );
    });
  }

  return (
    <div className="project__card">
      <span>Project: {props.records.project}</span>
      <br />
      <span>Controller: {props.records.controller}</span>
      <br />
      <span>Manager: {props.records.manager}</span>
      <br />

      <div className="flexbox">
        <Board id={props.records.id} className="board">
          {employees}
        </Board>
      </div>
    </div>
  );
};

export default ProjectCard;
