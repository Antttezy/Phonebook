import { PhonebookEntry } from "./PhonebookEntry";
import { ErrorMessage } from './ErrorMessage'
import axios, { AxiosResponse } from "axios";

export interface ContactGroup {
    id: number,
    name: string,
    contacts: PhonebookEntry[]
}

export interface ContactGroupDAO {
    id: number,
    name: string
}

const url = process.env.REACT_APP_APP_URL!

export async function fetchGroups(): Promise<ContactGroupDAO[] | ErrorMessage> {
    const response: AxiosResponse<ContactGroupDAO[] | ErrorMessage> = await axios.get(`${url}/groups`).catch(reason => reason.response);
    return response.data
}

export async function fetchGroup(id: number): Promise<ContactGroup | ErrorMessage> {
    const response: AxiosResponse<ContactGroup | ErrorMessage> = await axios.get(`${url}/groups/${id}`).catch(reason => reason.response);
    return response.data
}

export async function addGroup(data: { name: string }): Promise<ContactGroupDAO | ErrorMessage> {
    const response: AxiosResponse<ContactGroupDAO | ErrorMessage> = await axios.post(`${url}/groups/add`, data).catch(reason => reason.response);
    return response.data
}

export async function removeGroup(id: number): Promise<void | ErrorMessage> {
    const response: AxiosResponse<void | ErrorMessage> = await axios.delete(`${url}/groups/${id}`).catch(reason => reason.response);
    return response.data;
}
