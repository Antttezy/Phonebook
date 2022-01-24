import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { removeContact } from "../utils/contactFetcher";

export default function ContactList() {
    const state = useSelector((state: RootState) => state.phonebookReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [navigate, setNavigate] = useState<string>('')

    if (!state.isContactsLoaded) {
        return (
            <h1 className="text-center">LOADING...</h1>
        );
    }

    if (navigate.length > 0)
        return <Navigate to={navigate} />

    return (
        <div className="m-auto table-responsive-xl">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Group</th>
                        <th scope="col">Phone number</th>
                        <th scope="col">E-Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {state.contacts.map(cont =>
                        <tr key={cont.id}>
                            <td>{cont.name}</td>
                            <td>{cont.group?.name}</td>
                            <td>{cont.phoneNumber}</td>
                            <td>{cont.mail}</td>
                            <td className="d-flex justify-content-around">
                                <Link to={`/contact/edit/${cont.id}`} className="btn btn-warning">Edit</Link>
                                <button onClick={(e) => removeContact(dispatch, cont.id)} className="btn btn-danger">Remove</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}
