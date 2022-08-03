import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  createTaskItem(label) {
    return {
      id: Math.floor(Math.random() * 1000000),
      label: label,
      active: true,
      edit: false,
    };
  }

  state = {
    taskData: [
      this.createTaskItem('completed task'),
      this.createTaskItem('editing task'),
      this.createTaskItem('active task'),
      this.createTaskItem('another active task'),
      this.createTaskItem('active task'),
    ],
    filter: 'all',
  };

  deleteTask = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)];

      return {
        taskData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, active: !oldItem.active };
      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
      return {
        taskData: newArr,
      };
    });
  };

  addTask = (text) => {
    const newItem = this.createTaskItem(text);

    this.setState(({ taskData }) => {
      const newArr = [...taskData, newItem];
      return {
        taskData: newArr,
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.filter((task) => {
        return task.active;
      });
      return {
        taskData: newArr,
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => item.active);
      case 'done':
        return items.filter((item) => !item.active);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onEdit = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };
      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
      return {
        taskData: newArr,
      };
    });
  };

  handleEditTask = (id, text) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, label: text, edit: false };
      const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
      return {
        taskData: newArr,
      };
    });
  };

  render() {
    const taskCount = this.state.taskData.filter((el) => el.active).length;
    const visibleTasks = this.filter(this.state.taskData, this.state.filter);
    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.addTask} />
        <section className="main">
          <TaskList
            taskData={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            handleEditTask={this.handleEditTask}
          />
          <Footer
            count={taskCount}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
