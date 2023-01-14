import React, {useEffect} from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";
import {useAppDispatch, useAppSelector} from "../utils/hooks/hooks";
import {initializeAppTC} from "../bll/reducers/app-reducer";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import CircularProgress from "@mui/material/CircularProgress";


const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div className="circularProgress">
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <Header/>
            <Main/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
