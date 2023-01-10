import React, {FC} from 'react';
import style from "../../Packs.module.css";
import s from "./PackItem.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../utils/routes/routes";
import {baseDeckCover} from "../../../../assets/baseDeckCover";
import {ActionsPack} from "../../../cards/actionsPack/ActionsPack";
import {useAppDispatch} from "../../../../utils/hooks/hooks";
import {PackType} from "../../../../api/apiConfig/types/types";
import {StyledTableCell, StyledTableRow} from "../../../../common/styles/StyleForTables";
import {resetCardsStatedAC, setCurrentPackIdAC} from "../../../../bll/reducers/cards-reducer";


type PackItemType = {
    el: PackType
}
export const PackItem: FC<PackItemType> = ({el}) => {
    const dispatch = useAppDispatch()

    const onClickHandler = (cardsPack_id: string) => {
        dispatch(resetCardsStatedAC())
        dispatch(setCurrentPackIdAC(cardsPack_id))
    }

    return (
        <StyledTableRow key={el._id} className={style.tableHeader}>

            <StyledTableCell align="center">
                <NavLink onClick={() => {
                    onClickHandler(el._id)
                }} to={PATH.cardList}>
                    <div className={s.namePack}>
                        <img src={el.deckCover && el.deckCover.length > 100 ? el.deckCover : baseDeckCover}
                             className={style.coverImg} alt={'cover'}></img>
                        <div className={s.truncateLongTexts}>{el.name}</div>
                    </div>
                </NavLink>
            </StyledTableCell>
            <StyledTableCell align="center">{el.cardsCount}</StyledTableCell>
            <StyledTableCell align="center">{el.updated.substr(0, 10)}</StyledTableCell>
            <StyledTableCell align="center">{el.user_name}</StyledTableCell>
            <StyledTableCell sx={{width: 70}} align="right">
                {<ActionsPack type={'pack'}
                              deckCover={el.deckCover}
                              userId={el.user_id}
                              packName={el.name}
                              packId={el._id}
                              cardId={''}
                              answer={''}
                              question={''}
                />}
            </StyledTableCell>
        </StyledTableRow>
    );
};
