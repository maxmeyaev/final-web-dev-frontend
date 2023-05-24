import * as at from './employeeActions';


// Fetch all the employees
export const fetchAllEmployees = (employees) => {
    return {
        type: at.FETCH_ALL_EMPLOYEES,
        payload: employees,
    };
};

// Single employee fetch
export const fetchEmployee = (employee) => {
    return {
        type: at.FETCH_EMPLOYEE,
        payload: employee,
    };
};

// Add an employee 
export const addEmployee = (employee) => {
    return {
        type: at.ADD_EMPLOYEE,
        payload: employee,
    };
}

//Delete an employee
export const deleteEmployee = (employee) => {
    return {
        type: at.DELETE_EMPLOYEE,
        payload: employee,
    };
}


// Fetch all the tasks
export const fetchAllTasks = (tasks) => {
    return {
        type: at.FETCH_ALL_TASKS,
        payload: tasks,
    };
};

// Fetch a single task
export const fetchTask = (task) => {
    return {
        type: at.FETCH_TASK,
        payload: task,
    };
};

// Add a single task
export const addTask = (task) => {
    return {
        type: at.ADD_TASK,
        payload: task,
    };
};

// Delete a single task
export const deleteTask = (task) => {
    return {
        type: at.DELETE_TASK,
        payload: task,
    };
};

// Edit a single task
export const editTask = (task) => {
    return {
        type: at.EDIT_TASK,
        payload: task,
    };
};


