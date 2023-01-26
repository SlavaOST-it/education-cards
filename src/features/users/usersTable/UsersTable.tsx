import React from 'react';
import s from "./UsersTable.module.css"
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {StyledTableCell} from "../../../common/styles/StyleForTables";
import TableBody from "@mui/material/TableBody";
import {PackItem} from "../../packs/packsList/packItem/PackItem";
import TableContainer from "@mui/material/TableContainer";
import {UserItem} from "../userItem/UserItem";
import {useAppSelector} from "../../../utils/hooks/hooks";
import {SelectSort} from "../../packs/filters/sortSelect/SelectSort";


export const UsersTable = () => {
    const users = useAppSelector(state => state.users.users)

    const itemHeaderColumn = (nameColumn: string, valueSort: string) => {
        return (
            <StyledTableCell align="center">

                        <SelectSort type={"users"} valueSort={valueSort}>
                            {nameColumn}
                        </SelectSort>

            </StyledTableCell>
        )
    }

    return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                Name
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                Email
                            </StyledTableCell>

                            {itemHeaderColumn ('Card count', 'publicCardPacksCount')}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((item) => (
                            <UserItem key={item._id} item={item}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
};
