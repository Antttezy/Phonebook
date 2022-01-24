import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { createGroupsLoadingStatus, createSelectGroup } from "../redux/phonebook/actions";
import { AppDispatch, RootState } from "../redux/store";
import { updateContact } from "../utils/contactFetcher";


export default function EditContact() {
    const { id } = useParams()
    const contId = Number.parseInt(id!)!;

    const state = useSelector((s: RootState) => s.phonebookReducer)
    const dispatch = useDispatch<AppDispatch>()

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [mail, setMail] = useState('')
    const [groupId, setGroupId] = useState<number>(0)

    const [navigate, setNavigate] = useState('')

    if (isNaN(contId))
        return <></>

    const contact = state.contacts.find(c => c.id === contId)

    useEffect(() => {
        dispatch(createGroupsLoadingStatus(false))
    }, [])

    useEffect(() => {
        if (contact instanceof Object) {
            setName(_ => contact.name);
            setPhone(_ => contact.phoneNumber);
            setMail(_ => contact.mail);
            setGroupId(_ => contact.groupId ?? 0);

            return;
        }

        dispatch(createSelectGroup(null))

    }, [contact])

    function confirmEdit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()

        updateContact({
            id: contId,
            name,
            phoneNumber: phone,
            mail,
            groupId: groupId !== 0 ? groupId : null
        }, dispatch).then(b => b && setNavigate('/'));
    }


    if (navigate.length !== 0) {
        return <Navigate to={navigate} />
    }

    if (!(contact instanceof Object))
        return (
            <div className="alert alert-danger m-5">
                <h1 className="text-xxl-center">Entry not found in phonebook</h1>
            </div>
        )

    return (
        <div className="p-5 m-5 rounded shadow">
            <form>
                <div className="mb-3">
                    <label className="form-label" htmlFor="nameField">Name</label>
                    <input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(_ => e.target.value)} className="form-control" type="text" id="nameField" aria-labelledby="nameDescription" required />
                    <div className="form-text" id="nameDescription">Name of person added to phonebook</div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="phoneField">Phone</label>
                    <input value={phone} onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(_ => e.target.value)} className="form-control" type="tel" id="phoneField" aria-labelledby="phoneDescription" required />
                    <div className="form-text" id="phoneDescription">Phone number of person added to phonebook</div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="mailField">E-Mail (Optional)</label>
                    <input value={mail} onChange={(e: ChangeEvent<HTMLInputElement>) => setMail(_ => e.target.value)} className="form-control" type="email" id="mailField" aria-labelledby="mailDescription" />
                    <div className="form-text" id="mailDescription">An E-Mail of person added to phonebook</div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="groupField">Group (Optional)</label>
                    <select value={groupId} onChange={(e: ChangeEvent<HTMLSelectElement>) => setGroupId(_ => Number.parseInt(e.target.value))} className="form-control" id="groupField" aria-labelledby="groupDescription">
                        <option value={0}>No Group</option>
                        {state.groups.map(gr => <option key={gr.id} value={gr.id}>{gr.name}</option>)}
                    </select>
                    <div className="form-text" id="groupDescription">Group of person added to phonebook</div>
                </div>
                <button onClick={confirmEdit} className="btn btn-primary">Submit</button>
                <button type="button" onClick={(e) => setNavigate('/')} className="btn btn-danger ms-1">Cancel</button>
            </form>
        </div>
    )
}
