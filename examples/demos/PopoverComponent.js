import React from 'react';
import moment from 'moment';
import { Button, Select } from 'antd';
const Option = Select.Option;

const typeData = ['Task', 'Event'];
const categoryData = {
  Task: ['Weight Measurement', 'Heart Rate Measurement', 'Take Medicine', 'Other'],
  Event: ['Conference Call', 'Appointment', 'Other'],
};

const PopoverContentTemplate = class extends React.Component {
  constructor(p) {
    super(p);
    const initialType = this.props.event.type || typeData[0];
    const initialCategory = this.props.event.category || categoryData[initialType][0];
    this.state = {
      categories: categoryData[initialType],
      selectedCategory: initialCategory
    }
    this.props.event.type = initialType;
    this.props.event.category = initialCategory;

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }
  onChangeType(value) {
    this.setState({
      categories: categoryData[value],
      selectedCategory: categoryData[value][0],
    });
    this.props.event.type = value;
    this.props.event.category = categoryData[value][0];
    this.props.calendarUpdate();
  }
  onChangeCategory(value) {
    this.setState({
      selectedCategory: value,
    });
    this.props.event.category = value;
    this.props.calendarUpdate();
  }
  onChangeTitle(e) {
    this.props.event.title = e.target.value;
    this.props.calendarUpdate();
  }
  render() {
    const typeOptions = typeData.map(type => <Option key={type}>{type}</Option>);
    const categoryOptions = this.state.categories.map(category => <Option key={category}>{category}</Option>);

    const { event } = this.props;
    const { start, end } = event;
    //console.log('inside popover ', start, end);
    return (
      <div className='new-event-popover-container'>
        <input className='new-event-popover-input' type='text' defaultValue={event.title === 'New Event' ? '' : event.title}
          placeholder='New Event' onChange={this.onChangeTitle} key={Math.random()} />

        <div>
          <Select defaultValue={typeData[0]} style={{ width: 90 }} onChange={this.onChangeType}
            getPopupContainer={triggerNode => triggerNode.parentNode} className='new-event-popover-select-1' >
            {typeOptions}
          </Select>
          <Select value={this.state.selectedCategory} style={{ width: 90 }} onChange={this.onChangeCategory}
            getPopupContainer={triggerNode => triggerNode.parentNode} className='new-event-popover-select-2' >
            {categoryOptions}
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
