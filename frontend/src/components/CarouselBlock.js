import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ContentBlock from './ContentBlock.js';
import Title from './Title.js';
import '../css/carousel.css';

function ActionAreaCard(props) {
  return (
    <Card className="carouselCard" id={props.id} style={{margin: "auto", marginLeft: "1em", marginRight: "1em"}} sx={{ maxWidth: 345 }}>
      <Tooltip title="Add idea to goal list?" arrow followCursor>
        <CardActionArea onClick={props.onClick} className="carouselCardArea">
          <CardContent className="carouselCardContentArea">
            <Typography className="carouselCardContent" align="center" variant="body1" color="text.secondary" component="div">
              {props.title}
            </Typography>
            <Typography mt="1" align="center" gutterBottom variant="h5" component="div">
              {props.id === "carousel_elem_center" ? props.type : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Tooltip>
    </Card>
  );
}

class CarouselBlock extends React.Component {
  constructor(props) {
    super(props);
    this.image = "arrow.png";
    this.state = {current: 0};
  }

  handleCarouselPrev(max) {
    let new_current;
    if( this.state.current === 0 ) {
      new_current = max-1;
    } else {
      new_current = this.state.current - 1;
    }
    this.setState({current: new_current})
  }

  handleCarouselNext(max) {
    let new_current;
    if( this.state.current === max-1 ) {
      new_current = 0;
    } else {
      new_current = this.state.current + 1;
    }
    this.setState({current: new_current})
  }

  handleUpdate(e, max) {
    this.props.onUpdateToDoList(e);
    if(this.state.current >= max-1) {
      this.setState({current: max-2})
    }
  }

  render() {
    let content;

    if(this.state.current === -1) {
      this.setState({current: 0})
    }
    
    if( this.props.ideas.length !== 0 ) {  
      let ideasList = [];
      let prevSlide;
      let centerSlide;
      let nextSlide;

      for( let i = 0; i < this.props.ideas.length; i++ ) {
        if( this.props.ideas[i].status !== "completed" ) {
          ideasList.unshift( this.props.ideas[i] );
        }
      }

      if( this.state.current === 0 ) {
        prevSlide = ideasList.length-1;
        centerSlide = this.state.current;
        nextSlide = this.state.current +1;
      } else if( this.state.current === ideasList.length-1 ) {
        prevSlide = this.state.current - 1;
        centerSlide = this.state.current;
        nextSlide = 0;
      } else {
        prevSlide = this.state.current - 1;
        centerSlide = this.state.current;
        nextSlide = this.state.current + 1;
      }

      let prevElem;
      let centerElem;
      let nextElem;

      if(ideasList[prevSlide] !== undefined) {
        prevElem = <ActionAreaCard id="carousel_elem_outcenter" type={ideasList[prevSlide].type} title={ideasList[prevSlide].title} onClick={() => this.handleUpdate(ideasList[prevSlide], ideasList.length)} />;
      }
      if(ideasList[centerSlide] !== undefined) {
        centerElem = <ActionAreaCard id="carousel_elem_center" type={ideasList[centerSlide].type} title={ideasList[centerSlide].title} onClick={() => this.handleUpdate(ideasList[centerSlide], ideasList.length)} />;
      }
      if(ideasList[nextSlide] !== undefined) {
        nextElem = <ActionAreaCard id="carousel_elem_outcenter" type={ideasList[nextSlide].type} title={ideasList[nextSlide].title} onClick={() => this.handleUpdate(ideasList[nextSlide], ideasList.length)} />;
      }

      if(ideasList.length === 0) {
        content = (
          <div className="carousel">
            <div className="carousel_items">
              <div className="carousel_list">
                <Typography style={{margin: "3em"}} align="center" gutterBottom variant="h5" component="div">
                  Unfortunately you didn't set yourself any go
                </Typography>
              </div>
            </div>
          </div>
        );
      } else if (ideasList.length === 3) {
        content = (
          <div className="carousel">
            <div className="carousel_items">
              <div className="carousel_list">
                <ActionAreaCard id="carousel_elem_outcenter" type={ideasList[0].type} title={ideasList[0].title} onClick={() => this.handleUpdate(ideasList[0], ideasList.length)} />
                <ActionAreaCard id="carousel_elem_center" type={ideasList[1].type} title={ideasList[1].title} onClick={() => this.handleUpdate(ideasList[1], ideasList.length)} />
                <ActionAreaCard id="carousel_elem_outcenter" type={ideasList[2].type} title={ideasList[2].title} onClick={() => this.handleUpdate(ideasList[2], ideasList.length)} />
              </div>
            </div>
          </div>
        );
      }else if(ideasList.length < 3) {
        let cards = ideasList.map((value, key) => (
          <ActionAreaCard id="carousel_elem_center" key={key} type={value.type} title={value.title} onClick={() => this.handleUpdate(value, ideasList.length)} />
        ));
        content = (
          <div className="carousel">
            <div className="carousel_items">
              <div className="carousel_list">
                {cards}
              </div>
            </div>
          </div>
        );
      } else {
        content = (
          <div className="carousel">
            <div className="carousel_items">
              <div className="carousel_arrows">
                <Fab style={{margin: "auto"}} color="#354F52" onClick={() => this.handleCarouselPrev(ideasList.length)}>
                  <ArrowBackIosNewIcon />
                </Fab>
              </div>
              <div className="carousel_list">
                {prevElem}{centerElem}{nextElem}
              </div>
              <div className="carousel_arrows">
                <Fab style={{margin: "auto"}} color="#354F52" onClick={() => this.handleCarouselNext(ideasList.length)}>
                  <ArrowForwardIosIcon />
                </Fab>
              </div>
            </div>
            <div style={{margin: "1em"}}>{`${this.state.current+1} / ${ideasList.length}`}</div>
          </div>
        );
      }
    } else {
      content = (
        <div className="carousel">
          <div className="carousel_list">
            <Box style={{marginTop: "5em"}} sx={{ display: 'flex' }}><CircularProgress /></Box>;
          </div>
        </div>
      );
    }

    return (
      <ContentBlock>
        <Title content="Ideas in my list" />
        {content}
      </ContentBlock>
    )
  }
}

export default CarouselBlock;