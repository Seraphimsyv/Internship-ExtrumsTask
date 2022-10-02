import React from 'react';
import Header from './components/Header.js';
import ChooseBlock from './components/ChooseBlock.js';
import CarouselBlock from './components/CarouselBlock.js';
import AchivementsBlock from './components/AchivementsBlock.js';
import CompletedBlock from './components/CompletedBlock.js';
import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this)
    this.handleReload = this.handleReload.bind(this)
    this.handleUpdateElementActive = this.handleUpdateElementActive.bind(this);
    this.handleUpdateElementCompleted = this.handleUpdateElementCompleted.bind(this);
    this.state = {
      to_do_list: [], last_id: 0
    };
  }

  componentDidMount() {
    this.handleReload();
  }

  handleSave() {
    fetch('/api/upload-data', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
  }

  handleReload() {
    fetch('/api/get-ideas')
      .then(res => res.json())
      .then(res => this.setState({to_do_list: res.ideas, last_id: res.ideas.length}))
  }

  handleUpdateElementActive(e) {
    this.state.to_do_list.unshift(
      {
        id: this.state.last_id+1,
        type: e.type,
        title: e.title,
        status: "active"
      }
    );
    this.setState({to_do_list: this.state.to_do_list, last_id: this.state.last_id+1});
  }

  handleUpdateElementCompleted(e) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();
    let state_data = this.state.to_do_list;
        
    for( let i = 0; i < state_data.length; i++ ) {
      if( state_data[i] === e ) {
        delete state_data[i]._id;
        state_data[i].timestamp = Date.now();
        state_data[i].date = today.toLocaleTimeString("en-US", options);
        state_data[i].status = "completed";
        break;
      }
    }

    this.setState( { to_do_list: state_data } );
  }

  render() {
    return (
      <div className="App">
        <Header onSave={ this.handleSave } onReload={ this.handleReload } />
        <ChooseBlock onUpdateToDoList={ this.handleUpdateElementActive } />
        <CarouselBlock onUpdateToDoList={ this.handleUpdateElementCompleted } ideas={this.state.to_do_list} />
        <AchivementsBlock ideas={this.state.to_do_list} />
        <CompletedBlock ideas={this.state.to_do_list} />
      </div>
    )
  }
}

export default App;
