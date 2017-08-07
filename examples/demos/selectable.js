import React from 'react';
// import BigCalendar from 'react-big-calendar';

import BigCalendar from '../../src';
import moment from 'moment';


import events from '../events';
import { Popover, Button, Select } from 'antd';
const Option = Select.Option;
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
    }
  }
  componentDidMount() {
    this.convertTasks();
    window.removeTask = (event) => {
      const { start, end, title, id } = event;
      let events = _.cloneDeep(this.state.events);
      events = events.filter( (e) => e.id !== event.id);
      console.log('window.removeTask ', start, end, title, id, events.length);
      this.setState({ events });
    };
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
              // const changeTitle = (title) => {
              //   event.title = title;
              //   this.forceUpdate();
              // };
              window.PopoverContent = <PopoverContentTemplate event={event} forceUpdate={this.forceUpdate} />;
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
                id: Math.random(),
                start,
                end,
                title
              };
              this.setState({
                events: [...events, newEvent]
              });
              // const changeTitle = (title) => {
              //   newEvent.title = title;
              //   this.forceUpdate();
              // };
              const changeEvent = () => {
                this.forceUpdate();
              }
              window.PopoverContent = <PopoverContentTemplate event={newEvent} changeEvent={changeEvent} />;
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

const provinceData = ['Task', 'Event'];
const cityData = {
  Task: ['Weight Measurement', 'Take Medicine', 'Other'],
  Event: ['Conference Call', 'Appointment', 'Other'],
};
const PopoverContentTemplate = class extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0]
    }
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.onSecondCityChange = this.onSecondCityChange.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }
  handleProvinceChange(value, e) {
    console.log(value, e);
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }
  onSecondCityChange(value) {
    this.setState({
      secondCity: value,
    });
  }
  onChangeTitle(e) {
    this.props.event.title = e.target.value;
    this.props.forceUpdate();
  }
  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);

    const { event } = this.props;
    const { start, end } = event;
    //console.log('inside popover ', start, end);
    return (
      <div className='new-event-popover-container'>
        <input className='new-event-popover-input' type='text' defaultValue={event.title === 'New Event' ? '' : event.title}
          placeholder='New Event' onChange={this.onChangeTitle} key={Math.random()} />

        <div>
          <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}
            getPopupContainer={triggerNode => triggerNode.parentNode} className='new-event-popover-select-1' >
            {provinceOptions}
          </Select>
          <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}
            getPopupContainer={triggerNode => triggerNode.parentNode} className='new-event-popover-select-2' >
            {cityOptions}
          </Select>
        </div>

        <p><b className='new-event-popover-when'>When</b></p>
        <p>{`${moment(start).format('ddd, MMMM DD, hh:mm a')} - ${moment(end).format('hh mm a')}`}</p>
        <div className='new-event-popover-buttons'>
          <Button className='new-event-popover-button'>Edit</Button>
          {
            //<Button className='new-event-popover-button'>Create</Button>
          }
        </div>
      </div>
    );
  }
};

// const WrapperComponent = (props) => {
//   return <div style={{backgroundColor: 'red'}}>
//     wrapper
//     {props.children}
//   </div>
// }

export default Selectable;
