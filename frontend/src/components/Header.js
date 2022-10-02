import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: "#2F3E46"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDo App
          </Typography>
          <Button onClick={props.onSave} color="inherit">Save</Button>
          <Button onClick={props.onReload} color="inherit">Reload</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;