import React, {FC} from 'react';
import style from "../../Packs.module.css";
import s from "./PackItem.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../utils/routes/routes";
import {baseDeckCover} from "../../../../assets/baseDeckCover";
import {ActionsPack} from "../../../cards/actionsPack/ActionsPack";
import {styled} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {TPack} from "../../../../api/myAPI/myAPI";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";


const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {},
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


type PackItemType = {
    el: TPack
}
export const PackItem: FC<PackItemType> = ({el}) => {
    const dispatch = useAppDispatch()

    const onClickHandler = (PackID: string, userId: string, name: string) => {
        // dispatch(setPackIdAC(PackID));
        // dispatch(setUserIdAC(userId));
        // dispatch(setPackNameAC(name));
    }

    return (
        <StyledTableRow key={el._id} className={style.tableHeader}>

            <StyledTableCell align="center">
                <NavLink onClick={() => {
                    // onClickHandler(el._id, el.user_id, el.name)
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
