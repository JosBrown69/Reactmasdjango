import { useEffect, useState } from 'react';
import { getTask } from '../api/Task.api';
import {Taskcard} from './Taskcard'

export function TaskList() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function loadTasks() {
            const res = await getTask();
            setTasks(res.data);
        }
        loadTasks();
    }, []);

    return (
        <div className='grid grid-cols-3 gap-3'>
            {tasks.map(task => (
                <Taskcard key={task.id} task={task}/>
            ))}
        </div>
    );
}
