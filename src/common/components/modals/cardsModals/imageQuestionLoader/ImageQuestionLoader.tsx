import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import s from "../../packsModals/addPackModal/AddPackModal.module.css";

import {setAppErrorAC} from "../../../../../bll/reducers/app-reducer";

import {useAppDispatch} from "../../../../../utils/hooks/hooks";
import {convertFileToBase64} from "../../../../../utils/convertFileToBase64/convertFileToBase64";

import {baseDeckCover} from "../../../../../assets/baseDeckCover";
import cameraLogo from "../../../../../assets/img/icons/camera-svgrepo-com.svg";


type ImageQuestionLoaderType = {
    questionImg: string
    setValueQuestionImg: (valueQuestion: string) => void
}

export const ImageQuestionLoader: FC<ImageQuestionLoaderType> = ({questionImg,setValueQuestionImg}) => {
    const dispatch = useAppDispatch()

    const [image, setImage] = useState(questionImg)
    const [isImageBroken, setIsImageBroken] = useState(false)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.files
        if (value && value.length) {
            const file = value[0]

            if (file.size < 100000) {
                convertFileToBase64(file, (file64: string) => {
                    setImage(file64)
                    setValueQuestionImg(file64)
                })
            } else {
                dispatch(setAppErrorAC('The file is too large'))
            }
        }
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Broken picture'))
    }

    useEffect(() => {
        if (questionImg !== "") {
            setImage(questionImg)
        } else {
            setImage(baseDeckCover)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteCoverHandler = () => {
        setImage(baseDeckCover)
        setValueQuestionImg("")
    }

    return (
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
                <img onError={errorHandler} src={isImageBroken ? baseDeckCover : image} alt="cover"/>
            </div>

            {image !== baseDeckCover
                ? (<button className={s.deleteCoverBtn} onClick={deleteCoverHandler}>
                    X
                </button>)
                : (<div className={s.deleteCoverDiv}></div>)
            }
        </div>
    );
};
