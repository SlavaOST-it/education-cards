import React, {FC} from 'react';
import s from "../../../packs/Packs.module.css";
import {StyledTableCell, StyledTableRow} from "../../../../common/styles/StyleForTables";
import {BasicRating} from "../../ratingCards/RatingCard";
import {ActionsPack} from "../../../packs/actionsPack/ActionsPack";
import {CardType} from "../../../../api/apiConfig/types/cardsAPI-types";



type CardItemType = {
    el: CardType
}

export const CardItem: FC<CardItemType> = ({el}) => {

    return (
        <StyledTableRow key={el._id} className={s.tableHeader}>

            <StyledTableCell align="center">
                {el.questionImg && el.questionImg !== ''
                    ? <>
                        <img
                            src={el.questionImg}
                            alt={"question"}
                            className={s.questionImg}/>
                    </>
                    : <div className={s.truncateLongTexts}>
                        {el.question}
                    </div>
                }
            </StyledTableCell>

            <StyledTableCell align="center">
                {el.answerImg && el.answerImg !== ""
                    ? <>
                        <img
                            src={el.answerImg}
                            alt={"answer"}
                            className={s.questionImg}/>
                    </>
                    : <div className={s.truncateLongTexts}>
                        {el.answer}
                    </div>
                }
            </StyledTableCell>

            <StyledTableCell align="center">{el.updated.substr(0, 10)}</StyledTableCell>

            <StyledTableCell sx={{width: 50}} align="left">
                <div className={s.grade}>
                    <BasicRating grade={el.grade}/>

                    <ActionsPack type={'card'}
                                 userId={el.user_id}
                                 packId={el.cardsPack_id}
                                 cardId={el._id}
                                 question={el.question}
                                 questionImg={el.questionImg}
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
