import {Field, Schema} from "v4f";


const isValidWaga = waga => {
    if (typeof waga !== 'string')
        return false;
    return parseFloat(waga) < 595.0
};
const isValidWzrost = wzrost => {
    if (typeof wzrost !== 'string')
        return false;
    return parseFloat(wzrost) > 50.0 && parseFloat(wzrost) < 300.0
};
const isValidTemperatura = temperatura => {
    if (typeof temperatura !== 'string')
        return false;
    return parseFloat(temperatura) > 28.0 && parseFloat(temperatura) < 47.0
};

export default Schema(
    {
        waga: Field()
            .custom(isValidWaga, {message: "Waga nieprawidłowa"})
            .required({message: "To pole nie może być puste"}),
        wzrost: Field()
            .custom(isValidWzrost, {message: "Wzrost nieprawidłowy"})
            .required({message: "To pole nie może być puste"}),
        temperatura: Field()
            .custom(isValidTemperatura, {message: "Temperatura nieprawidłowa"})
            .required({message: "To pole nie może być puste"}),
        aktywnosc: Field()
            .string()
            .required({message: "To pole nie może być puste"}),
        stanChorego: Field()
            .string()
            .required({message: "To pole nie może być puste"}),

    },

    {verbose: true, async: true}
);