import express from "express";
const router = express.Router();

import getAllOfficialDrinks from "../controllers/officialDrinksController.js";

router.get("/", getAllOfficialDrinks);
// router.post("/", addOfficialDrink); only used when adding the core official drinks

export default router;
