import React from 'react';
import s from "../../packs/Packs.module.css";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import {useAppSelector} from "../../../utils/hooks/hooks";
import {SelectSort} from "../../packs/filters/sortSelect/SelectSort";
import {StyledTableCell} from "../../../common/styles/StyleForTables";
import {CardItem} from "./cardItem/CardItem";


export const CardsTable = () => {
    const cards = useAppSelector(state => state.cards.cards)

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead className={s.tableHeader}>
                    <TableRow className={s.tableHeader}>
                        <StyledTableCell align="center">
                            <div className={s.cards}>
                                Question
                                <SelectSort type={'card'} valueSort={'question'}/>
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            Answer
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={s.cards}>
                                Last Updated
                                <SelectSort type={'card'} valueSort={'updated'}/>
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div className={s.cards}>
                                Grade
                                <SelectSort type={'card'} valueSort={'grade'}/>
                            </div>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((el) => (
                        <CardItem el={el}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};