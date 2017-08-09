import React from 'react';
import { Popover } from 'antd';

class PopoverWrapper extends React.Component {
  constructor(p) {
    super(p);
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }
  onVisibleChange(isVisible) {
    console.log('popover visibility changes ', isVisible);
    if (isVisible) {
      window.addEventListener('keydown', this.keyDownHandler, false);
    }
    else {
      window.removeEventListener('keydown', this.keyDownHandler, false);
    }
  }
  keyDownHandler(e) {
    if (e.which === 8) {
      window.removeTask && window.removeTask(this.props.event);
    }
  }
  render() {
    return (
      <Popover title={PopoverText} content={PopoverContent}  trigger='click' placement="right"
        className='my-popover' onVisibleChange={this.onVisibleChange}>
        {this.props.children}
      </Popover>
    );
  }
};

export default PopoverWrapper;
