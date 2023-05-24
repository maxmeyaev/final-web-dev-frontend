import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk  } from '../../store/thunks';
import { Box, TextField, Card, Button, Typography } from '@mui/material'

/*
IMPORTANT: comments regarding implementation details!!
=====================================================
You'll see that we have two ways of interacting with the UI
in order to change the course's instructor

The dropdown menu is straighforward, it's pretty much the same 
as having the input field for the instructorId but allows us
to actually see the available insutrctors as well as their names, 
not just their IDs. We did have to connect to the allInstructors state
from the Redux store, as well as fetchAllInstructors in componentDidMount().
This was done so we could get the other instructors in the database.
We filter out the current instructor from the array at the beginning of 
the render function, and use this array to populate the dropdown menu
options. Because it's part of the form, we don't need to modify the 
handleSubmit function. On redirect to the CourseView we will see the 
updates.

You will see below the form there is another part of the UI that is
also changing the current course's instructor. This structure is similar
to how changing assigned courses is done in the InstrutcorView. There is
a slight drawback to using this approach in this context. When we perform
an EDIT_COURSE action (initiated by calling the editCourseThunk), this action
is sent to the allCourses reducer, not the course reducer. For that reason, 
we will not see the updates in the single course view unless there is another 
call to the fetchCourseThunk. This is done once when we redirect after form
submission, which is why the data is shown without needing to refresh. 
If we want that same functionality within the container, we need to make
a call to fetchCourse after each editCourse. We see that in the onClick
functionality of the buttons controlling that portion of the UI. 

*/

class EditTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          description: "", 
          priority: "",
          isComplete: false, 
          employeeId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting task ID from url
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchEmployees();
        this.setState({
            description: this.props.task.description, 
            priority: this.props.task.priority, 
            employeeId: this.props.task.employeeId, 
            isComplete: this.props.task.isComplete,
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSelectChange = event => {
      //handle change for the dropdown menu
      //want to set the employeeId based on the selected choice
      //when the form gets submitted, this is how we can change
      //assigned employee without having to manually enter in the 
      //employeeId like before
      if (event.target.value === "staff") {
        this.setState({employeeId:null});
      } else {
        this.setState({employeeId: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.description === "") {
          this.setState({error: "Error: description cannot be empty"});
          return;
        } else if (this.state.priority === "") {
          this.setState({error: "Error: Priority cannot be empty"});
          return;
        }

        //get new info for task from form input
        let task = {
            id: this.props.task.id,
            description: this.state.description,
            priority: this.state.priority,
            employeeId: this.state.employeeId,
            isComplete: this.state.isComplete,
        };
        
        this.props.editTask(task);

        this.setState({
          description: this.props.task.description,
          priority: this.props.task.priority,
          isComplete: this.props.task.isComplete,
          redirect: true, 
          redirectId: this.props.task.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { task, allEmployees, editTask, fetchTask} = this.props;
        let assignedEmployee = task.employeeId;

        let otherEmployees = allEmployees.filter(employee => employee.id!==assignedEmployee);
      
        //go to single task view of the edited task
        if(this.state.redirect) {
          return (<Redirect to={`/task/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 600, paddingTop: '1em'}}>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  type='text'
                  name='description'
                  label='Description'
                  value={this.state.description || ''}
                  placeholder={task.description}
                  onChange ={(e) => this.handleChange(e)}
                />
              </Box>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  type='text'
                  name='priority'
                  label='Priority'
                  value={this.state.priority || ''}
                  placeholder={task.priority}
                  onChange ={(e) => this.handleChange(e)}
                />
              </Box>
              <Box sx={{paddingY: '1em'}}>
                <select onChange={(e) => this.handleSelectChange(e)}>
                  {task.employee!==null ?
                    <option value={task.employeeId}>{task.employee.firstname + " (current)"}</option>
                  : <option value="staff">Staff</option>
                  }
                  {otherEmployees.map(employee => {
                    return (
                      <option value={employee.id} key={employee.id}>{employee.firstname}</option>
                    )
                  })}
                  {task.employee!==null && <option value="staff">Staff</option>}
                </select>
              </Box>
              <Box sx={{paddingY: '1em'}}>
                <Button
                  variant="outlined"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Box>
          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {task.employeeId !== null ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
              <Typography variant='h6' sx={{ paddingX: '0.5em'}}>Current employee: </Typography>
              <Link to={`/employee/${task.employeeId}`}>{task.employee.firstname}</Link>
              <Button sx={{ marginX: '1em'}} variant='contained' color='warning' onClick={async () => {await editTask({id:task.id, employeeId: null});  fetchTask(task.id)}}>Unassign</Button>
            </Box>
            : <div> No employee currently assigned </div>
          }

          <div> Other employees
          {otherEmployees.map(employee => {
            return (
            <div key={employee.id}>
                <Link to={`/employee/${employee.id}`}>
                  <h4>{employee.firstname}</h4>
                </Link>
                <button onClick={async() => {await editTask({id:task.id, employeeId: employee.id}); fetchTask(task.id)}}>Assign this employee</button>
            </div>
            )})
          }
          </div>
        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      task: state.task,
      allEmployees: state.allEmployees
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editTask: (task) => dispatch(editTaskThunk(task)),
        fetchTask: (id) => dispatch(fetchTaskThunk(id)),
        fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);