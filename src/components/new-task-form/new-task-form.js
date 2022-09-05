import React, { useState } from "react"

const NewTaskForm = ({onAddTask}) => {
  const [label, setLabel] = useState("");
    const [min, setMin] = useState('');
    const [sec, setSec] = useState('')

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
        if (label==='') {
            onAddTask('task', min, sec)
        } else {
            onAddTask(label, min, sec)
        }
        setLabel('');
        setMin('');
        setSec('')
    }
  }

  const onInputChange = (e) => {
    setLabel(e.target.value)
  }

  const onTimeChange = (e) => {
      const { value, name } = e.target;

      if (value.trim() && +value <= 59 && +value >= 0 && !Number.isNaN(value)) {
          if (name === 'secValue') {
              setSec(value);
          }
          if (name === 'minValue') {
              setMin(value);
          }
      }
      if (!value.trim()) {
          setSec('');
          setMin('');
      }
  }

  return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onKeyPress={onSubmit}>
          <input
              type="text"
              className="new-todo"
              placeholder="what needs to be done"
              onChange={onInputChange}
              value={label}
          />
            <input className="new-todo-form__timer"
                   autoFocus
                   name='minValue'
                   placeholder="Min"
                   value={min}
                   onChange={onTimeChange}

            />
            <input className="new-todo-form__timer"
                   placeholder="Sec"
                   name='secValue'
                   onChange={onTimeChange}
                   value={sec}
            />
        </form>
      </header>
  )
}

export default NewTaskForm;