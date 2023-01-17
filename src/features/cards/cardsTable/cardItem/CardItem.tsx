import React, {FC} from 'react';
import s from "../../../packs/Packs.module.css";
import {StyledTableCell, StyledTableRow} from "../../../../common/styles/StyleForTables";
import {BasicRating} from "../../ratingCards/RatingCard";
import {ActionsPack} from "../../../packs/actionsPack/ActionsPack";
import {CardResponseType} from "../../../../api/cardsAPI";


type CardItemType = {
    el: CardResponseType
}
export const CardItem: FC<CardItemType> = ({el}) => {
    return (
        <StyledTableRow key={el._id} className={s.tableHeader}>

            <StyledTableCell align="center">{el.question}</StyledTableCell>

            <StyledTableCell align="center">{el.answer}</StyledTableCell>

            <StyledTableCell align="center">{el.updated.substr(0, 10)}</StyledTableCell>

            <StyledTableCell sx={{width: 50}} align="left">
                <div className={s.grade}>
                    <BasicRating grade={el.grade}/>

                    <ActionsPack type={'card'}
                                 userId={el.user_id}
                                 packId={el.cardsPack_id}
                                 cardId={el._id}
                                 question={el.question}
                                 answer={el.answer}
                                 packName={''}
                                 deckCover={''}
                                 disabled={false}
                    />
                </div>
            </StyledTableCell>

        </StyledTableRow>
    );
};
