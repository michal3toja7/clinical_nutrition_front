import React, {Component} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import StudyService from '../../_services/StudyService';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'
import Grid from "@material-ui/core/Grid";
import StudyValidate from "./StudyValidate";
import PreparationValidate from "../preparation/PreparationValidate";


class StudyComponent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        if (props.pomiar !== undefined && props.pomiar !== null) {
            this.state = {
                error: null,
                isLoading: false,
                saveIsActive: false,
                id: props.pomiar.id,
                idPacjenta: props.pomiar.idPacjenta,
                waga: props.pomiar.waga,
                wzrost: props.pomiar.wzrost,
                temperatura: props.pomiar.temperatura,
                aktywnosc: props.pomiar.aktywnosc,
                stanChorego: props.pomiar.stanChorego,
                dataPomiaru: props.pomiar.dataPomiaru,
                message: null,
                errors: {}
            }
        } else {
            this.state = {
                error: null,
                isLoading: false,
                id: '',
                saveIsActive: true,
                idPacjenta: props.idPacjenta,
                waga: '',
                wzrost: '',
                temperatura: '',
                aktywnosc: '',
                stanChorego: '',
                dataPomiaru: new Date(),
                message: null,
                errors: {}
            }
        }
        this.saveStudy = this.saveStudy.bind(this);
        this.deleteStudy = this.deleteStudy.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    saveStudy = (e) => {
        e.preventDefault();
        let study = {
            id: this.state.id,
            idPacjenta: this.state.idPacjenta,
            waga: this.state.waga,
            wzrost: this.state.wzrost,
            temperatura: this.state.temperatura,
            aktywnosc: this.state.aktywnosc,
            stanChorego: this.state.stanChorego,
            dataPomiaru: this.state.dataPomiaru,
        };
        StudyValidate.validate(this.state)
            .then(data => {
                if (this.state.id === '') {
                    delete study["id"];
                    StudyService.addStudy(study)
                        .then(result => {
                            if (result.error !== undefined) {
                                this.setState({error: result.error, isLoading: false})
                            } else {
                                this.setState({
                                    message: 'Pomiar dodany z sukcesem.',
                                    saveIsActive: false
                                });
                                this.props.updateList();
                            }
                        });
                } else {
                    StudyService.addStudy(study)
                        .then(result => {
                            if (result.error !== undefined) {
                                this.setState({error: result.error, isLoading: false})
                            } else {
                                this.setState({
                                    message: 'Pomiar dodany z sukcesem.',
                                    saveIsActive: false
                                });
                                this.props.updateList();
                            }
                        });
                }
            })
            .catch(errors => {
                this.setState({errors});
            });
    }

    deleteStudy = (e) => {
        e.preventDefault();
        if (this.state.id === '') {
        } else {
            StudyService.deleteStudy(this.state.id)
                .then(result => {
                    if (result.error !== undefined) {
                        this.setState({error: result.error, isLoading: false})
                    } else {
                        this.setState({
                            message: 'Pomiar usunięto z sukcesem.',
                            saveIsActive: false
                        });
                        this.props.updateList();
                    }
                });
        }
    }


    componentDidUpdate() {
        if (this.props.pomiar !== undefined) {
            if (this.props.pomiar.id !== this.state.id) {
                this.setState({
                    saveIsActive: false,
                    id: this.props.pomiar.id,
                    idPacjenta: this.props.pomiar.idPacjenta,
                    waga: this.props.pomiar.waga,
                    wzrost: this.props.pomiar.wzrost,
                    temperatura: this.props.pomiar.temperatura,
                    aktywnosc: this.props.pomiar.aktywnosc,
                    stanChorego: this.props.pomiar.stanChorego,
                    dataPomiaru: this.props.pomiar.dataPomiaru,
                })
            }
        }
    }


    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            saveIsActive: true
        })
    };

    onBlur(e) {
        const {name, value} = e.target;

        const isValid = StudyValidate[name].validate(value, {
            verbose: true,
            values: this.state
        });

        if (isValid !== true) {
            this.setState({
                errors: {...this.state.errors, [name]: isValid}
            });
        } else {
            this.setState({
                errors: {...this.state.errors, [name]: undefined}
            });
        }
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    variant="inline"
                                    label="Data Pomiaru"
                                    name="dataPomiaru"
                                    ampm={false}
                                    inputVariant="outlined"
                                    value={this.state.dataPomiaru}
                                    onChange={(date) => this.setState({
                                        dataPomiaru: new Date(date),
                                        saveIsActive: true
                                    })}
                                    format="dd.MM.yyyy HH:mm"
                                    fullWidth


                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <TextField variant="outlined" autoFocus required type="number" label="Waga (kg)"
                                       margin="normal"
                                       name='waga' value={this.state.waga} onChange={this.onChange}
                                       fullWidth onBlur={this.onBlur}
                                       error={this.state.errors.waga !== undefined}
                                       helperText={this.state.errors.waga}/>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <TextField variant="outlined" autoFocus required type="number" label="Wzrost (cm)"
                                       margin="normal"
                                       name='wzrost' value={this.state.wzrost} onChange={this.onChange}
                                       fullWidth onBlur={this.onBlur}
                                       error={this.state.errors.wzrost !== undefined}
                                       helperText={this.state.errors.wzrost}/>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <TextField variant="outlined" autoFocus required type="n" label="Temperatura"
                                       margin="normal"
                                       name='temperatura' value={this.state.temperatura} onChange={this.onChange}
                                       fullWidth onBlur={this.onBlur}
                                       error={this.state.errors.temperatura !== undefined}
                                       helperText={this.state.errors.temperatura}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField variant="outlined" autoFocus required select label="Stan Chorego" margin="normal"
                                       name="stanChorego" value={this.state.stanChorego} onChange={this.onChange}
                                       fullWidth onBlur={this.onBlur}
                                       error={this.state.errors.stanChorego !== undefined}
                                       helperText={this.state.errors.stanChorego}>
                                <MenuItem value={"NORMA"}>Normalny</MenuItem>
                                <MenuItem value={"SREDNIO_CIEZKI"}>Średnio Ciężki</MenuItem>
                                <MenuItem value={"CIEZKI"}>Ciężki</MenuItem>

                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField variant="outlined" autoFocus required select label="Aktywność" margin="normal"
                                       name="aktywnosc" value={this.state.aktywnosc} onChange={this.onChange}
                                       fullWidth onBlur={this.onBlur}
                                       error={this.state.errors.aktywnosc !== undefined}
                                       helperText={this.state.errors.aktywnosc}>
                                <MenuItem value={"LEZY"}>Leży</MenuItem>
                                <MenuItem value={"CHODZI_PRZY_LOZKU"}>Chodzi przy Łóżku</MenuItem>
                                <MenuItem value={"PELNA_AKTYWNOSC"}>Pełna Aktywność</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid container spacing={2} justify={"center"}>
                            {this.state.saveIsActive && (
                                <Grid item xs={6} sm={4}>
                                    <Button onClick={this.saveStudy} fullWidth
                                            variant="contained" color="primary">Zapisz</Button>
                                </Grid>)}
                            {this.state.saveIsActive && (
                                <Grid item xs={6} sm={4}>
                                    <Button onClick={this.deleteStudy} fullWidth
                                            variant="contained" color="secondary">Usuń</Button>
                                </Grid>)}
                        </Grid>
                    </Grid>

                </div>


            );
        }
    }
}

const flexStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "streth",
    flexWrap: "wrap",
}
const fieldStyleFlex = {
    width: "19%",
    margin: "0.5%"
}

export default StudyComponent;