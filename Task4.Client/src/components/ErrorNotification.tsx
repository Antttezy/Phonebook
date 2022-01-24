import { useDispatch, useSelector } from "react-redux";
import { createDisableError } from "../redux/phonebook/actions";
import { AppDispatch, RootState } from "../redux/store";

export default function ErrorNotification() {
    const state = useSelector((s: RootState) => s.phonebookReducer)
    const dispatch = useDispatch<AppDispatch>()

    return (
        state.isError ? <div className="m-2 w-25 d-flex align-items-center alert alert-danger fixed-top fixed-right alert-dismissible fade show" role='alert'>
            <strong className="me-1">An error eccured!</strong>{state.errorText}
            <button onClick={_ => dispatch(createDisableError())} type="button" data-dismiss="alert" aria-label="Close" className="btn btn-outline-danger close ms-1"><span data-dismiss="alert" >&times;</span></button>
        </div> : <></>
    )
}
