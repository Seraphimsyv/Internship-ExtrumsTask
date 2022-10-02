import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ContentBlock from './ContentBlock.js';
import Title from './Title.js';
import Achievement from './Achivement.js';
import '../css/Achivements.css';

class AchivementsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {types: null};
  }

  componentDidMount() {
    fetch('/api/get-types-ideas')
      .then(res => res.json())
      .then(res => this.setState({types: res.types}));
  }

  render() {
    let types = {};
    let achivements = [];
    let content;

    if(this.state.types != null && this.props.ideas.length > 0) {

      for(let i = 0; i < this.state.types.length; i++) {
        types[this.state.types[i]] = 0;
      }

      for(let i = 0; i < this.props.ideas.length; i++) {
        if(this.props.ideas[i].status==="completed") {
          types[this.props.ideas[i].type] += 1;
        }
      }

      for(const property in types) {
        if(types[property] === 0) {
          delete types[property];
        } else {
          achivements.push({type: property, count: types[property]});
        }
      }

      achivements = achivements.map((value, key) => (
        <Achievement key={key} type={value.type} count={value.count} />
      ))

      content = (
        <div className="achievements_list">
          {achivements}
        </div>
      );
    } else {
      content = <Box style={{marginTop: "4em"}} sx={{ display: 'flex' }}><CircularProgress /></Box>;
    }

    return (
      <ContentBlock>
        <Title content="Achievements" />
        <div className="achivement_block">
          {content}
        </div>
      </ContentBlock>
    );
  }
}

export default AchivementsBlock;