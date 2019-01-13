import React from 'react';
import Navigation from './components/navigation/navigation';
import Modal from './components/modal/modal';
import Timer from './components/timer/timer';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <Modal />
        <Timer />
      </div>
    )
  }
}

export default TimerContainer;