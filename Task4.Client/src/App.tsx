import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'
import Groups from './pages/Groups'
import { AppDispatch, RootState } from "./redux/store";
import { loadGroups } from './utils/groupFetcher'
import { loadContacts } from './utils/contactFetcher'
import ErrorNotification from './components/ErrorNotification'

export default function App() {
    const state = useSelector((s: RootState) => s.phonebookReducer)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (state.isGroupsLoaded)
            return;

        loadGroups(dispatch);
    },
        [state.isGroupsLoaded])

    useEffect(() => {
        loadContacts(dispatch, state.selectedGroup);
    },
        [state.selectedGroup])

    console.log(state)

    return (
        <>
            <ErrorNotification />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/contact/edit/:id' element={<EditContact />} />
                    <Route path='/contact/add' element={<AddContact />} />
                    <Route path='/groups' element={<Groups />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
