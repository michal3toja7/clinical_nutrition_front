import {Field, Schema} from "v4f";


export default Schema(
    {
        nazwa: Field()
            .required({message: "To pole nie może być puste"}),
        typ: Field()
            .required({message: "To pole nie może być puste"}),
        opis: Field()
            .required({message: "To pole nie może być puste"}),
        wartoscEnergetyczna: Field()
            .required({message: "To pole nie może być puste"}),
        bialko: Field()
            .required({message: "To pole nie może być puste"}),
        weglowodany: Field()
            .required({message: "To pole nie może być puste"}),
        tluszcz: Field()
            .required({message: "To pole nie może być puste"}),
        blonnik: Field()
            .required({message: "To pole nie może być puste"}),
        osmolarnosc: Field()
            .required({message: "To pole nie może być puste"}),
        sod: Field()
            .required({message: "To pole nie może być puste"}),
        potas: Field()
            .required({message: "To pole nie może być puste"}),
        chlor: Field()
            .required({message: "To pole nie może być puste"}),
        wapn: Field()
            .required({message: "To pole nie może być puste"}),
        magnez: Field()
            .required({message: "To pole nie może być puste"}),
        fosfor: Field()
            .required({message: "To pole nie może być puste"}),
        zelazo: Field()
            .required({message: "To pole nie może być puste"}),
        cynk: Field()
            .required({message: "To pole nie może być puste"})
    },
    {verbose: true, async: true}
);