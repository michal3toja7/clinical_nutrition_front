import { Field, Schema } from "v4f";

// Create Complex validation, with rules chaining

const isValidPesel =pesel =>{
    console.log(pesel)
    if(typeof pesel !== 'string')
        return false;

    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
}


export default Schema(
  {
    imiona: Field()
      .string()
      .alpha({ message: "Tylko znaki alfabetu" })
      .required({ message: "To pole nie może być puste" }),
      nazwisko: Field()
      .string()
      .alpha({ message: "Tylko znaki alfabetu" })
      .required({ message: "To pole nie może być puste" }),
      pesel: Field()
      .string()
      .custom(isValidPesel,{ message: "To nie jest prawidłowy pesel" })
      .required({ message: "To pole nie może być puste" }),
      plec: Field()
      .string()
      .required({ message: "To pole nie może być puste" }),
      kodPocztowy: Field()
      .string()
      .pattern(/^\d\d-\d\d\d$/,{ message: "Nieprawidłowy kod pocztowy"})
      .not.required()
      
  },
  
  { verbose: true, async: true }
);