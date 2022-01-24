import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ContactGroupDAO } from "../lib/ContactGroup";
import { createGroupsLoadingStatus, createSelectGroup } from "../redux/phonebook/actions";
import { AppDispatch, RootState } from "../redux/store";

function numberToGroup(i: number, groups: ContactGroupDAO[]): ContactGroupDAO | null {
    if (i === 0) {
        return null;
    }

    return groups.find(g => g.id === i)!;
}

export default function GroupSelector() {
    const state = useSelector((state: RootState) => state.phonebookReducer);
    const dispatch = useDispatch<AppDispatch>();

    if (!state.isGroupsLoaded) {
        return (
            <h1 className="text-end">LOADING</h1>
        )
    }

    function onChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
        const selected = Number.parseInt(e.target.value, 10);

        const group = numberToGroup(selected, state.groups);
        dispatch(createSelectGroup(group))
    }

    return (
        <div className="container-sm input-group mb-3 mt-1 p-0">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="contactGroupSelect">Group</label>
            </div>
            <select className="custom-select flex-fill" onChange={onChangeHandler} id="contactGroupSelect">
                <option value={0}>All</option>
                {state.groups.map(gr =>
                    <option key={gr.id} value={gr.id}>{gr.name}</option>)}
            </select>
            <div className="input-group-prepend">
                <Link to='/groups' className="btn btn-secondary input-group-text">Manage</Link>
            </div>
        </div>
    );
}
