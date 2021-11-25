//import React from 'react';
import React, { useState, ChangeEvent, useCallback, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
////////
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { Link, withRouter, RouteComponentProps , useHistory} from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Product from '../products/gateway/Product';

interface Props {
  products: Product[];
}



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function List_New({ products,  match, }: Props & RouteComponentProps) 
{
                const [deleteDialog, setDeleteDialog] = useState<{ open: boolean;id: number; }>  ({ open: false, id: 0 });
                const [filter, setFilter] = useState('');
                const [sort, setSort] = useState<{ orderBy: keyof Product; order: 'asc' | 'desc';  }> ({ orderBy: 'name', order: 'asc', });

                const createSortHandler = (columnId: keyof Product) => {
                                                                        return () => {
                                                                          setSort({ orderBy: columnId, order: sort.order === 'asc' ? 'desc' : 'asc', });
                                                                        };
                                                             };


const history = useHistory();
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name </TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Key</TableCell>
          </TableRow>
        </TableHead>
        <TableBody   >
          {products.map((row) => (
            <TableRow key={row.name}  >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.key}</TableCell>
              

              
   
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
   
  );
}

export default withRouter(List_New);