import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { modelContext } from '../../contexts/models-context';
import { MainContext } from '../../contexts/main-context';
import { makeStyles } from '@material-ui/core/styles';
import { getOrders, getOrdersForUser } from '../../services/api-service/orders-service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    width: '70%',
    margin: '0 auto'
  }
});

export default function OrdersPage() {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const { user } = useContext(MainContext);

  useEffect(() => {
    if (user?.role === 'admin') {
      getOrders().then((res) => setRows(res));
    } else if(user?.role === 'user') {
      getOrdersForUser(user.id).then((res) => {
        console.log(res);
        setRows(res);
      })
    } else {
      setRows([]);
    }
  }, [user]);

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell >id</TableCell>
            {user?.role === 'admin' ? <TableCell align="right">Client name</TableCell> : null}
            {user?.role === 'admin' ? <TableCell align="right">Client email</TableCell> : null}
            <TableCell align="right">Spare part name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.id}</TableCell>
              {user?.role === 'admin' ? <TableCell align="right">{row.userName}</TableCell> : null}
              {user?.role === 'admin' ? <TableCell align="right">{row.userEmail}</TableCell> : null}
              <TableCell align="right">{row.sparePartName}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.received ? 'received' : 'on the way'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}