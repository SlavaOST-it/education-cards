import React from 'react';
import s from "../Packs.module.css";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import {useAppSelector} from "../../../utils/hooks/hooks";

import {PackItem} from "./packItem/PackItem";
import {StyledTableCell} from "../../../common/styles/StyleForTables";
import {SelectSort} from "../filters/sortSelect/SelectSort";


export const PacksTable = () => {
    const dataPacks = useAppSelector(state => state.packs.cardPacks)

    const itemHeaderColumn = (nameColumn: string, valueSort: string) => {
        return (
            <StyledTableCell align="center">
                <div className={""}
                >
                    <div className={s.columnName}>
                        <SelectSort type={"pack"} valueSort={valueSort}>
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
                        {itemHeaderColumn("Name", "name")}
                        {itemHeaderColumn("Cards", "cardsCount")}
                        {itemHeaderColumn("Last Updated", "updated")}
                        {itemHeaderColumn("Created by", "user_name")}
                        <StyledTableCell sx={{width: 120}} align="center">
                            <div className={s.columnName}>
                                Actions
                            </div>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataPacks.map((item) => (
                        <PackItem key={item._id} item={item}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};