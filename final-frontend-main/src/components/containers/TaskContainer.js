import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from '@mui/material'
import { fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";

class TaskContainer extends Component {
  componentDidMount() {
    //getting task ID from url
    this.props.fetchTask(this.props.match.params.id);
  }
  render() {
    const { task } = this.props;
    return (
      <div>
        { task ? 
          <TaskView 
            task={this.props.task}
            />
          : <Alert severity="warning">No tasks found</Alert>
        }
      </div>
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(TaskContainer);