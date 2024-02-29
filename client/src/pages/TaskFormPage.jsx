import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    createTask,
    deleteTask,
    updateTask,
    getOneTask,
} from '../api/Task.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TaskFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateTask(params.id, data);
            toast.success('Tarea actualizada', {
                position: 'bottom-right',
                style: {
                    backgroundColor: 'gold',
                    color: 'green',
                },
            });
        } else {
            await createTask(data);
            toast.success('Tarea creada', {
                position: 'bottom-right',
                style: {
                    backgroundColor: 'gold',
                    color: 'green',
                },
            });
        }
        navigate('/tasks');
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const {
                    data: { title, description },
                } = await getOneTask(params.id);
                setValue('title', title);
                setValue('description', description);
            }
        }
        loadTask();
    }),
        [];

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='title'
                    {...register('title', { required: true })}
                    className='bg-zinc-500 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>this field is required</span>}
                <textarea
                    rows='3'
                    placeholder='Description'
                    {...register('description', { required: true })}
                    className='bg-zinc-500 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>this field is required</span>}
                <button className='bg-indigo-500 rounded-lg p-3 mt-3 block w-full'>
                    Save
                </button>
            </form>
            {params.id && (
                <div className='flex justify-end'>
                    <button
                        className='bg-red-500 rounded-lg p-3 w-48 mt-3'
                        onClick={async () => {
                            const accepted = window.confirm('are you sure?');
                            if (accepted) {
                                await deleteTask(params.id);
                                toast.success('Tarea creada', {
                                    position: 'bottom-right',
                                    style: {
                                        backgroundColor: 'gold',
                                        color: 'green',
                                    },
                                });
                                navigate('/tasks');
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
