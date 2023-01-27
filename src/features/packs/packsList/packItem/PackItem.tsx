import React, {FC} from 'react';
import style from "../../Packs.module.css";
import s from "./PackItem.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../utils/routes/routes";
import {baseDeckCover} from "../../../../assets/baseDeckCover";
import {ActionsPack} from "../../actionsPack/ActionsPack";
import {useAppDispatch} from "../../../../utils/hooks/hooks";
import {StyledTableCell, StyledTableRow} from "../../../../common/styles/StyleForTables";
import {resetCardsStatedAC, setCurrentPackIdAC} from "../../../../bll/reducers/cards-reducer";
import {PackType} from "../../../../api/apiConfig/types/packsAPI-types";



type PackItemType = {
    key: any
    item: PackType
}
export const PackItem: FC<PackItemType> = ({item}) => {
    const dispatch = useAppDispatch()

    const onClickHandler = (cardsPack_id: string) => {
        dispatch(resetCardsStatedAC())
        dispatch(setCurrentPackIdAC(cardsPack_id))
    }

    return (
        <StyledTableRow key={item._id} className={style.tableHeader}>

            <StyledTableCell align="center">
                <NavLink className={s.linkToPack} onClick={() => {
                    onClickHandler(item._id)
                }} to={PATH.cardList}>
                    <div className={s.namePack}>
                        <img src={item.deckCover && item.deckCover.length > 100 ? item.deckCover : baseDeckCover}
                             className={style.coverImg} alt={'cover'}></img>
                        <div className={s.truncateLongTexts}>{item.name}</div>
                    </div>
                </NavLink>
            </StyledTableCell>

            <StyledTableCell align="center">{item.cardsCount}</StyledTableCell>

            <StyledTableCell align="center">{item.updated.substr(0, 10)}</StyledTableCell>

            <StyledTableCell align="center">{item.user_name}</StyledTableCell>

            <StyledTableCell sx={{width: 70}} align="right">
                {<ActionsPack type={'pack'}
                              deckCover={item.deckCover}
                              userId={item.user_id}
                              packName={item.name}
                              packId={item._id}
                              cardId={''}
                              answer={''}
                              question={''}
                              questionImg={''}
                              disabled={item.cardsCount === 0}
                />}
            </StyledTableCell>

        </StyledTableRow>
    );
};
