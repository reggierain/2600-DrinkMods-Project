import express from "express";
const router = express.Router();

import {
    getAllCustomizedDrinks,
    addCustomizedDrink,
    increaseClickCount
} from "../controllers/customizedDrinksController.js";

router.get("/", getAllCustomizedDrinks);
router.post("/", addCustomizedDrink);
router.post("/:id/click", increaseClickCount);

export default router;
