
import { Card, Box, Typography, CardContent, Button } from '@mui/material'
import { Link } from 'react-router-dom';


const HomePageView = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card sx={{ width: 800, height: 800}}>
        <CardContent>
          <Typography variant='h3'>Final Project</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Button component={Link} variant='contained' to={'/employees'}>
              All Employees
            </Button>
            <Button component={Link} variant='contained' to={'/tasks'}> All Tasks</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );    
}




export default HomePageView;
