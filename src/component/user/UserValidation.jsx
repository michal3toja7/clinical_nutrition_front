import {Field, Schema, When} from "v4f";

const isValidPesel = pesel => {
    console.log(pesel)
    if (typeof pesel !== 'string')
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
        pesel: Field()
            .string()
            .custom(isValidPesel, {message: "To nie jest prawidłowy pesel"})
            .required({message: "To pole nie może być puste"}),
        username: Field()
            .string()
            .required({message: "To pole nie może być puste"}),
        password: Field()
            .string()
            .required({constraint: When("#id", Field().string().empty())},
                {message: "To pole nie może być puste"}),
        imiona: Field()
            .string()
            .required({message: "To pole nie może być puste"}),
        nazwisko: Field()
            .string()
            .required({message: "To pole nie może być puste"})
    },
    {verbose: true, async: true}
);