import { ContactGroup, ContactGroupDAO } from "../../../lib/ContactGroup";
import { PhonebookEntry } from "../../../lib/PhonebookEntry";

export enum ActionType {
    fetchGroups,
    addGroup,
    updateGroup,
    removeGroup,
    selectGroup,
    fetchContacts,
    addContact,
    updateContact,
    removeContact,
    setContactsLoaded,
    setGroupsLoaded,
    setError,
    disableError
}

export interface Action {
    type: ActionType
}

export interface PayloadAction<T> extends Action {
    payload: T
}

export function createFetchGroups(groups: ContactGroupDAO[]): PayloadAction<ContactGroupDAO[]> {
    return {
        type: ActionType.fetchGroups,
        payload: groups
    }
}

export function createAddGroup(group : ContactGroupDAO): PayloadAction<ContactGroupDAO> {
    return {
        type: ActionType.addGroup,
        payload: group
    }
}

export function createRemoveGroup(id: number): PayloadAction<number> {
    return {
        type: ActionType.removeGroup,
        payload: id
    }
}

export function createFetchContacts(groups: PhonebookEntry[]): PayloadAction<PhonebookEntry[]> {
    return {
        type: ActionType.fetchContacts,
        payload: groups
    }
}

export function createRemoveContact(id: number): PayloadAction<number> {
    return {
        type: ActionType.removeContact,
        payload: id
    }
}

export function createSelectGroup(group: ContactGroupDAO | null): PayloadAction<ContactGroupDAO | null> {
    return {
        type: ActionType.selectGroup,
        payload: group
    }
}

export function createGroupsLoadingStatus(isLoaded: boolean): PayloadAction<boolean> {
    return {
        type: ActionType.setGroupsLoaded,
        payload: isLoaded
    }
}

export function createContactsLoadingStatus(isLoaded: boolean): PayloadAction<boolean> {
    return {
        type: ActionType.setContactsLoaded,
        payload: isLoaded
    }
}

export function createUpdateContact(contact: PhonebookEntry): PayloadAction<PhonebookEntry> {
    return {
        type: ActionType.updateContact,
        payload: contact
    }
}

export function createAddContact(contact: PhonebookEntry): PayloadAction<PhonebookEntry> {
    return {
        type: ActionType.addContact,
        payload: contact
    }
}

export function createSetError(description: string): PayloadAction<string> {
    return {
        type: ActionType.setError,
        payload: description
    }
}

export function createDisableError(): Action {
    return {
        type: ActionType.disableError
    }
}
