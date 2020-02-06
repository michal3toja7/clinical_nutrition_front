import React, { Component } from 'react'
import PatientService from "../../_services/PatientService";
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


class ListPatientComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialPatients: [],
            patients: [],
            title: 'Pacjenci',
            page: 0,
            rowsPerPage: 7,
        }
        this.props.title(this.state.title);
        this.editPatient = this.editPatient.bind(this);
        this.addPatient = this.addPatient.bind(this);
        this.reloadPatientList = this.reloadPatientList.bind(this);
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
      };
    
    handleChangeRowsPerPage = event => {

        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
      };


    componentDidMount() {
        this.reloadPatientList();
    }

    reloadPatientList() {
        PatientService.fetchPatients()
            .then(result => this.setState({initialPatients: result.data,
                                           patients: result.data}));
    }

    editPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/edit-patient');
    }

    addPatient() {
        window.localStorage.removeItem("patientId");
        this.props.history.push('/add-patient');
    }

    search= (searchString) => {
        const search = searchString.target.value;
        this.setState({patients: this.state.initialPatients
        .filter((data) => data.patientname.toLowerCase().includes(search.toLowerCase()) 
        || data.imiona.toLowerCase().includes(search.toLowerCase())
        || data.nazwisko.replace(null,' ').toLowerCase().includes(search.toLowerCase())  )})
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
                                    <TableCell style={{display: "none"}} >ID</TableCell>
                                    <TableCell align="right">Imiona</TableCell>
                                    <TableCell align="right">Nazwisko</TableCell>
                                    <TableCell align="right">Pesel</TableCell>
                                    <TableCell align="right">Płeć</TableCell>
                                    <TableCell align="right">Data Urodzenia</TableCell>
                                    <TableCell align="right">Miasto</TableCell>
                                    <TableCell align="right">Czy Żyje</TableCell>
                                    <TableCell align="right">Edytuj</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                ? this.state.patients.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.patients).map(row => (
                                    <TableRow hover key={row.id}>
                                        <TableCell style={{display: "none"}} component="th" scope="row"> {row.id} </TableCell>
                                        <TableCell align="right"> {row.imiona} </TableCell>
                                        <TableCell align="right">{row.nazwisko}</TableCell>
                                        <TableCell align="right">{row.pesel}</TableCell>
                                        <TableCell align="right">{row.plec ==='M' ? 'Mężczyzna' :'Kobieta'}</TableCell>
                                        <TableCell align="right">{new Date(row.dataUrodzenia).toLocaleDateString('pl-PL')}</TableCell>
                                        <TableCell align="right">{row.adresZamieszkania.miasto}</TableCell>
                                        <TableCell align="right">{row.czyZyje  ? 'Tak' : 'Nie'}</TableCell>
                                        <TableCell align="right" onClick={() => this.editPatient(row.id)}><CreateIcon /></TableCell>
                                    </TableRow>
                                ))}

                                    
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={8}
                                        count={this.state.patients.length}
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
                    <Button style={{ float: "right" }} variant="contained" color="primary" onClick={() => this.addPatient()}> Dodaj Pacjenta</Button>
                </div>
            );
        }
}

export default ListPatientComponent;