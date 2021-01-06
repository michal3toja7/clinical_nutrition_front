import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import signInService from "../_services/SignInService";


const useStyles = makeStyles(theme => ({
    paper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%' // Fix IE 11 issue.
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Zaloguj się',
            username: '',
            userPassword: '',
        }
        this.props.title(this.state.title);
        this.authenticate = this.authenticate.bind(this);
        if (signInService.isUserAuthenticated()) {
            this.props.history.push("/home")
        }
    }


    async authenticate(e) {
        e.preventDefault()
        let user = {
            username: this.state.username,
            password: this.state.userPassword,
        }

        await signInService.login(user)
            .then(result => (signInService.getCurrentUser()
                    .then(result => this.props.history.push("/home")
                    )),
                error => alert("Logowanie nie powiodło się")
            )


    }

    render() {

        return (
            <Container component="main" maxWidth="xs">

                <Box borderRadius="50%">
                    <div className={useStyles.paper}>
                        <form className={useStyles.form} onSubmit={this.authenticate}>
                            <TextField
                                variant="outlined"
                                autoFocus
                                type="text"
                                margin="normal"
                                required
                                name="username"
                                label="Nazwa Użytkownika"
                                value={this.state.username}
                                onChange={e => this.setState({username: e.target.value})}
                                fullWidth
                            />

                            <TextField variant="outlined"
                                       autoFocus
                                       required
                                       type="password"
                                       label="Hasło"
                                       margin="normal"
                                       name="password"
                                       value={this.state.userPassword}
                                       onChange={e => this.setState({userPassword: e.target.value})}
                                       fullWidth
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={useStyles.submit}
                            >
                                Zaloguj
                            </Button>
                        </form>
                    </div>
                </Box>
            </Container>
        );
    }
}

export default SignIn

