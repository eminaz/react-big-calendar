import React from 'react';
// import BigCalendar from 'react-big-calendar';

import BigCalendar from '../../src';
import moment from 'moment';


import events from '../events';
import { Popover, Button } from 'antd';
import './selectable.css'

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
          onSelectSlot={ (slotInfo) => {
            const now = new Date();
            let isDoubleClick = false;
            if(now - this.state.lastClick > 300) {
              this.setState({ lastClick: now });
            }
            else {
              isDoubleClick = true;
            }
            if (window.mousemovedown || isDoubleClick) {
              console.log('onSelectSlot');
              const { start, end } = slotInfo;
              const title = 'New Event';
              const newEvent = {
                start,
                end,
                title
              };
              this.setState({
                events: [...events, newEvent]
              });
              window.PopoverContent = window.PopoverContentTemplate({ start, end });
              document.getElementById(`${start}-${end}-${title}`).click();
            }
          }
        }
        />
      </div>
    )
  }
};

window.PopoverText = <span><b>Event / Task</b></span>;

window.PopoverContentTemplate = ({ start, end }) => {
  console.log('inside popover ', start, end);
  return (
    <div className='new-event-popover-container'>
      <input className='new-event-popover-input' placeholder='e.g., Measure weight 3 times a day' />

      <p><b className='new-event-popover-when'>When</b></p>
      <p>{`${moment(start).format('ddd, MMMM DD, hh:mm a')} - ${moment(end).format('hh mm a')}`}</p>
      <div className='new-event-popover-buttons'>
        <Button className='new-event-popover-button'>Edit</Button>
        <Button className='new-event-popover-button'>Create</Button>
      </div>
    </div>
  );
}

// const WrapperComponent = (props) => {
//   return <div style={{backgroundColor: 'red'}}>
//     wrapper
//     {props.children}
//   </div>
// }

export default Selectable;
