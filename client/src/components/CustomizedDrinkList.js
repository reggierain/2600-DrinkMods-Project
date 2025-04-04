import { useState, useEffect } from "react";

const CustomizedDrinkList = (props) => {
    const [customizedDrinks, setCustomizedDrinks] = useState([]);

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
        <div>
            <h3>Customized Drinks</h3>
            <ul>
                {customizedDrinks.map((drink) => (
                    <li key={drink._id}>
                        <button onClick={() => props.onSelect(drink, "customized")}>
                            {drink.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomizedDrinkList;
