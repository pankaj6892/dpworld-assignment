import {createStore} from 'redux';

const getProjectRecord = (state = {project_details: 'test'}, action) => {
    if (action.type === 'getProjects'){
        state.project_details = 
            fetch("/project_details")
            .then((result) => result.json())
            .then((data) => {return data});
    }

    if (action.type === 'getEmployeeDetails'){
        state.employee_details = 
            fetch("/employees")
            .then((result) => result.json())
            .then((data) => {return data});        
    }

    return state;
};

const store = createStore(getProjectRecord);

export default store;