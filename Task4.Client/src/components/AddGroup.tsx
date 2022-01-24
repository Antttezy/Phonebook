import { MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { createGroup } from "../utils/groupFetcher";

export default function AddGroup() {
    const dispatch = useDispatch<AppDispatch>()
    const [name, setName] = useState('')

    function handleAddClick(e: MouseEvent<HTMLButtonElement>) {
        createGroup(name, dispatch).then(_ => setName(''));
    }

    return (
        <div className="input-group p-0 mb-4 p-0">
            <div className="input-group-prepend">
                <label className="input-group-text">Name</label>
            </div>
            <input value={name} onChange={(e) => setName(_ => e.target.value)} type="text" className="flex-fill me-1 rounded form-control" />
            <div className="input-group-prepend">
                <button onClick={handleAddClick} className="btn btn-primary me-1">Create</button>
            </div>
        </div>
    )
}
