import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import style from "../modals/addPackModal/AddPackModal.module.css";
import {setDeckCoverAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import cameraLogo from "../../../assets/img/icons/camera-svgrepo-com.svg"
import {baseDeckCover} from "../../../assets/baseDeckCover";
import {convertFileToBase64} from "../../../utils/convertFileToBase64/convertFileToBase64";
import {setAppErrorAC} from "../../../bll/reducers/app-reducer";


type CoverInputType = {
    deckCover: string
}

export const CoverInput: FC<CoverInputType> = ({deckCover}) => {
    const dispatch = useAppDispatch()
    const myDeckCover = useAppSelector(state => state.packs.coverImg)

    const [isCoverBroken, setIsCoverBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.files
        if (value && value.length) {
            const file = value[0]

            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    dispatch(setDeckCoverAC(file64))
                })
            } else {
                dispatch(setAppErrorAC('Файл слишком большого размера'))
            }
        }
    }

    const errorHandler = () => {
        setIsCoverBroken(true)
        dispatch(setAppErrorAC('Broken picture'))
    }

    if (myDeckCover === "") {
        dispatch(setDeckCoverAC(baseDeckCover))
    }

    useEffect(() => {
        if (deckCover) {
            dispatch(setDeckCoverAC(deckCover))
        }
    }, [])

    const deleteCoverHandler = () => {
        dispatch(setDeckCoverAC(''))
    }

    return (
        <div className={style.wrapper}>

            <p>Add an image to the Pack (optional)</p>

            <div className={style.coverBlock}>
                <label className={style.uploadBlock}>
                    <input type="file"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <img src={cameraLogo} alt={'upload cover'} className={style.cameraLogo}/>
                </label>

                <div className={style.coverImage}>
                    <img onError={errorHandler} src={isCoverBroken ? baseDeckCover : myDeckCover} alt="cover"/>
                </div>

                {myDeckCover !== baseDeckCover
                    ? (<button className={style.deleteCoverBtn} onClick={deleteCoverHandler}>
                        X
                    </button>)
                    : (<div className={style.deleteCoverDiv}></div>)
                }
            </div>
        </div>
    );
};
