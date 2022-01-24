import { Dispatch } from "redux";
import { addGroup, ContactGroupDAO, fetchGroups } from "../lib/ContactGroup";
import { ErrorMessage } from "../lib/ErrorMessage";
import { Action, createAddGroup, createFetchGroups, createRemoveGroup, createSetError } from '../redux/phonebook/actions'
import { instanceOfValidationError, instanseOfErrorMessage } from "./typeCheckers";
import { removeGroup as remove } from "../lib/ContactGroup";

export async function loadGroups(dispatch: Dispatch<Action>): Promise<boolean> {
    const response = await fetchGroups();

    if (instanceOfValidationError(response)) {
        dispatch(createSetError(response.title));
        return false;
    }

    if (instanseOfErrorMessage(response)) {
        const err: ErrorMessage = response;
        dispatch(createSetError(response.description));
        return false;

    } else {
        const data: ContactGroupDAO[] = response;
        dispatch(createFetchGroups(data))
        return true;
    }
}

export async function createGroup(name: string, dispatch: Dispatch<Action>): Promise<boolean> {
    const response = await addGroup({ name });

    if (instanceOfValidationError(response)) {
        dispatch(createSetError(response.title));
        return false;
    }

    if (instanseOfErrorMessage(response)) {
        dispatch(createSetError(response.description));
        return false;
    }

    dispatch(createAddGroup(response))
    return true;
}

export async function removeGroup(id: number, dispatch: Dispatch<Action>): Promise<boolean> {
    const response = await remove(id);

    if (instanceOfValidationError(response)) {
        dispatch(createSetError(response.title));
        return false;
    }

    if (instanseOfErrorMessage(response)) {
        dispatch(createSetError(response.description));
        return false;
    }

    dispatch(createRemoveGroup(id));
    return true;
}
