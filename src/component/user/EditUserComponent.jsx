import React, {Component} from 'react'
import UserService from "../../_services/UserService";
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
import UserValidation from "./UserValidation";

class EditUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            title: 'Edycja Użytkownika',
            id: '',
            username: '',
            password: '',
            imiona: '',
            nazwisko: '',
            pesel: '',
            rodzaj_personelu: '',
            stanowisko: '',
            administrator: false,
            zablokowany: false,
            message: null,
            errors: {}
        }
        this.props.title(this.state.title);
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount() {
        if (sessionStorage.getItem("userId") !== null && sessionStorage.getItem("userId") !== undefined) {
            this.loadUser();
        } else {
            this.setState({isLoading: false})
        }
    }

    loadUser() {
        UserService.fetchUserById(window.sessionStorage.getItem("userId"))
            .then((result) => {
                if (result.error !== undefined) {
                    this.setState({error: result.error, isLoading: false})
                } else {
                    let user = result.data;
                    this.setState({
                        id: user.id,
                        username: user.username,
                        password: user.password,
                        imiona: user.imiona,
                        nazwisko: user.nazwisko,
                        pesel: user.pesel,
                        rodzaj_personelu: user.rodzaj_personelu,
                        stanowisko: user.stanowisko,
                        administrator: user.administrator,
                        zablokowany: user.zablokowany,
                        isLoading: false
                    })
                    window.sessionStorage.removeItem("userId")
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

        const isValid = UserValidation[name].validate(value, {
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

    saveUser = (e) => {
        e.preventDefault();
        let user = {
            id: this.state.id,
            username: this.state.username,
            password: this.state.password,
            imiona: this.state.imiona,
            nazwisko: this.state.nazwisko,
            pesel: this.state.pesel,
            rodzaj_personelu: this.state.rodzaj_personelu,
            stanowisko: this.state.stanowisko,
            administrator: this.state.administrator,
            zablokowany: this.state.zablokowany,
        };
        UserValidation.validate(this.state)
            .then(data => {
                if (this.state.id === '') {
                    delete user["id"];
                    UserService.addUser(user)
                        .then(result => {
                            if (result.error !== undefined) {
                                this.setState({error: result.error, isLoading: false})
                            } else {
                                this.setState({message: 'Użytkownik dodany prawidłowo.'});
                                this.props.history.push('/admin/users');
                            }
                        });
                } else {
                    UserService.editUser(user)
                        .then(result => {
                            if (result.error !== undefined) {
                                this.setState({error: result.error, isLoading: false})
                            } else {
                                this.setState({message: 'User added successfully.', isLoading: false});
                                this.props.history.push('/admin/users');
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
                                <Typography variant="h6" fullwidth align="left">Dane konta:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField variant="outlined" autoFocus type="number" margin="normal" disabled
                                           name="id" label="ID" value={this.state.id} onChange={this.onChange}
                                           style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" margin="normal" required
                                           name="username"
                                           label="Nazwa Użytkownika" value={this.state.username}
                                           onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.username !== undefined}
                                           helperText={this.state.errors.username}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus required type="password" label="Hasło"
                                           margin="normal"
                                           name="password" value={this.state.password} onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.password !== undefined}
                                           helperText={this.state.errors.password}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" fullwidth align="left">Dane osobowe:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" required margin="normal"
                                           label="Imiona" name="imiona" value={this.state.imiona}
                                           onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.imiona !== undefined}
                                           helperText={this.state.errors.imiona}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" required
                                           label="Nazwisko" margin="normal" name="nazwisko" value={this.state.nazwisko}
                                           onChange={this.onChange} fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.nazwisko !== undefined}
                                           helperText={this.state.errors.nazwisko}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus required type="number" label="Pesel"
                                           margin="normal" name="pesel" value={this.state.pesel}
                                           onChange={this.onChange}
                                           fullWidth onBlur={this.onBlur}
                                           error={this.state.errors.pesel !== undefined}
                                           helperText={this.state.errors.pesel}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" fullwidth align="left">Dane Zawodowe:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus select label="Rodzaj Personelu" margin="normal"
                                           name="rodzaj_personelu" value={this.state.rodzaj_personelu}
                                           onChange={this.onChange}
                                           fullWidth>
                                    <MenuItem value={"Lekarz"}>Lekarz</MenuItem>
                                    <MenuItem value={"Pielęgniarka"}>Pielęgniarka</MenuItem>
                                    <MenuItem value={"Fizjoterapeuta"}>Fizjoterapeuta</MenuItem>
                                    <MenuItem value={"Farmaceuta"}>Farmaceuta</MenuItem>
                                    <MenuItem value={"Opiekun Medyczny"}>Opiekun Medyczny</MenuItem>
                                    <MenuItem value={"Inny"}>Inny</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                                <TextField variant="outlined" autoFocus type="text" label="Stanowisko" margin="normal"
                                           name="stanowisko" value={this.state.stanowisko} onChange={this.onChange}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField variant="outlined" autoFocus type="text" label="NPWZ" margin="normal"
                                           name="npwz" value={this.state.npwz} onChange={this.onChange}
                                           fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" fullwidth align="left">Dane Techniczne:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel control={
                                    <Checkbox onChange={this.onCheckboxChange} name="administrator"
                                              checked={this.state.administrator} value={this.state.administrator}/>
                                }
                                                  label="Czy Administrator" style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel control={
                                    <Checkbox onChange={this.onCheckboxChange} name="zablokowany"
                                              checked={this.state.zablokowany} value={this.state.zablokowany}/>
                                }
                                                  label="Czy Zablokowany" style={{float: "left"}}/>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" color="primary" onClick={this.saveUser}>Zapisz</Button>
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

export default EditUserComponent;