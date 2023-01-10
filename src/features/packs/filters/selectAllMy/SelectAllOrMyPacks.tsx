import React, {useEffect, useState} from 'react';
import {
    getPacksTC,
    setIsMyPacksAC, setPageAC, setRerenderAC, setSearchInputPacksAC,
    setSortMinMaxCardsAC,
    SortPacksAllMyType
} from "../../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {SelectButton} from "./selectButton/SelectButton";


export const SelectAllOrMyPacks = () => {
    const dispatch = useAppDispatch()
    const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const [styleButton, setStyleButton] = useState<SortPacksAllMyType>(sortByAllMy)

    useEffect(()=>{
        setStyleButton(sortByAllMy)
    }, [sortByAllMy])

    const changeValueMyOrAllPacksHandler = (value: SortPacksAllMyType) => {
        dispatch(setIsMyPacksAC(value))
        dispatch(setSearchInputPacksAC(''))
        dispatch(setPageAC(1))
        dispatch(setRerenderAC(false))
        dispatch(getPacksTC(true))
        // dispatch(setSortMinMaxCardsAC(0, maxCardsCount))
        setStyleButton(value)
    }

    return (
        <div>
            <SelectButton nameBtn={"My"} callBack={()=>changeValueMyOrAllPacksHandler("My")} classNameBtn={styleButton}/>
            <SelectButton nameBtn={"All"} callBack={()=>changeValueMyOrAllPacksHandler("All")} classNameBtn={styleButton}/>
        </div>
    );
};
