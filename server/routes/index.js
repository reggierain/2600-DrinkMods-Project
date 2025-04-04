import express from "express";
const router = express.Router();

import officialDrinksRouter from "./officialDrinks.js";
import customizedDrinksRouter from "./customizedDrinks.js";

router.use("/officialDrinks", officialDrinksRouter);
router.use("/customizedDrinks", customizedDrinksRouter);

export default router;
