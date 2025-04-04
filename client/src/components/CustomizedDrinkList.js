import { useState, useEffect } from "react";

const CustomizedDrinkList = (props) => {
    return (
        <div>
            <h3>Customized Drinks</h3>
            <ul>
                {props.drinks.map((drink) => (
                    // for this project, i only list the pcustomized drinks and not only listed the top 5
                    // the reason is i only have entered a few drinks so far
                    // it will be needing some kind of function like either search, recently added, or best drinks
                    // with more data.
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
