import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import signInService from '../_services/SignInService';

const errors= {
    403: {tytul: "Brak odpowiednich uprawnień", tekst: "Brakuje Ci uprawnień do czynności którą próbujesz wykonać. Zostaniesz cofnięty z funkcjonalności."},
    401: {tytul: "Twoja sesja wygasła!", tekst: "Twoja sesja wygasła. Zostaniesz przekierowany do strony logowania"},
    400: {tytul: "Coś poszło nie tak!", tekst: "Napotkano błąd http 400. Zostaniesz cofnięty z funkcjonalności. "},
    500: {tytul: "Coś poszło nie tak!", tekst: "Napotkano błąd serwera. Zostaniesz cofnięty z funkcjonalności. "},
}
export default function ErrorComponent(props) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setOpen(false);
    if(props.error==='401'){
      signInService.logout()
      props.history.replace("/login")
    }
    else{
        props.history.goBack()
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        style={{backgroundColor: "rgba(89, 89, 89, 0.9)"}}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errors[props.error].tytul}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                {errors[props.error].tekst}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}