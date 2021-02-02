import React, {Component} from 'react'
import PreparationService from "../../_services/PreparationService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ErrorComponent from '../../_helpers/ErrorComponent'
import LoadingComponent from '../../_helpers/LoadingComponent'
import Grid from "@material-ui/core/Grid";
import PreparationValidate from './PreparationValidate';


class EditPreparationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            title: 'Edycja Preparatu',
            id: '',
            nazwa: '',
            typ: '',
            opis: '',
            wartoscEnergetyczna: '',
            bialko: '',
            weglowodany: '',
            tluszcz: '',
            blonnik: '',
            osmolarnosc: '',
            sod: '',
            potas: '',
            chlor: '',
            wapn: '',
            magnez: '',
            fosfor: '',
            zelazo: '',
            cynk: '',
            czyAktywny: true,
            message: null,
            errors: {}
        }
        this.props.title(this.state.title);
        this.savePreparation = this.savePreparation.bind(this);
        this.loadPreparation = this.loadPreparation.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }

    componentDidMount() {
        if (sessionStorage.getItem("preparationId") !== null && sessionStorage.getItem("preparationId") !== undefined) {
            this.loadPreparation();
        } else {
            this.setState({isLoading: false})
        }
    }

    loadPreparation() {
        PreparationService.fetchPreparationById(window.sessionStorage.getItem("preparationId"))
            .then((result) => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    let preparation = result.data;
                    this.setState({
                        id: preparation.id,
                        nazwa: preparation.nazwa,
                        typ: preparation.typ,
                        opis: preparation.opis,
                        wartoscEnergetyczna: preparation.wartoscEnergetyczna,
                        bialko: preparation.bialko,
                        weglowodany: preparation.weglowodany,
                        tluszcz: preparation.tluszcz,
                        blonnik: preparation.blonnik,
                        osmolarnosc: preparation.osmolarnosc,
                        sod: preparation.sod,
                        potas: preparation.potas,
                        chlor: preparation.chlor,
                        wapn: preparation.wapn,
                        magnez: preparation.magnez,
                        fosfor: preparation.fosfor,
                        zelazo: preparation.zelazo,
                        cynk: preparation.cynk,
                        czyAktywny: preparation.czyAktywny,
                        isLoading: false
                    })
                    window.sessionStorage.removeItem("preparationId")
                }
            });


    }

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value}
        );

    onBlur(e) {
        const {name, value} = e.target;

        const isValid = PreparationValidate[name].validate(value, {
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

    onCheckboxChange = (e) =>
        this.setState({[e.target.name]: e.target.checked}
        );


    savePreparation = (e) => {
        e.preventDefault();
        let preparation = {
            id: this.state.id,
            nazwa: this.state.nazwa,
            typ: this.state.typ,
            opis: this.state.opis,
            wartoscEnergetyczna: this.state.wartoscEnergetyczna,
            bialko: this.state.bialko,
            weglowodany: this.state.weglowodany,
            tluszcz: this.state.tluszcz,
            blonnik: this.state.blonnik,
            osmolarnosc: this.state.osmolarnosc,
            sod: this.state.sod,
            potas: this.state.potas,
            chlor: this.state.chlor,
            wapn: this.state.wapn,
            magnez: this.state.magnez,
            fosfor: this.state.fosfor,
            zelazo: this.state.zelazo,
            cynk: this.state.cynk,
            czyAktywny: this.state.czyAktywny
        };
        PreparationValidate.validate(this.state)
            .then(data => {
                if (this.state.id === '') {
                    delete preparation["id"];
                    PreparationService.addPreparation(preparation)
                        .then(result => {
                            if (result.error !== undefined) {
                                this.setState({error: result.error, isLoading: false})
                            } else {
                                this.setState({message: 'Preparat dodany z sukcesem.'});
                                this.props.history.push('/preparations');
                            }
                        });
                } else {
                    PreparationService.editPreparation(preparation)
                        .then(result => {
                            if (result.error !== undefined) {
                                this.setState({error: result.error, isLoading: false})
                            } else {
                                this.setState({message: 'Preparat zedytowany z sukcesem.', isLoading: false});
                                this.props.history.push('/preparations');
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
                                <Typography variant="h6" width={"100%"} align="left">Dane:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                                           name="id" label="ID" value={this.state.id} onChange={this.onChange}
                                           style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" required margin="normal"
                                           label="Nazwa" name="nazwa" value={this.state.nazwa} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.nazwa !== undefined}
                                           helperText={this.state.errors.nazwa}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus required select label="Typ" margin="normal"
                                           name="typ" value={this.state.typ} onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.typ !== undefined}
                                           helperText={this.state.errors.typ}>
                                    <MenuItem value={"DOJ"}>Dojelitowy</MenuItem>
                                    <MenuItem value={"DOU"}>Doustny</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField variant="outlined" autoFocus fullWidth type="text" required
                                           label="Opis" margin="normal" name="opis" value={this.state.opis}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.opis !== undefined}
                                           helperText={this.state.errors.opis}
                                           onChange={this.onChange}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" width={"100%"} align="left">Wartości odżywcze:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number"
                                           label="Wartość Energetyczna (kcal/ 1ml)" margin="normal"
                                           name='wartoscEnergetyczna' value={this.state.wartoscEnergetyczna}
                                           onChange={this.onChange} fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.wartoscEnergetyczna !== undefined}
                                           helperText={this.state.errors.wartoscEnergetyczna}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Białko [g/100ml]"
                                           margin="normal"
                                           name='bialko' value={this.state.bialko} onChange={this.onChange} fullWidth
                                           onBlur={this.onBlur}
                                           error={this.state.errors.bialko !== undefined}
                                           helperText={this.state.errors.bialko}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number"
                                           label="Węglowodany [g/100ml]" margin="normal"
                                           name='weglowodany' value={this.state.weglowodany} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.weglowodany !== undefined}
                                           helperText={this.state.errors.weglowodany}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Tłuszcz [g/100ml]"
                                           margin="normal"
                                           name='tluszcz' value={this.state.tluszcz} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.tluszcz !== undefined}
                                           helperText={this.state.errors.tluszcz}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Błonnik [g/100ml]"
                                           margin="normal"
                                           name='blonnik' value={this.state.blonnik} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.blonnik !== undefined}
                                           helperText={this.state.errors.blonnik}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number"
                                           label="Osmolarność [mOsm/l]" margin="normal"
                                           name='osmolarnosc' value={this.state.osmolarnosc} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.osmolarnosc !== undefined}
                                           helperText={this.state.errors.osmolarnosc}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Sód [mg/100ml]"
                                           margin="normal"
                                           name='sod' value={this.state.sod} onChange={this.onChange} fullWidth
                                           onBlur={this.onBlur}
                                           error={this.state.errors.sod !== undefined}
                                           helperText={this.state.errors.sod}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Potas [mg/100ml]"
                                           margin="normal"
                                           name='potas' value={this.state.potas} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.potas !== undefined}
                                           helperText={this.state.errors.potas} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Chlor [mg/100ml]"
                                           margin="normal"
                                           name='chlor' value={this.state.chlor} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.chlor !== undefined}
                                           helperText={this.state.errors.chlor} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Wapń [mg/100ml]"
                                           margin="normal"
                                           name='wapn' value={this.state.wapn} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.wapn !== undefined}
                                           helperText={this.state.errors.wapn} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Magnez [mg/100ml]"
                                           margin="normal"
                                           name='magnez' value={this.state.magnez} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.magnez !== undefined}
                                           helperText={this.state.errors.magnez} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Fosfor [mg/100ml]"
                                           margin="normal"
                                           name='fosfor' value={this.state.fosfor} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.fosfor !== undefined}
                                           helperText={this.state.errors.fosfor} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Żelazo [mg/100ml]"
                                           margin="normal"
                                           name='zelazo' value={this.state.zelazo} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.zelazo !== undefined}
                                           helperText={this.state.errors.zelazo} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField variant="outlined" autoFocus required type="number" label="Cynk [mg/100ml]"
                                           margin="normal"
                                           name='cynk' value={this.state.cynk} onChange={this.onChange}
                                           onBlur={this.onBlur}
                                           error={this.state.errors.cynk !== undefined}
                                           helperText={this.state.errors.cynk} fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel control={
                                    <Checkbox onChange={this.onCheckboxChange} name="czyAktywny"
                                              checked={this.state.czyAktywny} value={this.state.czyAktywny}/>
                                }
                                                  label="Czy Aktywny" style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" color="primary"
                                        onClick={this.savePreparation}>Zapisz</Button>
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

export default EditPreparationComponent;