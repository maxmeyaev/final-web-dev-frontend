import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Box, Card, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const AllEmployeesView = (props) => {
  if (!props.allEmployees.length) {
    return <Typography>There are no employees.</Typography>;
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {props.allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
            <Card sx={{width: 400, height: 500, marginX: '2em'}}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: '1em'}}>
                <Avatar sx={{width: 45, height: 45, bgcolor: deepPurple[400]}}>{employee.firstname[0] + employee.lastname[0]}</Avatar>
              </Box>
              <Link to={`/employee/${employee.id}`}>
                <Box sx={{ paddingX: '1em'}}>
                  <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{name}</Typography>
                </Box>
              </Link>
                  <Typography variant="h6" sx={{ marginTop: '1em'}}>{employee.department}</Typography>
            </Card>
          </div>
        );
      })}
    </Box>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;
