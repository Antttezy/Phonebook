import { ContactGroupDAO } from "../../lib/ContactGroup"
import { PhonebookEntry } from "../../lib/PhonebookEntry"
import { Action, ActionType, PayloadAction } from "./actions"

export type PhonebookState = {
    isGroupsLoaded: boolean,
    groups: ContactGroupDAO[],
    selectedGroup: ContactGroupDAO | null,
    isContactsLoaded: boolean,
    contacts: PhonebookEntry[],
    isError: boolean,
    errorText: string
}

const defaultState: PhonebookState = {
    isGroupsLoaded: false,
    groups: [],
    selectedGroup: null,
    isContactsLoaded: false,
    contacts: [],
    isError: false,
    errorText: ''
}

export function phonebookReducer(state: PhonebookState = defaultState, action: Action): PhonebookState {
    switch (action.type) {
        case ActionType.fetchGroups: {
            const a = action as PayloadAction<ContactGroupDAO[]>

            return {
                ...state,
                isGroupsLoaded: true,
                groups: [...a.payload]
            }
        }

        case ActionType.addGroup: {
            const a = action as PayloadAction<ContactGroupDAO>
            return {
                ...state,
                groups: [...state.groups, a.payload]
            }
        }

        case ActionType.removeGroup: {
            const a = action as PayloadAction<number>
            return {
                ...state,
                groups: state.groups.filter(gr => gr.id !== a.payload)
            }
        }

        case ActionType.fetchContacts: {
            const a = action as PayloadAction<PhonebookEntry[]>
            return {
                ...state,
                isContactsLoaded: true,
                contacts: [...a.payload]
            }
        }

        case ActionType.addContact: {
            const a = action as PayloadAction<PhonebookEntry>
            return {
                ...state,
                contacts: [...state.contacts, a.payload]
            }
        }

        case ActionType.updateContact: {
            const a = action as PayloadAction<PhonebookEntry>
            return {
                ...state,
                contacts: state.contacts.map(contact => {

                    if (contact.id !== a.payload.id) {
                        return contact
                    } else {
                        return a.payload
                    }
                })
            }
        }

        case ActionType.removeContact: {
            const a = action as PayloadAction<number>
            return {
                ...state,
                contacts: state.contacts.filter(c => c.id !== a.payload)
            }
        }

        case ActionType.selectGroup: {
            const a = action as PayloadAction<ContactGroupDAO | null>
            return {
                ...state,
                selectedGroup: a.payload
            }
        }

        case ActionType.setGroupsLoaded: {
            const a = action as PayloadAction<boolean>
            return {
                ...state,
                isGroupsLoaded: a.payload
            }
        }

        case ActionType.setContactsLoaded: {
            const a = action as PayloadAction<boolean>
            return {
                ...state,
                isContactsLoaded: a.payload
            }
        }

        case ActionType.setError: {
            const a = action as PayloadAction<string>
            return {
                ...state,
                isError: true,
               errorText: a.payload 
            }
        }

        case ActionType.disableError: {
            return {
                ...state,
                isError: false
            }
        }

        default:
            return state
    }
}
