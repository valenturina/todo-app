import React, {useState, useEffect} from 'react';

const Task = ({label, minutes, seconds, onDeleted, onToggleDone, active, edit, onEdit, timeCreated, handleEditTask, id}) => {

    function getPadTime(time) {
        if (time < 10) {
            return `0${time}`
        } else return time
    }
    const [taskLabel, setLabel] = useState(label);
    const [timeLeft, setTimeLeft] = useState(Number(minutes) * 60 + Number(seconds));
    const [onTimer, setOnTimer]= useState(false);
    const min = getPadTime(Math.floor(timeLeft / 60));
    const sec = getPadTime(timeLeft - min*60);

    const onEditChange = (e) => {
        setLabel(e.target.value)
    }

    const onEditSubmit = (e)=> {
        e.preventDefault();
        handleEditTask(id, taskLabel)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            onTimer &&
            setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [onTimer])


    let taskClassNames = '';
    if (!active) taskClassNames += " completed";

     if (!edit) {
        return(
            <li className={taskClassNames}>
                <div className="view">
                    <input className="toggle" type="checkbox" onClick={onToggleDone}/>
                    <label>
                        <span className="title">{taskLabel}</span>
                        <span className="description">
                  <button className="icon icon-play" onClick={() => setOnTimer(true)}></button>
                  <button className="icon icon-pause" onClick={() => setOnTimer(false)}></button>
                  <span className="minutes">{min}</span>
                  <span className="seconds">:</span>
                  <span className="seconds">{sec}</span>
              </span>
                        <span className="created">{timeCreated}</span>
                    </label>
                    <button className="icon icon-edit" onClick={onEdit}></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
            </li>
        )
    } else {
        return (
            <form onSubmit={onEditSubmit}>
                <input type="text" className="edit" value={label} onChange={onEditChange} />
            </form>
        )
    }

}

export default Task