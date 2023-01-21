import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import s from "../modals/packsModals/addPackModal/AddPackModal.module.css";
import {setDeckCoverAC} from "../../../bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import cameraLogo from "../../../assets/img/icons/camera-svgrepo-com.svg"
import baseDeckCover from "../../../assets/img/no_image.png";
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
                dispatch(setAppErrorAC('The file is too large'))
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
            } else {
                dispatch(setDeckCoverAC(''))
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteCoverHandler = () => {
        dispatch(setDeckCoverAC(''))
    }

    return (
        <div className={s.wrapper}>

            <p>Add an image to the Pack (optional)</p>

            <div className={s.coverBlock}>
                <label className={s.uploadBlock}>
                    <input type="file"
                           value={''}
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <img src={cameraLogo} alt={'upload cover'} className={s.cameraLogo}/>
                </label>

                <div className={s.coverImage}>
                    <img onError={errorHandler} src={isCoverBroken ? baseDeckCover : myDeckCover} alt="cover"/>
                </div>

                {myDeckCover !== baseDeckCover
                    ? (<button className={s.deleteCoverBtn} onClick={deleteCoverHandler}>
                        X
                    </button>)
                    : (<div className={s.deleteCoverDiv}></div>)
                }
            </div>
        </div>
    );
};
