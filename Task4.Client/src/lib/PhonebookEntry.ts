import axios, { AxiosResponse } from "axios";
import { ContactGroup } from "./ContactGroup";
import { ErrorMessage } from "./ErrorMessage";

export interface PhonebookEntry {
    id: number,
    name: string,
    phoneNumber: string,
    mail: string,
    groupId: number | null,
    group: ContactGroup | null
}

const url = process.env.REACT_APP_APP_URL!

export async function fetchAllEntries(): Promise<PhonebookEntry[] | ErrorMessage> {
    const response: AxiosResponse<PhonebookEntry[] | ErrorMessage> = await axios.get(`${url}/contacts`).catch(reason => reason.response);
    return response.data
}

export async function removeEntry(id: number): Promise<void | ErrorMessage> {
    const response: AxiosResponse<void | ErrorMessage> = await axios.delete(`${url}/contacts/${id}`).catch(reason => reason.response);
    return response.data;
}

export async function updateEntry(id: number, data: {
    name: string,
    phoneNumber: string,
    mail: string,
    groupId: number | null
}): Promise<PhonebookEntry | ErrorMessage> {

    const response: AxiosResponse<PhonebookEntry | ErrorMessage> = await axios.put(`${url}/contacts/${id}`, data).catch(reason => reason.response);
    return response.data;
}

export async function addEntry(entry: {
    name: string,
    phoneNumber: string,
    mail: string,
    groupId: number | null
}): Promise<PhonebookEntry | ErrorMessage> {
    
    const response: AxiosResponse<PhonebookEntry | ErrorMessage> = await axios.post(`${url}/contacts/add`, entry).catch(reason => reason.response);
    return response.data;
}
