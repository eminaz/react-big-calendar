import React from 'react';

class TimeGridWrapper extends React.Component {
  constructor(p) {
    super(p);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.pressedKeys = new Set();
  }
  componentDidMount() {
    window.addEventListener('click', this.clickHandler.bind(this), false);
    window.addEventListener('keydown', this.keyDownHandler, false);
    window.addEventListener('keyup', this.keyUpHandler, false);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler, false);
    window.removeEventListener('keyup', this.keyUpHandler, false);
  }
  clickHandler(e) {
    const selectedDate = e.target.parentNode.parentNode.classList[1];
    this.selectedDate = selectedDate && selectedDate.slice(1, 11);
  }
  keyDownHandler(e) {
    if (e.which === 91 || e.which === 86) {
      this.pressedKeys.add(e.which);
    }
    if (this.pressedKeys.has(91) && this.pressedKeys.has(86)) {
      window.pasteTask && window.pasteTask(this.selectedDate, window.copiedEvent);
    }
  }
  keyUpHandler(e) {
    if (e.which === 91 || e.which === 86) {
      this.pressedKeys.delete(e.which);
    }
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};

export default TimeGridWrapper;
