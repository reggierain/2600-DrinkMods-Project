import { database } from "../database.js";
import mongodb from "mongodb";

const getAllCustomizedDrinks = (req, res) => {
    database
        .collection("customizedDrinks")
        .find()
        .toArray()
        .then((drinks) => res.json(drinks))
        .catch((e) => {
            console.dir(e, { depth: null });
            res.status(500).send("Error");
        });
};

const addCustomizedDrink = (req, res) => {
    const drink = req.body;

    if (
        !drink.name ||
        !drink.size ||
        drink.ingredients.length === 0 ||
        !drink.userName
    ) {
        return res.status(400).send("Error: All fields must be filled.");
    }

    let formattedDrink = {
        name: drink.name.trim(),
        size: drink.size.trim(),
        ingredients: drink.ingredients.map((i) => ({
            name: i.name.trim(),
            amount: Number(i.amount),
        })),
        clicks: 0,
        userName: drink.userName.trim(),
    };

    database
        .collection("customizedDrinks")
        .insertOne(formattedDrink)
        .then(() => res.send("Success: Customized drink inserted"))
        .catch((e) => {
            console.dir(e, { depth: null });
            res.status(500).send("Error");
        });
};

const increaseClickCount = (req, res) => {
    // increase the click count when clicked/viewed
};

export { getAllCustomizedDrinks, addCustomizedDrink, increaseClickCount };
