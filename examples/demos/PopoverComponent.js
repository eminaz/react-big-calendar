import React from 'react';
import moment from 'moment';
import { Button, Select } from 'antd';
const Option = Select.Option;

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
    this.props.calendarUpdate();
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

window.PopoverText = <span><b>Event / Task</b></span>;

export default PopoverContentTemplate;
