import React, { Component } from "react";

export default class Task extends Component {
  state = {
    label: this.props.label,
    timerSet: false,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
  };

  onEditChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onEditSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.label);
    this.props.handleEditTask(this.props.id, this.state.label);
  };

  startTimer = (e) => {
    e.preventDefault();
    this.setState({
      timerSet: true,
    });
    this.timerInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds === 59) {
        this.setState(({ minutes, seconds }) => ({
          minutes: minutes + 1,
          seconds: 0,
        }));
      }
      if (seconds < 59) {
        this.setState(({ seconds }) => ({
          seconds: seconds + 1,
        }));
      }
    }, 1000);
  };

  getPadTime(time) {
    if (time < 10) {
      return `0${time}`;
    } else return time;
  }

  setPause = (e) => {
    e.stopPropagation();
    this.setState({ timerSet: false });
    clearInterval(this.timerInterval);
  };
  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    let { onDeleted, active, onToggleDone, edit, onEdit, timeCreated } = this.props;
    let { label, minutes, seconds } = this.state;
    let taskClassNames = "";
    if (!active) {
      taskClassNames += " completed";
    }

    if (!edit) {
      return (
        <li className={taskClassNames}>
          <div className="view">
            <input type="checkbox" className="toggle" onClick={onToggleDone} />
            <label>
              <span className="description">{label}</span>
              <span className="description">
                <button className="icon icon-play" onClick={this.startTimer}></button>
                <button className="icon icon-pause" onClick={this.setPause}></button>
                <span className="minutes">{this.getPadTime(minutes)}</span>
                <span className="seconds">:</span>
                <span className="seconds">{this.getPadTime(seconds)}</span>
              </span>
              <span className="created">{timeCreated}</span>
            </label>
            <button className="icon icon-edit" onClick={onEdit}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
        </li>
      );
    } else {
      return (
        <form onSubmit={this.onEditSubmit}>
          <input type="text" className="edit" value={label} onChange={this.onEditChange} />
        </form>
      );
    }
  }
}
