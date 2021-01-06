import {Field, Schema} from "v4f";


export default Schema(
    {
        producent: Field()
            .required({message: "To pole nie może być puste"}),
        nazwa: Field()
            .required({message: "To pole nie może być puste"}),
        objetosc: Field()
            .required({message: "To pole nie może być puste"}),
        aa: Field()
            .required({message: "To pole nie może być puste"}),
        azot: Field()
            .required({message: "To pole nie może być puste"}),
        weglowodany: Field()
            .required({message: "To pole nie może być puste"}),
        tluszcze: Field()
            .required({message: "To pole nie może być puste"}),
        wartoscEnergetycznaCalkowita: Field()
            .required({message: "To pole nie może być puste"}),
        wartoscEnergetycznaPozabialkowa: Field()
            .required({message: "To pole nie może być puste"}),
        sod: Field()
            .required({message: "To pole nie może być puste"}),
        potas: Field()
            .required({message: "To pole nie może być puste"}),
        magnez: Field()
            .required({message: "To pole nie może być puste"}),
        wapn: Field()
            .required({message: "To pole nie może być puste"}),
        fosforany: Field()
            .required({message: "To pole nie może być puste"}),
        chlor: Field()
            .required({message: "To pole nie może być puste"}),
        cynk: Field()
            .required({message: "To pole nie może być puste"}),
        octany: Field()
            .required({message: "To pole nie może być puste"}),
        sposobPodania: Field()
            .required({message: "To pole nie może być puste"}),
        dipeptiven: Field()
            .required({message: "To pole nie może być puste"}),
        omegaven: Field()
            .required({message: "To pole nie może być puste"}),
        addamel: Field()
            .required({message: "To pole nie może być puste"}),
        vitalipid: Field()
            .required({message: "To pole nie może być puste"}),
        soluvit: Field()
            .required({message: "To pole nie może być puste"})
    },
    {verbose: true, async: true}
);