import {createStore} from 'redux';
import axios from 'axios';

const getProjectRecord = (state = {project_details: 'test'}, action) => {
    if (action.type === 'getProjects'){
        state.project_details = 
            fetch("http://localhost:3001/project_details")
            .then((result) => result.json())
            .then((data) => {return data});
    }

    if (action.type === 'getEmployeeDetails'){
        state.employee_details = 
            fetch("http://localhost:3001/employees")
            .then((result) => result.json())
            .then((data) => {return data});        
    }

    console.log(state);

    return state;
};

const store = createStore(getProjectRecord);

export default store;