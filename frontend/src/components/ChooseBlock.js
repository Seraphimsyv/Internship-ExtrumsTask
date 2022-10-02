import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ContentBlock from './ContentBlock.js';
import Title from './Title.js';
import '../css/choose.css';

function ActionAreaCard(props) {
  return (
    <Card className="chooseCard" style={{margin: "1em"}} sx={{ maxWidth: 345 }}>
      <Tooltip title="Add idea to goal list?" arrow followCursor>
        <CardActionArea onClick={props.onClick} className="chooseCardArea">
          <CardContent className="chooseCardContentArea">
            <Typography className="chooseCardContent" align="center" variant="body1" color="text.secondary" component="div">
              {props.title}
            </Typography>
            <Typography mt="1" align="center" gutterBottom variant="h5" component="div">
              {props.type}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Tooltip>
    </Card>
  );
}

class ChooseBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ideas: null};
  }

  componentDidMount() {
    fetch('/api/get-templates-ideas')
      .then(res => res.json())
      .then(res => this.setState({ideas: res.ideas}));
  }

  handleUpdate(e) {
    this.props.onUpdateToDoList(this.state.ideas[e]);
  }

  render() {
    let content;
    
    if(this.state.ideas!=null) {
      content = this.state.ideas.map((value, key) => (
        <ActionAreaCard key={key} type={value.type} title={value.title} onClick={() => this.handleUpdate(key)} />
      ))
    } else {
      content =  <Box style={{marginTop: "5em"}} sx={{ display: 'flex' }}><CircularProgress /></Box>;
    }

    return (
      <ContentBlock>
        <Title content="Choose fresh ideas to do" />
        <div id="choose_list">
          {content}
        </div>
      </ContentBlock>
    )
  }
}

export default ChooseBlock;