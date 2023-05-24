/* eslint-disable no-unused-vars */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { TextField, Card, Box, Button} from '@mui/material';
import { fetchEmployeeThunk, editEmployeeThunk, fetchAllTasksThunk } from '../../store/thunks';



class EditEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "",
          department: "",
          employeeId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting task ID from url
        this.props.fetchEmployee(this.props.match.params.id);
        this.props.fetchAllTasks();
        this.setState({
            firstname: this.props.employee.firstname, 
            lastname: this.props.employee.lastname,  
            department: this.props.employee.department,  
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    // handleSelectChange = event => {
    //   //handle change for the dropdown menu
    //   //want to set the employeeId based on the selected choice
    //   //when the form gets submitted, this is how we can change
    //   //assigned employee without having to manually enter in the 
    //   //employeeId like before
    //   if (event.target.value === "staff") {
    //     this.setState({employeeId:null});
    //   } else {
    //     this.setState({employeeId: event.target.value})
    //   }
    // }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.firstname === "" || this.state.lastname === "" || this.state.department === "") {
          this.setState({error: "Error: Please fill out all the required fields"});
          return;
        }

        //get new info for course from form input
        let employee = {
            id: this.props.employee.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department,
        };
        
        this.props.editEmployee(employee);

        this.setState({
          redirect: true, 
          firstname: this.props.employee.firstname,
          lastname: this.props.employee.lastname,
          department: this.props.employee.department,
          redirectId: this.props.employee.id,
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        let { employee, allTasks } = this.props;
        let assignedEmployee = employee.employeeId;

        // let otherEmployees = allTasks.filter(task => task.id!==assignedEmployee);
      
        //go to employee view of the edited task
        if(this.state.redirect) {
          return (<Redirect to={`/employee/${this.state.redirectId}`}/>)
        }
        return (
        <div>
        <form style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <Card sx={{ width: 600, paddingTop: '1em'}}>
                <Box sx={{paddingY: '1em'}}>
                    <TextField 
                        type='text' 
                        label="First Name" 
                        name="firstname"
                        value={this.state.firstname}
                        onChange ={(e) => this.handleChange(e)}
                    />
                </Box>
                <Box sx={{paddingY: '1em'}}>
                    <TextField 
                        type='text' 
                        label="Last Name" 
                        name="lastname"
                        value={this.state.lastname}
                        onChange ={(e) => this.handleChange(e)}
                    />
                </Box>
                <Box sx={{paddingY: '1em'}}>
                    <TextField 
                        type='text' 
                        label="Department" 
                        name="department"
                        value={this.state.department}
                        onChange ={(e) => this.handleChange(e)}
                    />
                </Box>
                <Box sx={{paddingY: '1em'}}>
                    <Button
                        variant="outlined"
                        type="submit"
                    > Submit</Button>
                </Box>
            </Card>
          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }
        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      employee: state.employee,
      allTasks: state.allTasks
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
        fetchAllTasks: () => dispatch(fetchAllTasksThunk()),
    })
}

export default connect(mapState, mapDispatch)(EditEmployeeContainer);