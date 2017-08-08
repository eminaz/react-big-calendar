import React from 'react';
// import BigCalendar from 'react-big-calendar';
import BigCalendar from '../../src';
import moment from 'moment';

import events from '../events';
import PopoverContentTemplate from './PopoverComponent';
import { Button } from 'antd';
import './selectable.css';
import _ from 'lodash';



const startDate = moment('2015-04-15');
const endDate = moment('2015-04-17');

const Selectable = class extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      events,
      lastClick: new Date()
    };
    this.calendarUpdate = this.forceUpdate.bind(this);
  }
  componentDidMount() {
    this.convertTasks();
    window.removeTask = this.removeTask.bind(this);
  }
  removeTask(event) {
    const { start, end, title, id } = event;
    let events = _.cloneDeep(this.state.events);
    events = events.filter( (e) => e.id !== event.id);
    this.setState({ events });
    document.querySelector('.ant-popover:not(.ant-popover-hidden)') && document.querySelector('.ant-popover:not(.ant-popover-hidden)').classList.add('ant-popover-hidden');
    document.querySelector('.ant-popover-open').click();
    console.log('window.removeTask ', start, end, title, id, events.length);
  }
  convertTasks () {
    let events = _.cloneDeep(this.state.events);
    events.forEach( (event) => {
      if (event.meta) {
        event.meta.forEach( (item) => {
          this._addTask({ event, item, events });
        });
      }
    });
    this.setState({ events });
  }
  _addTask({ event, item, events }) {
    const { type, category } = event;
    let currentDate = moment(startDate);
    while (currentDate < endDate) {
      const newTask = {
        type,
        category,
        id: Math.random(),
        title: category,
        start: new Date(currentDate + item.after),
        end: new Date(currentDate + item.before)
      };
      events.push(newTask);
      currentDate = currentDate.add(1, 'day');
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
              window.PopoverContent = <PopoverContentTemplate event={event} calendarUpdate={this.calendarUpdate} />;
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
              const id = Math.random();
              const newEvent = {
                id: Math.random()
                start,
                end,
                title
              };
              this.setState({
                events: [...events, newEvent]
              });
              window.PopoverContent = <PopoverContentTemplate event={newEvent} calendarUpdate={this.calendarUpdate} />;
              document.getElementById(`${start}-${end}-${title}`).click();
            }
          }
        }
        />
      </div>
    )
  }
};

export default Selectable;
