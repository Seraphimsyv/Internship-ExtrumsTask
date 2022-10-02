import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentBlock from './ContentBlock.js';
import Title from './Title.js';
import '../css/Completed.css';

class CompletedBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ideas: null};
  }

  render() {
    let completedList = [];
    let content;

    for( let i = 0; i < this.props.ideas.length; i++ ) {
      if( this.props.ideas[i].status === "completed" ) {
        this.props.ideas[i].id = i;
        completedList.unshift( this.props.ideas[i] );
      }
    }

    completedList.sort((l, r) => {
      return l.timestamp - r.timestamp;
    });

    if( this.props.ideas.length !== 0 ) {
      content = (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">When</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedList.map((row, key) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{key+1}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    } else {
      content =  <Box style={{marginTop: "4em"}} sx={{ display: 'flex' }}><CircularProgress /></Box>;
    }
    return (
      <ContentBlock>
        <Title content="Completed challenges" />
        <div className="table_block" style={{marginTop: "4em"}}>
          {content}
        </div>
      </ContentBlock>
    )
  }
}

export default CompletedBlock;