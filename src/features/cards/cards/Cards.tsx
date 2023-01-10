import React, {useEffect, useState} from 'react';
import {Navigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import style from "./CardList.module.css"
import {SearchInput} from "../../packs/filters/search/SearchInput";
import {BasicPagination} from "../../../common/components/pagination/BasicPagination";
import {getCardsTC, setCurrentPackIdAC} from '../../../bll/reducers/cards-reducer'
import {HeaderTable} from "../../../common/components/headerTable/HeaderTable";
import {CardsTable} from "../cardsTable/CardsTable";
import {EditAndAddCardsModal} from "../../../common/components/modals/addCardsModal/EditAndAddCardsModal";
import {BackToPacksList} from "../../../common/components/backToPacksLink/BackToPacksList";
import {AppStatus} from "../../../common/types/types";


export const Cards = () => {

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const dataCards = useAppSelector(state => state.cards.cards)
    const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const search = useAppSelector(state => state.cards.filterSearchValue)
    const namePack = useAppSelector(state => state.cards.packName)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const myId = useAppSelector(state => state.profile._id)



    const [urlParams, setUrlParams] = useSearchParams()

    useEffect(() => {
        const fromUrlCurrentPackId = urlParams.get('currentPackId')

        if (fromUrlCurrentPackId !== null) {
            dispatch(setCurrentPackIdAC(fromUrlCurrentPackId))
        }
    }, [])


    // ======ОБУЧЕНИЕ ======//

    // useEffect(() => {
    //     dispatch(setCardsPackIdInLearnAC(cardsPack_id))
    // }, [cardsPack_id])


    useEffect(() => {
        if (cardsPack_id) {
            setUrlParams({
                currentPackId: `${cardsPack_id}`,
            })
        }

        dispatch(getCardsTC())
    }, [page, pageCount, search])





    const [active, setActive] = useState(false) // модалка

    const addNewCard = () => {
        setActive(true)
    }

    const learnPack = () => {
        alert('Lear Pack')
    }

    const callback = () => setActive(!active)



    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.container}>

            <BackToPacksList/>

            <div className={style.wrapper}>
                <EditAndAddCardsModal
                    answerCard={''}
                    questionCard={''}
                    type={'add'}
                    cardsPackId={cardsPack_id}
                    setActive={callback}
                    active={active}
                />

                <HeaderTable callbackToAdd={myId === packUserId ? addNewCard : learnPack}
                             titleButton={myId === packUserId ? "Add new card" : "Learn to pack"}
                             title={namePack}
                             disabled={((!dataCards.length) || (myId !== packUserId) || (appStatus === AppStatus.LOADING))}
                />

                {!dataCards.length && appStatus === AppStatus.SUCCEED && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}

                <div className={style.search}>
                    <SearchInput type={'card'}/>
                </div>

                <div className={style.table}>
                    <CardsTable/>
                </div>

                <div className={style.pagination}>
                    <BasicPagination type={'cards'}/>
                </div>
            </div>
        </div>
    );
};

