import { Link } from "react-router-dom";
import { Box, Card, Typography, Button } from '@mui/material'
const TaskView = (props) => {
  const { task } = props;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card sx={{ width: 500}}>
        <Typography variant="h4">Task: {task.description}</Typography>
        {task.employee ? 
          <Typography variant="h6"><b> Assigned Employee</b>: {task.employee.firstname + " " + task.employee.lastname}</Typography>
          : <Typography variant="h6">staff</Typography>}
        <Typography variant="h6"><b>Priority</b>: {task.priority}</Typography>
        <Typography variant="h6"><b>Task Completion</b>: {task.isComplete ? 'Completed': 'Not Completed'}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', paddingY: '1em'}}>
          <Button variant="contained" component={Link} to={`/edittask/${task.id}`} >Edit Task Information</Button>
          <Button variant="contained" component={Link} to={`/tasks`}>View All Tasks</Button>
        </Box>
      </Card>
    </Box>
  );

};

export default TaskView;