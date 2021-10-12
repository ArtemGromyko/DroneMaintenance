import React, {useContext, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MainContext } from '../../contexts/main-context';
import { getContracts } from '../../services/api-service/contracts-service';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    width: '70%',
    margin: '0 auto'
  }
});

const ContractsPage = () => {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const { user } = useContext(MainContext);

  useEffect(() => {
    if (user) {
      getContracts(user.token).then((res) => setRows(res));
      console.log(rows);
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
            <TableCell align="right">start date</TableCell>
            <TableCell align="right">end date</TableCell>
            <TableCell align="right">service request id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.id}</TableCell>
              <TableCell align="right">{row.workStartDate}</TableCell>
              <TableCell align="right">{row.workEndDate}</TableCell>
              <TableCell align="right">{row.serviceRequestId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContractsPage;