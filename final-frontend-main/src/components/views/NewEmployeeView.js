import { TextField, Card, Typography, Box, Button } from "@mui/material";
const NewEmployeeView = (props) => {
    const {handleChange, handleSubmit, error } = props;
    return (
      <div className="root">
        <div className="formContainer" style={{ paddingTop: '1em'}}>
          <form style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <Card sx={{ width: 600, paddingTop: '1em'}}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              New Employee
            </Typography>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  label="First Name"
                  type="text"
                  name="firstname"
                  onChange ={(e) => handleChange(e)}
                  />
                </Box>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  label="Last Name"
                  type="text"
                  name="lastname"
                  onChange ={(e) => handleChange(e)}
                />
              </Box>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  label="Department"
                  type="text"
                  name="department"
                  onChange ={(e) => handleChange(e)}
                />
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
          </form>
          {error!=="" && <p>{error}</p>}
          </div>
        </div>
      
    )
  }
  
  export default NewEmployeeView;