import { useState, useEffect } from "react";
import OfficialDrinkList from "./OfficialDrinkList.js";
import CustomizedDrinkForm from "./CustomizedDrinkForm.js";
import CustomizedDrinkList from "./CustomizedDrinkList.js";
import DrinkIngredients from "./DrinkIngredients.js";

const App = (props) => {
    const [selectDrink, setSelectDrink] = useState(null);
    const [selectType, setSelectType] = useState("");
    const [customizedDrinks, setCustomizedDrinks] = useState([]);

    const showIngredients = async (drink, type) => {
        if (type === "customized") {
            try {
                await fetch(`/api/v1/customizedDrinks/${drink._id}/click`, {
                    method: "POST",
                });
                drink.clicks += 1;
            } catch (e) {
                console.log(e);
            }
        }

        setSelectDrink(drink);
        setSelectType(type);
    };

    const goBack = () => {
        setSelectDrink(null);
        setSelectType("");
    };

    // I also have this get customized drinks here because I couldnt find a way out on how to re-update the list
    // after adding a new drink to display the newly added drink
    const getCustomizedDrinks = async () => {
        try {
            const res = await fetch("/api/v1/customizedDrinks");
            const data = await res.json();
            setCustomizedDrinks(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCustomizedDrinks();
    }, []);

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
                    <CustomizedDrinkList onSelect={showIngredients} drinks={customizedDrinks} />
                </div>
            )}
            <CustomizedDrinkForm onSubmitSuccess={getCustomizedDrinks} clearMessage={selectDrink}/>
        </div>
    );
};

export default App;
