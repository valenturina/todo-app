import React from "react";

export default class NewTaskForm extends React.Component {
  state = {
    label: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddTask(this.state.label);
    this.setState({
      label: "",
    });
  };
  onInputChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="what needs to be done"
            onChange={this.onInputChange}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}
