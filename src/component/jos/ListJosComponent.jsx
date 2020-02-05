import React, { Component } from 'react'
import josService from "../../_services/JosService";
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


class ListJosComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialjoss: [],
            joss: [],
            title: 'Jednostki organizacyjne',
            page: 0,
            rowsPerPage: 7,
        }
        this.props.title(this.state.title);
        this.editJos = this.editJos.bind(this);
        this.addJos = this.addJos.bind(this);
        this.reloadjosList = this.reloadJosList.bind(this);
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
      };
    
    handleChangeRowsPerPage = event => {

        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
      };


    componentDidMount() {
        this.reloadjosList();
    }

    reloadJosList() {
        josService.fetchJoss()
            .then(result => this.setState({initialjoss: result.data,
                                           joss: result.data}));
    }

    editJos(id) {
        window.localStorage.setItem("josId", id);
        this.props.history.push('/admin/edit-jos');
    }

    addJos() {
        window.localStorage.removeItem("josId");
        this.props.history.push('/admin/add-jos');
    }

    search= (searchString) => {
        const search = searchString.target.value;
        this.setState({joss: this.state.initialjoss
        .filter((data) => data.kod.toLowerCase().includes(search.toLowerCase()) 
        || data.nazwa.toLowerCase().includes(search.toLowerCase())
        || data.rodzaj.replace(null,' ').toLowerCase().includes(search.toLowerCase())  )})
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
                                    <TableCell >ID</TableCell>
                                    <TableCell align="right">Kod</TableCell>
                                    <TableCell align="right">Nazwa</TableCell>
                                    <TableCell align="right">Rodzaj</TableCell>
                                    <TableCell align="right">Czy Aktywny</TableCell>
                                    <TableCell align="right">Edytuj</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                ? this.state.joss.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.joss).map(row => (
                                    <TableRow hover key={row.id}>
                                        <TableCell component="th" scope="row"> {row.id} </TableCell>
                                        <TableCell align="right"> {row.kod} </TableCell>
                                        <TableCell align="right">{row.nazwa}</TableCell>
                                        <TableCell align="right">{row.rodzaj}</TableCell>
                                        <TableCell align="right">{row.czyAktywny ? 'Tak' : 'Nie'}</TableCell>
                                        <TableCell align="right" onClick={() => this.editJos(row.id)}><CreateIcon /></TableCell>
                                    </TableRow>
                                ))}

                                    
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={6}
                                        count={this.state.joss.length}
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
                    <Button style={{ float: "right" }} variant="contained" color="primary" onClick={() => this.addJos()}> Dodaj Jednostkę Organizacyjną</Button>
                </div>
            );
        }
}

export default ListJosComponent;