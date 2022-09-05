import React from "react"

const TasksFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: "all", label: "all" },
    { name: "active", label: "active" },
    { name: "done", label: "completed" },
  ]

  const buttonsAll = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const btnClass = isActive ? "selected" : ""
    return (
        <li key={name}>
          <button className={btnClass} mode={name} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
    )
  })
  return (
    <ul className="filters">{buttonsAll}</ul>
  )
}
export default TasksFilter
// export default class TasksFilter extends React.Component {
//   buttons = [
//     { name: "all", label: "all" },
//     { name: "active", label: "active" },
//     { name: "done", label: "completed" },
//   ]
//
//   render() {
//     const { filter, onFilterChange } = this.props
//     const buttons = this.buttons.map(({ name, label }) => {
//       const isActive = filter === name
//       const btnClass = isActive ? "selected" : ""
//       return (
//         <li key={name}>
//           <button className={btnClass} mode={name} onClick={() => onFilterChange(name)}>
//             {label}
//           </button>
//         </li>
//       )
//     })
//
//     return <ul className="filters">{buttons}</ul>
//   }
// }
//