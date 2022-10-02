import { Typography } from '@mui/material';

function Title(props) {
  return (
    <Typography align="center" variant='h3' component="div" color="#354F52">
      {props.content}
    </Typography>
  )
}

export default Title;