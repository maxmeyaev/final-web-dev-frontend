import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
const AllTasksView = (props) => {
    let {tasks, deleteTask} = props;
    if (!tasks.length) {
      return (
      <Box>
        <Typography variant='h6' sx={{ paddingY: '1em'}}>There are no tasks</Typography>
        <Link to={`/newtask`}>
          <Button variant='contained'>Add New Task</Button>
        </Link>
      </Box>
      );
    }
    
    return (
      <div>
        {tasks.map((task) => {
          let title = task.title;
          return (
            <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <h1>{title}</h1>
            </Link>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          );
        }
        )}
        <Link to={`/newtask`}>
          <button>Add New Task</button>
        </Link>
      </div>
    );
  };
  
  
  export default AllTasksView;