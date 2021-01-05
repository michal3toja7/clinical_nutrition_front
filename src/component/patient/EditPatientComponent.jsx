import React, { Component } from 'react'
import PatientService from "../../_services/PatientService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import ErrorComponent from '../../_helpers/ErrorComponent';
import LoadingComponent from '../../_helpers/LoadingComponent';
import PatientValidate from './PatientValidate';
import Grid from '@material-ui/core/Grid';



class EditPatientComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            title: 'Edycja Pacjenta',
            id: '',
            nazwisko: '',
            imiona: '',
            pesel: '',
            plec: '',
            dataUrodzenia: new Date(),
            miasto: '',
            kodPocztowy: '',
            ulica: '',
            nrDomu: '',
            nrMieszkania: '',
            czyZyje: true,
            message: null,
            fieldWidth: '47%',
            errors: {}
        }
        this.props.title(this.state.title);
        this.savePatient = this.savePatient.bind(this);
        this.loadPatient = this.loadPatient.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("patientId") != 'null' && sessionStorage.getItem("patientId") != undefined) {
            this.loadPatient()
        }
        else {
            this.setState({ isLoading: false })
        }
        var screenWidth = window.innerWidth;
        if (screenWidth < 600) {
            this.setState({ fieldWidth: '100%' })
        }
        else {
            this.setState({ fieldWidth: '47%' })
        }

    }

    loadPatient() {
        PatientService.fetchPatientById(window.sessionStorage.getItem("patientId"))
            .then((result) => {
                if (result.error !== undefined) { this.setState({ error: result.error, isLoading: false }) }
                else {
                    let patient = result.data;
                    this.setState({
                        id: patient.id,
                        nazwisko: patient.nazwisko,
                        imiona: patient.imiona,
                        pesel: patient.pesel,
                        plec: patient.plec,
                        dataUrodzenia: new Date(patient.dataUrodzenia),
                        miasto: patient.adresZamieszkania.miasto,
                        kodPocztowy: patient.adresZamieszkania.kodPocztowy,
                        ulica: patient.adresZamieszkania.ulica,
                        nrDomu: patient.adresZamieszkania.nrDomu,
                        nrMieszkania: patient.adresZamieszkania.nrMieszkania,
                        czyZyje: patient.czyZyje,
                        isLoading: false
                    })
                    window.sessionStorage.removeItem("patientId")
                }
            });


    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value }
        );

    onBlur(e) {
        // Handle Validation on touch

        const { name, value } = e.target;

        const isValid = PatientValidate[name].validate(value, {
            verbose: true,
            values: this.state
        });

        if (isValid !== true) {
            this.setState({
                errors: { ...this.state.errors, [name]: isValid }
            });
        } else {
            this.setState({
                errors: { ...this.state.errors, [name]: undefined }
            });
        }
    }

    onCheckboxChange = (e) =>
        this.setState({ [e.target.name]: e.target.checked }
        );


    savePatient = (e) => {
        e.preventDefault();
        let patient = {
            id: this.state.id,
            nazwisko: this.state.nazwisko,
            imiona: this.state.imiona,
            pesel: this.state.pesel,
            plec: this.state.plec,
            dataUrodzenia: this.state.dataUrodzenia,
            adresZamieszkania: {
                miasto: this.state.miasto,
                kodPocztowy: this.state.kodPocztowy,
                ulica: this.state.ulica,
                nrDomu: this.state.nrDomu,
                nrMieszkania: this.state.nrMieszkania,
            },
            czyZyje: this.state.czyZyje,
        };
        PatientValidate.validate(this.state)
            .then(data => {
                if (this.state.id == '') {
                    delete patient["id"];
                    PatientService.addPatient(patient)
                        .then(result => {
                            if (result.error !== undefined) { this.setState({ error: result.error, isLoading: false }) }
                            else {
                                this.setState({ message: 'Pacjent dodany z sukcesem.' });
                            }
                        })
                }
                else {
                    console.log(patient)
                    PatientService.editPatient(patient)
                        .then(result => {
                            if (result.error !== undefined) { this.setState({ error: result.error, isLoading: false }) }
                            else {
                                this.setState({ message: 'Pacjent zapisany z sukcesem.' });
                            }
                        });
                }
            })
            .catch(errors => {
                console.log("Jestem w błędach")
                this.setState({ errors });
            });
    }

    render() {
        if (this.state.error !== null || this.state.isLoading) {
            return (
                <div>
                    {(this.state.isLoading
                        ? <LoadingComponent />
                        : <ErrorComponent error={this.state.error} history={this.props.history} />
                    )}
                </div>
            );
        }
        else {
            return (
                <div>
                    <form style={formContainer} noValidate autoComplete="off" onSubmit={this.savePatient} component={Paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" width="100%" align="left">Dane osobowe:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    type="number"
                                    margin="normal"
                                    disabled
                                    name="id"
                                    label="ID"
                                    value={this.state.id}
                                    onChange={this.onChange}
                                    style={{ float: "left" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus type="text"
                                    required
                                    margin="normal"
                                    label="Imiona"
                                    name="imiona"
                                    onBlur={this.onBlur}
                                    error={this.state.errors.imiona !== undefined}
                                    helperText={this.state.errors.imiona}
                                    value={this.state.imiona}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    type="text"
                                    required
                                    label="Nazwisko"
                                    margin="normal"
                                    name="nazwisko"
                                    onBlur={this.onBlur}
                                    error={this.state.errors.nazwisko !== undefined}
                                    helperText={this.state.errors.nazwisko}
                                    value={this.state.nazwisko}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    required
                                    type="number"
                                    label="Pesel"
                                    margin="normal"
                                    name="pesel"
                                    onBlur={this.onBlur}
                                    error={this.state.errors.pesel !== undefined}
                                    helperText={this.state.errors.pesel}
                                    value={this.state.pesel}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <KeyboardDatePicker
                                        variant="inline"
                                        format="dd.MM.yyyy"
                                        margin="normal"
                                        label="Data Urodzenia"
                                        name="dataUrodzenia"
                                        value={this.state.dataUrodzenia}
                                        onChange={(date) => this.setState({ dataUrodzenia: new Date(date) })}
                                        fullWidth
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    select
                                    label="Płeć"
                                    margin="normal"
                                    name="plec"
                                    onBlur={this.onBlur}
                                    error={this.state.errors.plec !== undefined}
                                    helperText={this.state.errors.plec}
                                    value={this.state.plec}
                                    onChange={this.onChange}
                                    fullWidth
                                >
                                    <MenuItem value={"M"}>Mężczyzna</MenuItem>
                                    <MenuItem value={"K"}>Kobieta</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" width="100%" align="left">Dane Adresowe:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    type="text"
                                    label="Adres - Miasto"
                                    margin="normal"
                                    name="miasto"
                                    value={this.state.miasto}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    type="text"
                                    label="Adres - Kod Pocztowy"
                                    margin="normal"
                                    name="kodPocztowy"
                                    onBlur={this.onBlur}
                                    error={this.state.errors.kodPocztowy !== undefined}
                                    helperText={this.state.errors.kodPocztowy}
                                    value={this.state.kodPocztowy}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    type="text"
                                    label="Adres - Ulica"
                                    margin="normal"
                                    name="ulica"
                                    value={this.state.ulica}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    variant="outlined"
                                    autoFocus
                                    type="text"
                                    label="Adres - Nr Domu"
                                    margin="normal"
                                    name="nrDomu"
                                    value={this.state.nrDomu}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    variant="outlined"
                                    autoFocus type="text"
                                    label="Adres - Nr Mieszkania"
                                    margin="normal"
                                    name="nrMieszkania"
                                    value={this.state.nrMieszkania}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.onCheckboxChange}
                                            name="czyZyje"
                                            checked={this.state.czyZyje}
                                            value={this.state.czyZyje}
                                        />
                                    }
                                    label="Czy Żyje"
                                    style={{ float: "left" }} />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" color="primary" type="submit">Zapisz</Button>
                            </Grid>

                        </Grid>
                    </form>
                </div>
            );
        }
    }
}
const formContainer = {
    //  display: '',
    flexFlow: 'row wrap'
};

export default EditPatientComponent;