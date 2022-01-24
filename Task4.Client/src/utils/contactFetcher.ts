import { Dispatch } from "redux";
import { ContactGroupDAO, fetchGroup } from "../lib/ContactGroup";
import { ErrorMessage } from "../lib/ErrorMessage";
import { addEntry, fetchAllEntries, PhonebookEntry, removeEntry, updateEntry } from "../lib/PhonebookEntry";
import { Action, createAddContact, createContactsLoadingStatus, createFetchContacts, createRemoveContact, createSetError, createUpdateContact } from "../redux/phonebook/actions";
import { instanceOfValidationError, instanseOfErrorMessage } from "./typeCheckers";


async function getContacts(selectedGroup: ContactGroupDAO | null): Promise<PhonebookEntry[] | ErrorMessage> {
    if (selectedGroup !== null) {
        const response = await fetchGroup(selectedGroup.id);

        if (instanseOfErrorMessage(response)) {
            return response;

        } else {
            return response.contacts;
        }

    } else {
        return await fetchAllEntries();
    }
}

export async function loadContacts(dispatch: Dispatch<Action>, selectedGroup: ContactGroupDAO | null): Promise<boolean> {
    dispatch(createContactsLoadingStatus(false))
    let data = await getContacts(selectedGroup);

    if (instanceOfValidationError(data)) {
        dispatch(createSetError(data.title));
        return false;
    }

    if (instanseOfErrorMessage(data)) {
        dispatch(createSetError(data.description));
        return false;
    }

    if (selectedGroup !== null) {
        data = data.map((e: PhonebookEntry) => {
            return {
                ...e,
                group: {
                    id: selectedGroup.id,
                    name: selectedGroup.name,
                    contacts: []
                }
            }
        })
    }

    dispatch(createFetchContacts(data));
    return true;
}

export async function removeContact(dispatch: Dispatch<Action>, id: number): Promise<boolean> {
    const response = await removeEntry(id)

    if (instanceOfValidationError(response)) {
        dispatch(createSetError(response.title));
    }

    if (instanseOfErrorMessage(response)) {
        dispatch(createSetError(response.description));
    }

    dispatch(createRemoveContact(id))
    return true;
}

export async function updateContact(data: {
    id: number,
    name: string,
    phoneNumber: string,
    mail: string,
    groupId: number | null
}, dispatch: Dispatch<Action>): Promise<boolean> {

    const response = await updateEntry(data.id, data)

    if (instanceOfValidationError(response)) {
        dispatch(createSetError(response.title));
        return false;
    }

    if (instanseOfErrorMessage(response)) {
        dispatch(createSetError(response.description));
        return false;
    }

    dispatch(createUpdateContact(response));
    return true;
}

export async function addContact(entry: {
    name: string,
    phoneNumber: string,
    mail: string,
    groupId: number | null
}, dispatch: Dispatch<Action>): Promise<boolean> {

    const response = await addEntry(entry)

    if (instanceOfValidationError(response)) {
        dispatch(createSetError(response.title));
        return false;
    }

    if (instanseOfErrorMessage(response)) {
        dispatch(createSetError(response.description));
        return false;
    }

    dispatch(createAddContact(response));
    return true;
}
