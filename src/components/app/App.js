import React, { Component, useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"

import NewTaskForm from "../new-task-form"
import TaskList from "../task-list"
import Footer from "../footer"

const App = () => {
    function createTaskItem(label, min, sec) {
        return {
            id: Math.floor(Math.random() * 1000000),
            label: label,
            active: true,
            edit: false,
            minutes: min || 2,
            seconds: sec || 30,
            timeCreated: `created ${formatDistanceToNow(new Date(), { addSuffix: true })}`,
        }
    }

    function filterData(items, filter) {
        switch (filter) {
            case "all":
                return items
            case "active":
                return items.filter((item) => item.active)
            case "done":
                return items.filter((item) => !item.active)
            default:
                return items
        }
    }

    const [taskData, setTaskData] = useState([
        createTaskItem("completed task"),
        createTaskItem("editing task"),
    ])
    const [filter, setFilter] = useState('all')

    const deleteTask = (id) => {
        const idx = taskData.findIndex((el) => el.id === id)
        const newArr = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
        setTaskData(newArr)
    }

    const onToggleDone = (id) => {
        const idx = taskData.findIndex((el) => el.id === id)
        const oldItem = taskData[idx]
        const newItem = { ...oldItem, active: !oldItem.active }
        const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
        setTaskData(newArr)
    }

    const addTask = (text, min, sec) => {
        const newItem = createTaskItem(text, min, sec)
        const newArr = [...taskData, newItem]
        setTaskData(newArr)
    }

    const onClearCompleted = () => {
        const newArr = taskData.filter((task) => {
            return task.active
        })
        setTaskData(newArr)
    }

    const onEdit = (id) => {
        const idx = taskData.findIndex((el) => el.id === id)
        const oldItem = taskData[idx]
        const newItem = { ...oldItem, edit: !oldItem.edit }
        const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
        setTaskData(newArr)
    }

    const handleEditTask = (id, text) => {
        const idx = taskData.findIndex((el) => el.id === id)
        const oldItem = taskData[idx]
        const newItem = { ...oldItem, label: text, edit: false }
        const newArr = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

        setTaskData(newArr)
    }

    const onFilterChange = (filter) => {
        setFilter(filter)
    }


    const taskCount = taskData.filter((el) => el.active).length
    const visibleTasks = filterData(taskData, filter)

    return (
        <section className="todoapp">
            <NewTaskForm onAddTask={addTask} />
            <section className="main">
                <TaskList
                    taskData={visibleTasks}
                    onDeleted={deleteTask}
                    onToggleDone={onToggleDone}
                    onEdit={onEdit}
                    handleEditTask={handleEditTask}
                />
                <Footer
                    count={taskCount}
                    filter={filter}
                    onFilterChange={onFilterChange}
                    onClearCompleted={onClearCompleted}
                />
            </section>
        </section>
    )
}

export default App