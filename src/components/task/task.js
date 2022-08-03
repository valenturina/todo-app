import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    label: this.props.label,
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

  render() {
    let { onDeleted, active, onToggleDone, edit, onEdit } = this.props;
    let { label } = this.state;
    let taskClassNames = '';
    if (!active) {
      taskClassNames += ' completed';
    }

    const creationDate = () => {
      let date = formatDistanceToNow(new Date());
      return date;
    };

    if (!edit) {
      return (
        <li className={taskClassNames}>
          <div className="view">
            <input type="checkbox" className="toggle" onClick={onToggleDone} />
            <label>
              <span className="description">{label}</span>
              <span className="created">created {creationDate()} ago</span>
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
