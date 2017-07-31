import React from 'react';
// import BigCalendar from 'react-big-calendar';

import BigCalendar from '../../src';


import events from '../events';
import { Popover, Button } from 'antd';

const Selectable = class extends React.Component {
  constructor(p) {
      super(p);
      this.state = {
        events,
        lastClick: new Date()
      }
    }
  render(){
    const events = this.state.events;
    return (
      <div {...this.props}>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <Button>Button</Button>
        <BigCalendar
          selectable
          events={events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => {
            const now = new Date();
            if(now - this.state.lastClick > 300) {
              console.log('singleClick');
              this.setState({ lastClick: now });
            }
            else {
              console.log('double click ', event.title);
            }
          }}
          onClick={ (e) => console.log('click') }
          onSelectSlot={ (slotInfo) => {
            console.log(slotInfo);
            const { start, end } = slotInfo;
            const newEvent = {
              start,
              end,
              title: 'New Event'
            };
            this.setState({
              events: [...events, newEvent]
            });
          }
        }
        />
      </div>
    )
  }
};

// const WrapperComponent = (props) => {
//   return <div style={{backgroundColor: 'red'}}>
//     wrapper
//     {props.children}
//   </div>
// }

export default Selectable;
