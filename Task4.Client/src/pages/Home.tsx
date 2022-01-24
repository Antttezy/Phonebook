import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import ContactList from '../components/ContactList'
import GroupSelector from '../components/GroupSelector'


export default function Home() {
    return (
        <div>
            <GroupSelector />
            <ContactList />
            <div className='text-center'>
                <Link to='/contact/add' className='btn btn-primary'>Add new phonebook entry</Link>
            </div>
        </div>
    )
}
