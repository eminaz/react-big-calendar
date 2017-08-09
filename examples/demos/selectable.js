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
    window.pasteTask = this.pasteTask.bind(this);
  }
  removeTask(event) {
    // fix the bug that after removing an event, the popover appears for the adjacent events
    document.querySelector('.ant-popover:not(.ant-popover-hidden)') && document.querySelector('.ant-popover:not(.ant-popover-hidden)').classList.add('ant-popover-hidden');
    document.querySelector('.ant-popover-open').click();

    const { start, end, title, id } = event;
    let events = _.cloneDeep(this.state.events);
    events = events.filter( (e) => e.id !== event.id);
    this.setState({ events });
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
  pasteTask(date, event) {
    const events = _.cloneDeep(this.state.events);
    const dayDifferenceStart = (moment(date) - moment(moment(event.start).format('YYYY-MM-DD'))) / 86400000;
    const dayDifferenceEnd = (moment(date) - moment(moment(event.end).format('YYYY-MM-DD'))) / 86400000;

    const newEvent = {
      ...event,
      start: new Date(moment(event.start).add(dayDifferenceStart, 'day')),
      end: new Date(moment(event.end).add(dayDifferenceEnd, 'day')),
      id: Math.random()
    }
    events.push(newEvent);
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
            // only create new event when there is selection or double click
            if (window.mousemovedown || isDoubleClick) {
              console.log('onSelectSlot ', slotInfo);
              const { start, end } = slotInfo;
              const title = 'New Event';
              const id = Math.random();
              const newEvent = {
                id,
                start,
                end,
                title
              };
              this.setState({
                events: [...events, newEvent]
              });
              window.PopoverContent = <PopoverContentTemplate event={newEvent} calendarUpdate={this.calendarUpdate} />;
              document.getElementById(id).click();
            }
          }
        }
        />
      </div>
    )
  }
};

export default Selectable;
