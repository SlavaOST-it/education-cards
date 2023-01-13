import React from 'react';
import s from "./CardsTable.module.css";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import {useAppSelector} from "../../../utils/hooks/hooks";

import {StyledTableCell} from "../../../common/styles/StyleForTables";
import {CardItem} from "./cardItem/CardItem";
import {SelectSort} from "../../packs/filters/sortSelect/SelectSort";


export const CardsTable = () => {
    const dataPacks = useAppSelector(state => state.cards.cards)

    const itemHeaderColumn = (nameColumn: string, valueSort: string) => {
        return (
            <StyledTableCell align="center">
                <div className={""}
                >
                    <div className={s.columnName}>
                        <SelectSort type={"card"} valueSort={valueSort}>
                            {nameColumn}
                        </SelectSort>
                    </div>
                </div>
            </StyledTableCell>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {itemHeaderColumn("Question", "question")}
                        <StyledTableCell align="center">
                            Answer
                        </StyledTableCell>
                        {itemHeaderColumn("Last Updated", "updated")}
                        {itemHeaderColumn("Grade", "grade")}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataPacks.map((el) => (
                        <CardItem el={el}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};