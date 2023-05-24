import { TextField, Card, Typography, Box, Button } from "@mui/material";
const NewTaskView = (props) => {
    const {handleChange, handleSubmit, error } = props;
    return (
      <div className="root">
        <div className="formContainer" style={{ paddingTop: '1em'}}>
          <form style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <Card sx={{ width: 600, paddingTop: '1em'}}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              New Task
            </Typography>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  label="Description"
                  type="text"
                  name="description"
                  onChange ={(e) => handleChange(e)}
                  />
                </Box>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  label="Priority"
                  type="text"
                  name="priority"
                  helperText="Low, Medium, High"
                  onChange ={(e) => handleChange(e)}
                />
              </Box>
              <Box sx={{paddingY: '1em'}}>
                <TextField 
                  label="Employee ID"
                  type="text"
                  name="employeeId"
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
  
  export default NewTaskView;