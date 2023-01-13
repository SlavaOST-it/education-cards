import React, {useEffect, useState} from 'react';
import {Navigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import style from "./CardList.module.css"
import {SearchInput} from "../../packs/filters/search/SearchInput";
import {BasicPagination} from "../../../common/components/pagination/BasicPagination";
import {getCardsTC, setCurrentPackIdAC, sortCardsAC} from '../../../bll/reducers/cards-reducer'
import {HeaderTable} from "../../../common/components/headerTable/HeaderTable";
import {CardsTable} from "../cardsTable/CardsTable";
import {EditAndAddCardsModal} from "../../../common/components/modals/addCardsModal/EditAndAddCardsModal";
import {BackToPacksList} from "../../../common/components/backToPacksLink/BackToPacksList";
import {AppStatus} from "../../../common/types/types";
import {SettingsPack} from "../../packs/settingsPack/SettingsPack";


export const Cards = () => {

    const dispatch = useAppDispatch()
    const dataPacks = useAppSelector(state => state.packs.cardPacks)
    const appStatus = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const dataCards = useAppSelector(state => state.cards.cards)
    const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const search = useAppSelector(state => state.cards.filterSearchValue)
    const namePack = useAppSelector(state => state.cards.packName)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const myId = useAppSelector(state => state.profile._id)

    const selectedPack = dataPacks.filter(el => el._id === cardsPack_id)

    const [urlParams, setUrlParams] = useSearchParams()

    useEffect(() => {
        const fromUrlCurrentPackId = urlParams.get('currentPackId')
        const fromUrlSortCards = urlParams.get('sortCards')

        if (fromUrlCurrentPackId !== null) {
            dispatch(setCurrentPackIdAC(fromUrlCurrentPackId))
        }
        if (fromUrlSortCards !== null) {
            dispatch(sortCardsAC(fromUrlSortCards))
        }
    }, [])


    // ======ОБУЧЕНИЕ ======//

    // useEffect(() => {
    //     dispatch(setCardsPackIdInLearnAC(cardsPack_id))
    // }, [cardsPack_id])


    useEffect(() => {
        setUrlParams({
            currentPackId: `${cardsPack_id}`,
            sortCards: `${sortCards}`,
        })

        dispatch(getCardsTC())
    }, [page, pageCount, search])


    const [activeModal, setActiveModal] = useState(false)

    const addNewCard = () => {
        setActiveModal(true)
    }

    const learnPack = () => {
        alert('Lear Pack')
    }

    const callback = () => setActiveModal(!activeModal)


    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.container}>

            <BackToPacksList/>

            <div className={style.wrapper}>
                <HeaderTable callbackToAdd={myId === packUserId ? addNewCard : learnPack}
                             titleButton={myId === packUserId ? "Add new card" : "Learn this pack"}
                             title={namePack}
                             disabled={((!dataCards.length) || (appStatus === AppStatus.LOADING))}
                >
                    {myId === packUserId && <SettingsPack selectedPack={selectedPack}/>}
                </HeaderTable>

                {!dataCards.length && appStatus === AppStatus.SUCCEED &&
                    <div>В данной колоде нету карточек удовлетворяющих поиску</div>}

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

            <EditAndAddCardsModal
                answerCard={''}
                questionCard={''}
                type={'add'}
                cardsPackId={cardsPack_id}
                setActive={callback}
                active={activeModal}
            />

        </div>
    );
};
