import React, { Component } from 'react'
import PreparationService from "../../_services/PreparationService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';


class ListPreparationComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialPreparations: [],
            preparations: [],
            title: 'Preparaty',
            page: 0,
            rowsPerPage: 7,
        }
        this.props.title(this.state.title);
        this.editPreparation = this.editPreparation.bind(this);
        this.addPreparation = this.addPreparation.bind(this);
        this.reloadPreparationList = this.reloadPreparationList.bind(this);
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
      };
    
    handleChangeRowsPerPage = event => {

        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
      };


    componentDidMount() {
        this.reloadPreparationList();
    }

    reloadPreparationList() {
        PreparationService.fetchPreparations()
            .then(result => this.setState({initialPreparations: result.data,
                                           preparations: result.data}));
    }

    editPreparation(id) {
        window.localStorage.setItem("preparationId", id);
        this.props.history.push('/edit-preparation');
    }

    addPreparation() {
        window.localStorage.removeItem("preparationId");
        this.props.history.push('/add-preparation');
    }

    search= (searchString) => {
        const search = searchString.target.value;
        this.setState({preparations: this.state.initialPreparations
        .filter((data) => (data.nazwa+'').toLowerCase().includes(search.toLowerCase()) 
        || (data.typ+'').toLowerCase().includes(search.toLowerCase())
        || (data.opis+'').toLowerCase().includes(search.toLowerCase())  )})
    }

    render() {
        return (
            <div>
                <TextField style={{ float: "right" }} variant="standard" autoFocus position="right" 
                width="25%" type="text" className="input" placeholder="Szukaj..." onChange={this.search}/>
                    <TableContainer component={Paper}>
                        <Table aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  style={{display: "none"}} >ID</TableCell>
                                    <TableCell align="right">Nazwa</TableCell>
                                    <TableCell align="right">Typ</TableCell>
                                    <TableCell align="right">Opis</TableCell>
                                    <TableCell align="right">Wartość Energetyczna</TableCell>
                                    <TableCell align="right">Edytuj</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                ? this.state.preparations.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.preparations).map(row => (
                                    <TableRow hover key={row.id}>
                                        <TableCell  style={{display: "none"}} component="th" scope="row"> {row.id} </TableCell>
                                        <TableCell align="right"> {row.nazwa} </TableCell>
                                        <TableCell align="right">{row.typ === 'DOJ' ? 'Dojelitowy' : 'Doustny'}</TableCell>
                                        <TableCell align="right">{row.opis}</TableCell>
                                        <TableCell align="right">{row.wartoscEnergetyczna}</TableCell>
                                        <TableCell align="right" onClick={() => this.editPreparation(row.id)}><CreateIcon /></TableCell>
                                    </TableRow>
                                ))}

                                    
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={8}
                                        count={this.state.preparations.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        labelRowsPerPage="Wierszy na stronę:"
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'Wierszy na stronę' },
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>             
                        </Table>
                    </TableContainer>
                    <Button style={{ float: "right" }} variant="contained" color="primary" onClick={() => this.addPreparation()}> Dodaj Preparat</Button>
                </div>
            );
        }
}

export default ListPreparationComponent;