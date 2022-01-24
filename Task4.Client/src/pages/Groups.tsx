import GroupList from '../components/GroupList'
import AddGroup from '../components/AddGroup'
import { Link } from 'react-router-dom';


export default function Groups() {
    return (
        <div className="w-25 container-sm mt-5 p-0">
            <AddGroup />
            <GroupList />
            <div className='text-end'><Link to='/' className='btn btn-lg btn-secondary me-1'>Back</Link></div>
        </div>
    );
}
