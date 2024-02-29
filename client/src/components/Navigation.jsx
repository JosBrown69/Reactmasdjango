import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <div className='flex justify-between py-3'>
            <Link to={'/tasks'}>
                <h1 className='font-bold mb-4 text-3xl'>Task App</h1>
            </Link>
            <button className='bg-indigo-500 px-3 py-2 hover:bg-indigo-400 rounded-lg'>
                <Link to={'/tasks-create'}>Create task</Link>
            </button>
        </div>
    );
}
