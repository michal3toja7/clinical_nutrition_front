import React, {Component} from 'react'
import JosService from "../../_services/JosService";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'
import JosValidation from "./JosValidation";
import Grid from "@material-ui/core/Grid";


class EditJosComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Edytuj Jednostkę',
            oldJOS: false,
            error: null,
            isLoading: true,
            id: '',
            kod: '',
            nazwa: '',
            rodzaj: '',
            czyAktywny: true,
            nazwaPieczatka: '',
            adresMiasto: '',
            adresUlica: '',
            adresUlicaNumer: '',
            adresKodPocztowy: '',
            email: '',
            telefon: '',
            message: null,
            errors: {}
        }
        this.props.title(this.state.title);
        this.saveJos = this.saveJos.bind(this);
        this.loadJos = this.loadJos.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem("josId") != 'null' && sessionStorage.getItem("josId") != undefined) {
            this.loadJos();
        } else {
            this.setState({isLoading: false})
        }
    }

    loadJos() {
        JosService.fetchJosById(window.sessionStorage.getItem("josId"))
            .then((result) => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    let jos = result.data;
                    this.setState({
                        id: jos.id,
                        kod: jos.kod,
                        nazwa: jos.nazwa,
                        rodzaj: jos.rodzaj,
                        czyAktywny: jos.czyAktywny,
                        nazwaPieczatka: jos.nazwaPieczatka,
                        adresMiasto: jos.adresMiasto,
                        adresUlica: jos.adresUlica,
                        adresUlicaNumer: jos.adresUlicaNumer,
                        adresKodPocztowy: jos.adresKodPocztowy,
                        email: jos.email,
                        telefon: jos.telefon,
                        isLoading: false,
                        oldJOS: true,
                    })
                    window.sessionStorage.removeItem("josId")
                }
            });


    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value}
        );

    onCheckboxChange = (e) =>
        this.setState({[e.target.name]: e.target.checked}
        );

    onBlur(e) {
        const {name, value} = e.target;

        const isValid = JosValidation[name].validate(value, {
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

    saveJos = (e) => {
        e.preventDefault();
        let jos = {
            id: this.state.id,
            kod: this.state.kod,
            nazwa: this.state.nazwa,
            rodzaj: this.state.rodzaj,
            czyAktywny: this.state.czyAktywny,
            nazwaPieczatka: this.state.nazwaPieczatka,
            adresMiasto: this.state.adresMiasto,
            adresUlica: this.state.adresUlica,
            adresUlicaNumer: this.state.adresUlicaNumer,
            adresKodPocztowy: this.state.adresKodPocztowy,
            email: this.state.email,
            telefon: this.state.telefon,
        };

        JosValidation.validate(this.state)
            .then(data => {
                if (this.state.id == '') {
                    delete jos["id"];
                    JosService.addJos(jos)
                        .then(res => {
                            if (res.error !== undefined) {
                                this.setState({error: res.error, isLoading: false})
                            } else {
                                this.setState({message: 'Jos dodany z powodzeniem.'});
                                this.props.history.push('/admin/jos');
                            }
                        });
                } else {
                    JosService.editJos(jos)
                        .then(res => {
                            if (res.error !== undefined) {
                                this.setState({error: res.error, isLoading: false})
                            } else {
                                this.setState({message: 'Jos zedytowany z powodzeniem.', isLoading: false});
                                this.props.history.push('/admin/jos');
                            }
                        });
                }
            })
            .catch(errors => {
                this.setState({errors});
            });
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
                    <form style={formContainer} component={Paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" width="100%" align="left">Dane Jednostki:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                                           name="id" label="ID" value={this.state.id} onChange={this.onChange}
                                           style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus disabled={this.state.oldJOS} type="text"
                                           margin="normal"
                                           required name="kod"
                                           label="Kod Jednostki" value={this.state.kod} onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.kod !== undefined}
                                           helperText={this.state.errors.kod}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus required type="text" label="Nazwa"
                                           margin="normal"
                                           name="nazwa" value={this.state.nazwa} onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.nazwa !== undefined}
                                           helperText={this.state.errors.nazwa}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus required select label="Rodzaj Jednostki"
                                           margin="normal"
                                           name="rodzaj" value={this.state.rodzaj} onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.rodzaj !== undefined}
                                           helperText={this.state.errors.rodzaj}>
                                    <MenuItem value={"APT"}>Apteka</MenuItem>
                                    <MenuItem value={"ODD"}>Oddział</MenuItem>
                                    <MenuItem value={"POR"}>Poradnia</MenuItem>
                                    <MenuItem value={"PRA"}>Pracownia</MenuItem>
                                    <MenuItem value={"IZB"}>Izba Przyjęć</MenuItem>
                                    <MenuItem value={"INN"}>Inny</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" width="true" align="left">Dane adresowe:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" margin="normal"
                                           label="Nazwa na pieczątce" name="nazwaPieczatka"
                                           value={this.state.nazwaPieczatka}
                                           onChange={this.onChange} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text"
                                           label="Adres - Miasto" margin="normal" name="adresMiasto"
                                           value={this.state.adresMiasto} onChange={this.onChange}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text"
                                           label="Adres - Ulica" margin="normal" name="adresUlica"
                                           value={this.state.adresUlica}
                                           onChange={this.onChange} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" label="Adres - Numer Ulicy"
                                           margin="normal" name="adresUlicaNumer"
                                           value={this.state.adresUlicaNumer}
                                           onChange={this.onChange} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" label="Adres - Kod Pocztowy"
                                           margin="normal" name="adresKodPocztowy"
                                           value={this.state.adresKodPocztowy}
                                           onChange={this.onChange} fullWidth
                                           onBlur={this.onBlur}
                                           error={this.state.errors.adresKodPocztowy !== undefined}
                                           helperText={this.state.errors.adresKodPocztowy}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" label="Email"
                                           margin="normal" name="email" value={this.state.email}
                                           onChange={this.onChange}
                                           fullWidth
                                            onBlur={this.onBlur}
                                           error={this.state.errors.email !== undefined}
                                           helperText={this.state.errors.email}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" label="Telefon"
                                           margin="normal" name="telefon" value={this.state.telefon}
                                           onChange={this.onChange}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" width={"100%"} align="left">Dane Techniczne:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel control={
                                    <Checkbox onChange={this.onCheckboxChange} name="czyAktywny"
                                              checked={this.state.czyAktywny}
                                              value={this.state.czyAktywny}/>
                                }
                                                  label="Czy Aktywna" style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" color="primary"
                                        onClick={this.saveJos}>Zapisz</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            );
        }
    }
}

const formContainer =
    {
        //  display: '',
        flexFlow: 'row wrap'
    }
;

export default EditJosComponent;