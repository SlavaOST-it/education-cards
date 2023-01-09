import React from 'react';
import {styled} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import s from "../Packs.module.css";

import TableBody from "@mui/material/TableBody";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {ActionsPack} from "../../cards/actionsPack/ActionsPack";
import TableContainer from "@mui/material/TableContainer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {baseDeckCover} from "../../../assets/baseDeckCover";
import {SelectSort} from "../filters/sortSelect/SelectSort";
import {PackItem} from "./packItem/PackItem";
// import {setPackIdAC, setPackNameAC, setUserIdAC} from "../../../bll/reducers/packs-reducer";

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

export const PacksList = () => {
    const dispatch = useAppDispatch()
    const dataPacks = useAppSelector(state => state.packs.cardPacks)

    const onClickHandler = (PackID: string, userId: string, name: string) => {
        // dispatch(setPackIdAC(PackID));
        // dispatch(setUserIdAC(userId));
        // dispatch(setPackNameAC(name));
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            <div className={s.tableName}>
                                Name
                                <SelectSort type={"pack"} valueSort={'name'}/>
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={s.tableName}>
                                Cards
                                <SelectSort type={"pack"} valueSort={'cardsCount'}/>
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={s.tableName}>
                                Last Updated
                                <SelectSort type={"pack"} valueSort={'updated'}/>
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={s.tableName}>
                                Created by
                                <SelectSort type={"pack"} valueSort={'user_name'}/>
                            </div>
                        </StyledTableCell>

                        <StyledTableCell sx={{width: 120}} align="center">
                            <div className={s.tableName}>
                                Actions
                            </div>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataPacks.map((el) => (
                        <PackItem el={el}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};