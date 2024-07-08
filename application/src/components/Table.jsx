import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

 const TableData = ()=> {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
            <TableCell>
              <IconButton>
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Tooltip title="" arrow>
                <span></span>
              </Tooltip>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableData