import { database } from "../database.js";

const getAllOfficialDrinks = (req, res) => {
    database
        .collection("officialDrinks")
        .find()
        .toArray()
        .then((drinks) => res.json(drinks))
        .catch((e) => {
            console.dir(e, { depth: null });
            res.status(500).send("Error");
        });
};

// Used when i added official drinks
// const addOfficialDrink = (req, res) => {
//     const drink = req.body;

//     database
//         .collection("officialDrinks")
//         .insertOne(drink)
//         .then(() => res.send("Success"))
//         .catch((e) => {
//             console.dir(e, { depth: null });
//             res.status(500).send("Error");
//         });
// };

export default getAllOfficialDrinks;
