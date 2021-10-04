import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { MainContext } from '../../contexts/main-context';
import Spinner from '../spinner';
import EditIcon from '@material-ui/icons/Edit';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { modelContext } from '../../contexts/models-context';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Modal } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { getRequests, deleteRequest } from '../../services/api-service/requests-service';
import Error from '../error';
import { Grid } from '@material-ui/core';
import HttpError from './../../errors/HttpError';

const columns = [
  {
    id: 'delete',
    label: 'Actions',
  },
  {
    id: 'requestStatus',
    label: 'Rquest Status',
    align: 'left'
  },
  {
    id: 'serviceType',
    label: 'ServiceType',
    minWidth: 100,
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 100,
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100,
    align: 'right'
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto'
  },
  container: {
    maxHeight: 600,
  },
  tableFooter: {
    width: '80%',
    minHeight: '75px',
    margin: '0 auto',
  },
  buttonCreate: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
  },
  pagination: {
    marginLeft: 'auto'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function RequestsPage() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useContext(MainContext);
  const { setModel } = useContext(modelContext);

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      getRequests(user).then((res) => {
        setRows(res);
        setIsLoading(false);
      }).catch((error) => {
        if (error instanceof (HttpError)) {
          if (error.code === 401) {
            history.push('/login');
          }

          setError(error);
        }
      });
    } else {
      setRows([]);
    }
  }, [user]);

  const handleDelete = (id) => {
    deleteRequest(user, id)
      .then((response) => {
        if (response.ok) {
          var array = rows.filter((i) => i.id !== id);
          setRows(array);
        }
      })
  };

  const handleEdit = (id) => {
    setModel(rows.find((r) => r.id === id));
    history.push('/request-editing');
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseFail = () => {
    setOpenFail(false);
  };

  const handleOpen = (serviceType, id) => {
    if (serviceType != 'Repair with replacement') {
      setOpenSuccess(true);
    } else {
      setModel(rows.find((r) => r.id === id));
      history.push('/contract-form');
    }
  }

  const successBody = (
    <div className={classes.paper}>
      <CheckIcon style={{ color: 'green' }} />
      <h2>Contract created successfully</h2>
      <p>
        You can find it on the contracts page.
      </p>
    </div>
  );

  const failBody = (
    <div className={classes.paper}>
      <ClearIcon style={{ color: 'red' }} />
      <h2>Contract not created</h2>
      <p>
        Something went wrong
      </p>
    </div>
  );

  return (
    <>
      {error ? <Error message={error.message} code={error.code} /> : (
        isLoading ? (
          <Spinner />
        ) : (
          <Paper className={classes.root}>
            <Modal
              className={classes.modal}
              open={openSuccess}
              onClose={handleCloseSuccess}
            >
              {successBody}
            </Modal>
            <Modal
              className={classes.modal}
              open={openFail}
              onClose={handleCloseFail}
            >
              {failBody}
            </Modal>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell align='left'>
                          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEdit(row.id)} aria-label="delete">
                            <EditIcon />
                          </IconButton>
                          {user?.role === 'admin' ?
                            (<IconButton onClick={() => handleOpen(row.serviceType, row.id)}>
                              <NoteAddIcon />
                            </IconButton>) : null}
                        </TableCell>

                        {columns.map((column) => {
                          const value = row[column.id];
                          if (value !== undefined) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
            </TableContainer>
            <TableFooter >
              <TableRow >
                <TableCell colSpan={1}>
                  <Button variant="contained" className={classes.buttonCreate} onClick={() => history.push('/request-creating')}>
                    Create
                  </Button>
                </TableCell>
                <TableCell className={classes.pagination}>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  >
                  </TablePagination>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Paper>
        )
      )}

    </>
  );
}
