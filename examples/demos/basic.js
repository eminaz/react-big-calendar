import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

const Basic = class extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      events
    }
  }
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={this.state.events}
        views={allViews}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
};

export default Basic;
