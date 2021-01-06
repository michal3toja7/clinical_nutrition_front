import {Field, Schema} from "v4f";


export default Schema(
    {
        kod: Field()
            .string()
            .required({message: "To pole nie może być puste"}),
        nazwa: Field()
            .string()
            .required({message: "To pole nie może być puste"}),
        rodzaj: Field()
            .string()
            .required({message: "To pole nie może być puste"}),
        adresKodPocztowy: Field()
            .string()
            .pattern(/^\d\d-\d\d\d$/,{ message: "Nieprawidłowy kod pocztowy"})
            .not.required(),
        email: Field()
            .string()
            .email({ message: "Nieprawidłowy adres email"})
            .not.required()
    },
    {verbose: true, async: true}
);