import React, {Component} from 'react'
import OrderService from "../../_services/OrderService";
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
import MenuItem from '@material-ui/core/MenuItem';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'

const flexStyle = {
    display: "flex",
    flexDirection: "row",
    //alignItems: "streth", 
    flexWrap: "wrap",
    justifyContent: 'space-between',
    marginBottom: '30px'
}

class ListOrderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoading: true,
            initialOrders: [],
            orders: [],
            title: 'Zamówienia',
            typ: '',
            status: window.sessionStorage.getItem("status") == null ? '' : window.sessionStorage.getItem("status"),
            page: 0,
            rowsPerPage: 7,
        }
        this.props.title(this.state.title);
        this.editOrder = this.editOrder.bind(this);
        this.reloadOrderList = this.reloadOrderList.bind(this);
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = event => {

        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };


    componentDidMount() {
        this.reloadOrderList();
    }

    componentDidUpdate() {
        window.sessionStorage.removeItem("status");
    }

    reloadOrderList() {
        OrderService.fetchOrdersByJos(JSON.parse(sessionStorage.getItem("currentJos")))
            .then(result => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    this.setState({
                        initialOrders: result.data,
                        orders: result.data
                            .filter((data) => (data.status + '').toLowerCase().includes(this.state.status.toLowerCase())),
                        isLoading: false,
                    })
                }
            });
    }

    editOrder(order) {
        window.sessionStorage.setItem("currentOrder", JSON.stringify(order));
        this.props.history.push('/edit-order');
    }


    search = (searchString) => {
        const search = searchString.target.value;
        this.setState({
            orders: this.state.initialOrders
                .filter((data) => (data.pacjent.imiona + '').toLowerCase().includes(search.toLowerCase())
                    || ('' + data.pacjent.nazwisko).toLowerCase().includes(search.toLowerCase())
                    || (data.josZamawiajacy.nazwa + '').toLowerCase().includes(search.toLowerCase())
                )
        })
    }

    searchOnLoad = () => {
        const search = window.sessionStorage.getItem("status");
        const field = "status";
        this.setState({
            orders: this.state.initialOrders
                .filter((data) => data[field].toLowerCase().includes(search.toLowerCase())),
            [field]: search
        })
    }

    searchSelect = (searchString) => {
        const search = searchString.target.value;
        const field = searchString.target.name;
        this.setState({
            orders: this.state.initialOrders
                .filter((data) => data[field].toLowerCase().includes(search.toLowerCase())),
            [field]: search
        })
    }

    render() {
        if (this.state.error !== null || this.state.isLoading) {
            return (
                <div>
                    {(this.state.isLoading
                            ? <LoadingComponent/>
                            : <ErrorComponent error={this.state.error} history={this.props.history}/>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <div style={flexStyle}>
                        <TextField style={{width: '25%'}} variant="standard" autoFocus
                                   type="text" label="Szukaj..." onChange={this.search}/>

                        <TextField variant="standard" autoFocus select style={{width: '25%'}} label="Typ żywienia"
                                   name="typ" value={this.state.typ} onChange={this.searchSelect}>
                            <MenuItem value={"DOU"}>Żywienie Doustne</MenuItem>
                            <MenuItem value={"DOJ"}>Żywienie Dojelitowe</MenuItem>
                            <MenuItem value={"WOR"}>Zlecenie na worek RTU</MenuItem>
                        </TextField>

                        <TextField variant="standard" select style={{width: '25%'}} label="Status zamówienia"
                                   name="status" value={this.state.status} onChange={this.searchSelect}>
                            <MenuItem value={''}>Dowolny</MenuItem>
                            <MenuItem value={"ZAP"}>Zapisane</MenuItem>
                            <MenuItem value={"WYS"}>Wysłane</MenuItem>
                            <MenuItem value={"REA"}>Realizowane</MenuItem>
                            <MenuItem value={"ZRE"}>Zrealizowane</MenuItem>
                            <MenuItem value={"ANU"}>Anulowane</MenuItem>
                        </TextField>
                    </div>


                    <TableContainer component={Paper}>
                        <Table aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{display: "none"}}>ID</TableCell>
                                    <TableCell align="right">Pacjent</TableCell>
                                    <TableCell align="right">Jednostka Zamawiająca</TableCell>
                                    <TableCell align="right">Jednostka Realizująca</TableCell>
                                    <TableCell align="right">Data Zamówienia</TableCell>
                                    <TableCell align="right">Data Zapotrzebowania</TableCell>
                                    <TableCell align="right">Typ</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Edytuj</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                    ? this.state.orders.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    : this.state.orders).map(row => (
                                    <TableRow hover key={row.id}>
                                        <TableCell style={{display: "none"}} component="th"
                                                   scope="row"> {row.id} </TableCell>
                                        <TableCell align="right">{row.pacjent.imiona} {row.pacjent.nazwisko}</TableCell>
                                        <TableCell align="right">{row.josZamawiajacy.nazwa}</TableCell>
                                        <TableCell align="right">{row.josRealizujacy.nazwa}</TableCell>
                                        <TableCell
                                            align="right">{new Date(row.dataZlecenia).toLocaleDateString('pl-PL')}</TableCell>
                                        <TableCell
                                            align="right">{new Date(row.dataNa).toLocaleDateString('pl-PL')}</TableCell>
                                        <TableCell
                                            align="right">{row.typ === 'DOJ' ? 'Dojelitowe' : (row.typ === 'WOR' ? 'Worek RTU' : 'Doustne')}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                        <TableCell align="right"
                                                   onClick={() => this.editOrder(row)}><CreateIcon/></TableCell>
                                    </TableRow>
                                ))}


                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                        colSpan={8}
                                        count={this.state.orders.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        labelRowsPerPage="Wierszy na stronę:"
                                        SelectProps={{
                                            inputProps: {'aria-label': 'Wierszy na stronę'},
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <Button style={{float: "right"}} variant="contained" color="primary"
                            onClick={() => this.editOrder(null)}> Dodaj Zamówienie</Button>
                </div>
            );
        }
    }
}

export default ListOrderComponent;