import React, { Component } from 'react'
import UserService from "../../_services/UserService";
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


class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialUsers: [],
            users: [],
            header: 'Użytkownicy',
            page: 0,
            rowsPerPage: 7,
        }
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
      };
    
    handleChangeRowsPerPage = event => {

        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
      };


    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        UserService.fetchUsers()
            .then(result => this.setState({initialUsers: result.data,
                                           users: result.data}));
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/admin/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/admin/add-user');
    }

    search= (searchString) => {
        const search = searchString.target.value;
        this.setState({users: this.state.initialUsers
        .filter((data) => data.username.toLowerCase().includes(search.toLowerCase()) 
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
                                    <TableCell >ID</TableCell>
                                    <TableCell align="right">Login</TableCell>
                                    <TableCell align="right">Imiona</TableCell>
                                    <TableCell align="right">Nazwisko</TableCell>
                                    <TableCell align="right">Rodzaj</TableCell>
                                    <TableCell align="right">Czy Aktywny</TableCell>
                                    <TableCell align="right">Edytuj</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                ? this.state.users.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.users).map(row => (
                                    <TableRow hover key={row.id}>
                                        <TableCell component="th" scope="row"> {row.id} </TableCell>
                                        <TableCell align="right"> {row.username} </TableCell>
                                        <TableCell align="right">{row.imiona}</TableCell>
                                        <TableCell align="right">{row.nazwisko}</TableCell>
                                        <TableCell align="right">{row.rodzaj_personelu}</TableCell>
                                        <TableCell align="right">{row.zablokowany}</TableCell>
                                        <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
                                    </TableRow>
                                ))}

                                    
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={8}
                                        count={this.state.users.length}
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
                    <Button style={{ float: "right" }} variant="contained" color="primary" onClick={() => this.addUser()}> Dodaj Użytkownika</Button>
                </div>
            );
        }
}

export default ListUserComponent;