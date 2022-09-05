import React from "react"

import TasksFilter from "../tasks-filter"

const Footer = ({ count, filter, onFilterChange, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        clear completed
      </button>
    </footer>
  )
}

export default Footer
