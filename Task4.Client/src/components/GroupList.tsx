import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroupsLoadingStatus } from "../redux/phonebook/actions";
import { AppDispatch, RootState } from "../redux/store";
import { removeGroup } from "../utils/groupFetcher";

export default function GroupList() {
    const state = useSelector((s: RootState) => s.phonebookReducer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(createGroupsLoadingStatus(false))
    }, [])

    function removeClick(id: number) {
        removeGroup(id, dispatch)
    }

    return (
        <div className="mb-2">
            <ul className="list-group">
                {state.groups.map(gr =>
                    <li key={gr.id} className="py-3 ps-2 pe-1 list-group-item">
                        <p className="m-0 d-flex align-items-center justify-content-between">{gr.name}<button onClick={(e) => removeClick(gr.id)} className="btn btn-danger">Remove</button></p>
                    </li>
                )}
            </ul>
        </div>
    )
}
