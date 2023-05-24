import { Link } from 'react-router-dom';
import { Typography, Button, Box, Card, Alert } from '@mui/material';
const AllTasksView = (props) => {
    let {tasks, deleteTask} = props;
    if (!tasks.length) {
      return (
      <Box>
        <Alert severity='warning' sx={{  display: 'flex', justifyContent: 'center', paddingY: '1em'}}>There are no tasks</Alert>
        <Link to={`/newtask`}>
          <Button variant='contained'>Add New Task</Button>
        </Link>
      </Box>
      );
    }
    
    return (
      <div>
        {tasks.map((task) => {
          let description = task.description;
          return (
            <div key={task.id}>
              <Card sx={{ display: 'flex', justifyContent: 'center'}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Box>
                    <Link to={`/task/${task.id}`}>
                      <Typography variant='h4'>{description}</Typography>
                    </Link>
                  </Box>
                  <Box sx={{ marginX: '4em', padding: '1em'}}>
                    <Button color="error" variant="contained" onClick={() => deleteTask(task.id)}>Delete</Button>
                    <Button component={Link} to={`/newtask`} variant='contained' sx={{ marginLeft: '3em'}}>Add New Task</Button>
                  </Box>  
                </Box>
              </Card>
            </div>
          );
        }
        )}
      </div>
    );
  };
  
  
  export default AllTasksView;