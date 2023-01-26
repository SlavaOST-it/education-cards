import React, {useEffect, useState} from 'react';
import {Navigate, useSearchParams} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import s from "./Card.module.css"
import {SearchInput} from "../packs/filters/search/SearchInput";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {getCardsTC, setCurrentPackIdAC, sortCardsAC} from '../../bll/reducers/cards-reducer'
import {HeaderTable} from "../../common/components/headerTable/HeaderTable";
import {CardsTable} from "./cardsTable/CardsTable";
import {AddCardModal} from "../../common/components/modals/cardsModals/addCardModal/AddCardModal";
import {BackToPacksList} from "../../common/components/backToPacksLink/BackToPacksList";
import {AppStatus} from "../../common/types/types";
import {SettingsPack} from "../packs/settingsPack/SettingsPack";
import {resetLearnCardStateAC, setCardsPackIdInLearnAC} from "../../bll/reducers/learn-reducer";
import {commonDisabled} from "../../utils/disabledOnBoot/disabledOnBoot";


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
    const [activeModal, setActiveModal] = useState(false)

    useEffect(() => {
        const fromUrlCurrentPackId = urlParams.get('currentPackId')
        const fromUrlSortCards = urlParams.get('sortCards')

        if (fromUrlCurrentPackId !== null) {
            dispatch(setCurrentPackIdAC(fromUrlCurrentPackId))
        }
        if (fromUrlSortCards !== null) {
            dispatch(sortCardsAC(fromUrlSortCards))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(setCardsPackIdInLearnAC(cardsPack_id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardsPack_id])

    useEffect(() => {
        if (cardsPack_id) {
            setUrlParams({
                currentPackId: `${cardsPack_id}`,
                sortCards: `${sortCards}`,
            })
        }
        dispatch(getCardsTC())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageCount, search])

    const addNewCardHandler = () => {
        setActiveModal(true)
    }

    const learnPackHandler = () => {
        dispatch(resetLearnCardStateAC())
        dispatch(setCardsPackIdInLearnAC(cardsPack_id))
    }

    const activeAddCardModalHandler = () => setActiveModal(!activeModal)

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.container}>

            <BackToPacksList type={'pack'}/>

            <div className={s.wrapper}>
                <HeaderTable
                    type={myId === packUserId ? "myPack" : "userPack"}
                    callbackToAdd={myId === packUserId ? addNewCardHandler : learnPackHandler}
                    title={namePack}
                    nameButton={'Add new card'}
                    disabled={((dataCards.length === 0) || (commonDisabled(appStatus)))}
                >
                    {myId === packUserId && <SettingsPack selectedPack={selectedPack}/>}
                </HeaderTable>

                {dataCards.length === 0 &&
                    <div>В данной колоде нету карточек удовлетворяющих поиску</div>}

                <div className={s.search}>
                    Search
                    <SearchInput type={'card'}/>
                </div>

                <div className={s.table}>
                    <CardsTable/>
                </div>

                <div className={s.pagination}>
                    <BasicPagination type={'card'}/>
                </div>
            </div>

            <AddCardModal
                packId={cardsPack_id}
                active={activeModal}
                setActive={activeAddCardModalHandler}
            />

        </div>
    );
};
