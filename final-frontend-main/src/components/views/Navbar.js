import React from 'react';
import { AppBar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <Box>
        <AppBar position='static' sx={{paddingY: '1em'}}>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Button sx={{ color: '#ffff', backgroundColor: '#64748B', marginX: '2em'}} component={Link} to={`/`}>Home</Button>
                <Button sx={{ color: '#ffff', backgroundColor: '#64748B', marginX: '2em'}} component={Link} to={`/employees`}>All Employees</Button>
                <Button sx={{ color: '#ffff', backgroundColor: '#64748B', marginX: '2em'}} component={Link} to={`/tasks`}>All Tasks</Button>
            </Box>
        </AppBar>
    </Box>
  )
}
