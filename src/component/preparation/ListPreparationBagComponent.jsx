import React, { Component } from 'react'
import PreparationBagService from "../../_services/PreparationBagService";
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
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'

class ListPreparationBagComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error:null,
            isLoading: true,
            initialPreparationBags: [],
            preparationBags: [],
            title: 'Worki Żywieniowe',
            page: 0,
            rowsPerPage: 7,
        }
        this.props.title(this.state.title);
        this.editPreparationBag = this.editPreparationBag.bind(this);
        this.addPreparationBag = this.addPreparationBag.bind(this);
        this.reloadPreparationBagList = this.reloadPreparationBagList.bind(this);
    }
    
    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
      };
    
    handleChangeRowsPerPage = event => {

        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
      };


    componentDidMount() {
        this.reloadPreparationBagList();
    }

    async reloadPreparationBagList() {
        await PreparationBagService.fetchPreparationBags()
            .then(result =>{ 
                if(result.error !== undefined){ this.setState({error: result.error, isLoading: false})}
                else{
                this.setState({initialPreparationBags: result.data,
                                preparationBags: result.data,
                                isLoading: false
                            })}
                });
    }

    editPreparationBag(id) {
        window.sessionStorage.setItem("preparationBagId", id);
        this.props.history.push('/edit-preparationBag');
    }

    addPreparationBag() {
        window.sessionStorage.removeItem("preparationBagId");
        this.props.history.push('/add-preparationBag');
    }

    search= (searchString) => {
        const search = searchString.target.value;
        this.setState({preparationBags: this.state.initialPreparationBags
        .filter((data) => (data.nazwa+'').toLowerCase().includes(search.toLowerCase()) 
        || (data.producent+'').toLowerCase().includes(search.toLowerCase())
        || (data.objetosc+'').toLowerCase().includes(search.toLowerCase())  
        || (data.sposobPodania+'').toLowerCase().includes(search.toLowerCase())  )})
    }

    render() {
        if(this.state.error!== null  || this.state.isLoading){
            return(
                <div>
                    {(this.state.isLoading
                    ? <LoadingComponent/>
                    : <ErrorComponent error={this.state.error} history={this.props.history}/>
                    )}
                </div>
            );
        }
        else{
        return (
            <div>
        <TextField style={{ float: "right" }} variant="standard" autoFocus position="right" 
                width="25%" type="text" className="input" placeholder="Szukaj..." onChange={this.search}/>
                    <TableContainer component={Paper}>
                        <Table aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  style={{display: "none"}} >ID</TableCell>
                                    <TableCell align="right">Producent</TableCell>
                                    <TableCell align="right">Nazwa</TableCell>
                                    <TableCell align="right">Objętość</TableCell>
                                    <TableCell align="right">Sposób Podania</TableCell>
                                    <TableCell align="right">Edytuj</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                ? this.state.preparationBags.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.preparationBags).map(row => (
                                    <TableRow hover key={row.id}>
                                        <TableCell  style={{display: "none"}} component="th" scope="row"> {row.id} </TableCell>
                                        <TableCell align="right"> {row.producent} </TableCell>
                                        <TableCell align="right">{row.nazwa}</TableCell>
                                        <TableCell align="right">{row.objetosc}</TableCell>
                                        <TableCell align="right">{row.sposobPodania}</TableCell>
                                        <TableCell align="right" onClick={() => this.editPreparationBag(row.id)}><CreateIcon /></TableCell>
                                    </TableRow>
                                ))}

                                    
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={8}
                                        count={this.state.preparationBags.length}
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
                    <Button style={{ float: "right" }} variant="contained" color="primary" onClick={() => this.addPreparationBag()}> Dodaj Preparat</Button>
                </div>
            );
        }
    }
}

export default ListPreparationBagComponent;