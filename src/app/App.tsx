import React, {useEffect} from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";
import {useAppDispatch, useAppSelector} from "../utils/hooks/hooks";
import {initializeAppTC} from "../bll/reducers/app-reducer";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import {AppStatus} from "../common/types/types";

const App = () => {
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const loadingStatus = useAppSelector((state) => state.app.status)
    const dispatch = useAppDispatch()

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
            <ErrorSnackbar/>
            <Header/>
            {loadingStatus === AppStatus.LOADING && <LinearProgress/>}
            <Main/>
        </div>
    );
}

export default App;
