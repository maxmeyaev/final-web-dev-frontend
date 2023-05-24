import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Divider } from '@mui/material'

const EmployeeView = (props) => {
  const {employee, editTask, allTasks} = props;
  let assignedTasks = allTasks.filter(task => task.employeeId===employee.id);
  let availableTasks = allTasks.filter(task => task.employeeId!==employee.id);
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>      
      <Card sx={{ width: 1200}}>
        <CardContent>
           <Typography variant="h4">{employee.firstname + " " + employee.lastname}</Typography>
          <Typography variant="h6">{employee.department !== null ? employee.department : 'Department has not been specified'}</Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
        <Card sx={{ width: 400, height: 700, paddingX: '1em'}}>
          <CardContent>
            <Box>
              <Typography variant="h6">
                Assigned Tasks:
              </Typography>
              <Divider sx={{ paddingY: '0.5em'}}/>
                {assignedTasks.map( task => {
                  return (
                  <Box sx={{ paddingTop: '1em'}}>
                    <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around"}}>
                    <Link to={`/task/${task.id}`}>
                      <Typography variant="h6">{task.description}</Typography>
                    </Link>
                    <Button variant="contained" color="error" onClick={() => editTask({id:task.id, employeeId: null})}>Delete</Button>
                    </div>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: 400, height: 700, paddingX: '1em'}}>
          <CardContent>
              <Box>
                <Typography variant="h6">
                  Available Tasks:
                </Typography>
                <Divider sx={{ paddingY: '0.5em'}}/>
                  {availableTasks.map( task => {
                  return (
                    <Box sx={{ paddingTop: '1em'}}>
                      <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-around"}}>
                      <Link to={`/task/${task.id}`}>
                        <Typography variant="h6">{task.description}</Typography>
                      </Link>
                      <Button variant="contained" color="success" onClick={() => editTask({id:task.id, employeeId: employee.id})}>Add</Button>
                      </div>
                    </Box>
                  );
              })}
              </Box>
            </CardContent>
        </Card>
        </Box>
      </Card>
    </Box>
  );

};

export default EmployeeView;