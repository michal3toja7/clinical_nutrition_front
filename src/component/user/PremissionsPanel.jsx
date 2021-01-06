import React, {Component} from 'react'
import josService from "../../_services/JosService";
import premissionsService from "../../_services/PremissionsService";
import userService from "../../_services/UserService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Typography} from '@material-ui/core';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'


class PremissionsPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoading: true,
            joss: [],
            premissionsDef: [],
            premissions: [],
            title: 'Panel Uprawnień',
            page: 0,
            rowsPerPage: 7,
            user: {},
            userId: -1,
            josSelected: -1,
            premissionsForJos: new Map(),
            josPanelActive: 'auto',
            premissionsPanelActive: 'none',

        }
        this.props.title(this.state.title);
        this.savePremissions = this.savePremissions.bind(this);
        this.reloadAll = this.reloadAll.bind(this);
    }


    componentDidMount() {
        this.reloadAll();

    }

    async reloadAll() {
        await userService.fetchUserById(window.sessionStorage.getItem("userId"))
            .then((result) => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    this.setState({
                        user: result.data,
                        userId: result.data.id,
                        isLoading: false
                    })
                }
            });
        josService.fetchJoss()
            .then(result => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    this.setState({joss: result.data, isLoading: false})
                }
            });

        premissionsService.fetchPremissionssDef()
            .then(result => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    this.setState({premissionsDef: result.data, isLoading: false})
                }
            });

        premissionsService.fetchPremissionss(window.sessionStorage.getItem("userId"))
            .then(result => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    this.setState({premissions: result.data, isLoading: false})
                }
            })
    }


    selectJosRow = (idJos) => {
        idJos === this.state.josSelected ? idJos = -1 : idJos = idJos
        let tmpPremissionsForJos = new Map()
        for (let i = 0; i < this.state.premissionsDef.length; i++) {
            let tmp = this.state.premissions.filter((data) => data.josID === idJos &&
                data.uprawnienieID === this.state.premissionsDef[i].id)
            tmpPremissionsForJos.set(this.state.premissionsDef[i].id, tmp.length ? tmp[0].czyAktywny : false)
        }
        this.setState({
            josSelected: idJos,
            premissionsForJos: tmpPremissionsForJos,
            premissionsPanelActive: idJos === -1 ? 'none' : 'auto'
        })

    }

    defaultActive = () => this.setState({
        josPanelActive: 'auto',
        premissionsPanelActive: 'none',
    })

    isJosSelected = (id) => {
        return (this.state.josSelected === id ? true : false)
    }

    async savePremissions() {
        for (const [key, value] of this.state.premissionsForJos.entries()) {
            let premission = {
                uzytkownikID: this.state.userId,
                josID: this.state.josSelected,
                uprawnienieID: key,
                czyAktywny: value,
            }
            await premissionsService.addPremissions(premission)
                .then(result => {
                    if (result.error !== undefined) {
                        this.setState({error: result.error, isLoading: false})
                    } else {
                        this.setState({message: 'Uprawnienie dodane z sukcesem.'});
                    }
                });
        }
        this.reloadAll();
        this.defaultActive();
    }

    selectPremission = (idPremission) => {
        this.state.premissionsForJos.set(idPremission, !this.state.premissionsForJos.get(idPremission))
        this.setState({
            premissionsForJos: this.state.premissionsForJos,
            josPanelActive: 'none'
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
                <div style={flexStyle}>
                    <div component={Paper} style={{width: "100%", marginTop: '-30px'}}>
                        <AssignmentIndRoundedIcon style={iconStyle}></AssignmentIndRoundedIcon>
                        <Typography variant="h4" style={{marginTop: '25px'}} fullwidth
                                    align="left"><b>Użytkownik: </b>{this.state.user.imiona} {this.state.user.nazwisko}
                        </Typography>
                        <Typography variant="h5" align="left"><b>Login: </b>{this.state.user.username}</Typography>
                    </div>

                    <div style={{width: "48%", marginRight: '2%', pointerEvents: this.state.josPanelActive}}>
                        <TableContainer component={Paper}>
                            <Typography variant="h5" stle={{alignItems: "center"}}><b>Jednostki
                                Organizacyjne:</b></Typography>
                            <Table aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="right">Kod</TableCell>
                                        <TableCell align="right">Nazwa</TableCell>
                                        <TableCell align="right">Uprawnienie</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(this.state.joss).map(row => (
                                        <TableRow hover key={row.id}
                                                  onClick={event => this.selectJosRow(row.id)}
                                                  selected={this.isJosSelected(row.id)}>
                                            <TableCell component="th" scope="row"> {row.id} </TableCell>
                                            <TableCell align="right"> {row.kod} </TableCell>
                                            <TableCell align="right">{row.nazwa}</TableCell>
                                            <TableCell align="right">
                                                <FormControlLabel control={
                                                    <Checkbox name="czyAktywny" checked={this.isJosSelected(row.id)}/>
                                                }/>
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>


                    <div style={{width: "48%", marginLeft: '2%', pointerEvents: this.state.premissionsPanelActive}}>
                        <TableContainer component={Paper}>
                            <Typography variant="h5" stle={{alignItems: "center"}}><b>Uprawnienia:</b></Typography>
                            <Table aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Kod Uprawnienia</TableCell>
                                        <TableCell align="right">Nazwa</TableCell>
                                        <TableCell align="right">Uprawnienie</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(this.state.premissionsDef).map(row => (
                                        <TableRow hover key={row.id}
                                                  onClick={event => this.selectPremission(row.id)}>
                                            <TableCell component="th" scope="row"> {row.id} </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">
                                                <Checkbox name="czyAktywny"
                                                          value={this.state.premissionsForJos.get(row.id)}
                                                          checked={this.state.premissionsForJos.get(row.id) === undefined ? false : this.state.premissionsForJos.get(row.id)}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                </TableBody>
                                <TableFooter>
                                </TableFooter>
                            </Table>
                            <Button variant="contained" onClick={() => this.defaultActive()}
                                    style={{width: '48%', marginRight: '2%'}} color="bad">Odrzuć</Button>
                            <Button variant="contained" onClick={this.savePremissions}
                                    style={{width: '48%', marginLeft: '2%'}} color="primary">Zapisz</Button>
                        </TableContainer>
                    </div>
                </div>
            );
        }
    }
}

const flexStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "streth",
    flexWrap: "wrap"
}

const iconStyle = {
    clear: "both",
    transform: "scale(6)",
    margin: "60px",
    float: 'left',
}

export default PremissionsPanel;