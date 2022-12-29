import React from 'react';
import {styled} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import style from "../PacksList.module.css";
import {SelectSort} from "../../../common/components/select/SelectSort";
import TableBody from "@mui/material/TableBody";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {ActionsPack} from "../actionsPack/ActionsPack";
import TableContainer from "@mui/material/TableContainer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {setPackIdAC, setPackNameAC, setUserIdAC} from "../../../bll/reducers/packs-reducer";
import {baseDeckCover} from "../../../assets/baseDeckCover";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {},
}));

export const PacksTable = () => {
    const dispatch = useAppDispatch()
    const dataPacks = useAppSelector(state => state.packList.cardPacks)

    const onClickHandler = (PackID: string, userId: string, name: string) => {
        dispatch(setPackIdAC(PackID));
        dispatch(setUserIdAC(userId));
        dispatch(setPackNameAC(name));
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead className={style.tableHeader}>
                    <TableRow className={style.tableHeader}>
                        <StyledTableCell align="center">Cover</StyledTableCell>
                        <StyledTableCell align="center">
                            <div className={style.tableName}>Name <SelectSort/></div>
                        </StyledTableCell>
                        <StyledTableCell align="center">Cards</StyledTableCell>
                        <StyledTableCell align="center">Last Updated</StyledTableCell>
                        <StyledTableCell align="center">Created by</StyledTableCell>
                        <StyledTableCell sx={{width: 120}} align="center">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataPacks.map((el) => (
                        <StyledTableRow key={el._id} className={style.tableHeader}>
                            <StyledTableCell align="center">
                                <img src={el.deckCover && el.deckCover.length > 100 ? el.deckCover : baseDeckCover}
                                     className={style.coverImg} alt={'cover'}></img></StyledTableCell>
                            <StyledTableCell align="center">
                                <NavLink onClick={() => {
                                    onClickHandler(el._id, el.user_id, el.name)
                                }} to={PATH.cardList}>
                                    {el.name}
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};