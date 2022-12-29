import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import style from "../modals/addPackModal/AddPackModal.module.css";
import Button from "@mui/material/Button";
import {setDeckCoverAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {baseDeckCover} from "../../../assets/baseDeckCover";

type CoverInputType={
    deckCover:string
}

export const CoverInput:FC<CoverInputType> = ({deckCover}) => {
    const dispatch =useAppDispatch()
    const myDeckCover=useAppSelector(state=>state.packList.myDeckCover)
    const [isCoverBroken, setIsCoverBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 100000) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const file64 = reader.result as string
                    dispatch(setDeckCoverAC( file64))
                }
                reader.readAsDataURL(file)
            } else {
                alert('Файл слишком большого размера')
            }
        }
    }
    const errorHandler = () => {
        setIsCoverBroken(true)
        alert('Кривая картинка')
    }

    useEffect(()=>{
        if(deckCover){
            dispatch(setDeckCoverAC(deckCover))
        }
    },[])

    return (
        <div className={style.coverBlock}>
            <div className={style.coverHeader}>
                <div>Cover</div>
                <div> <label>
                    <input type="file"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <Button variant="contained" component="span">
                        Upload button
                    </Button>
                </label> </div>
            </div>
            <div className={style.coverImage}>
                <img onError={errorHandler} src={ isCoverBroken ? baseDeckCover : myDeckCover} alt="cover"/>
            </div>
        </div>
    );
};

