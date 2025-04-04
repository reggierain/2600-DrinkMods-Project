import { useState, useEffect } from "react";
import OfficialDrinkList from "./OfficialDrinkList.js";
import CustomizedDrinkForm from "./CustomizedDrinkForm.js";
import CustomizedDrinkList from "./CustomizedDrinkList.js";
import DrinkIngredients from "./DrinkIngredients.js";

const App = (props) => {
    const [selectDrink, setSelectDrink] = useState(null);
    const [selectType, setSelectType] = useState("");

    const showIngredients = (drink, type) => {
        setSelectDrink(drink);
        setSelectType(type);
    };

    const goBack = () => {
        setSelectDrink(null);
        setSelectType("");
    };

    return (
        <div className="react-container">
            <h1>DrinkMods</h1>
            <h3>Your favorite Starbucks drinks in one place.</h3>
            <hr></hr>
            {selectDrink ? (
                <DrinkIngredients
                    drink={selectDrink}
                    type={selectType}
                    back={goBack}
                />
            ) : (
                <div className="drinks-list">
                    <OfficialDrinkList onSelect={showIngredients} />
                    <CustomizedDrinkList onSelect={showIngredients} />
                </div>
            )}
            <CustomizedDrinkForm />
        </div>
    );
};

export default App;
