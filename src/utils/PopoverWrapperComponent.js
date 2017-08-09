import React from 'react';
import { Popover } from 'antd';

class PopoverWrapper extends React.Component {
  constructor(p) {
    super(p);
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.pressedKeys = new Set();
  }
  onVisibleChange(isVisible) {
    console.log('popover visibility changes ', isVisible);
    if (isVisible) {
      window.addEventListener('keydown', this.keyDownHandler, false);
      window.addEventListener('keyup', this.keyUpHandler, false);
    }
    else {
      window.removeEventListener('keydown', this.keyDownHandler, false);
      window.removeEventListener('keyup', this.keyUpHandler, false);
    }
  }
  keyDownHandler(e) {
    if (e.which === 8) {
      window.removeTask && window.removeTask(this.props.event);
    }
    else if (e.which === 91 || e.which === 67) {
      this.pressedKeys.add(e.which);
    }
    if (this.pressedKeys.has(91) && this.pressedKeys.has(67)) {
      window.copiedEvent = this.props.event;
      //console.log('event copied ', window.copiedEvent);
    }
  }
  keyUpHandler(e) {
    if (e.which === 91 || e.which === 67) {
      this.pressedKeys.delete(e.which);
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
