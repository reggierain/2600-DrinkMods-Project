import { useState, useEffect } from "react";

const OfficialDrinkList = (props) => {
    const [officialDrinks, setOfficialDrinks] = useState([]);

    const getOfficialDrinks = async () => {
        try {
            const res = await fetch("/api/v1/officialDrinks");
            const data = await res.json();
            setOfficialDrinks(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getOfficialDrinks();
    }, []);

    return (
        <div>
            <h3>Starbucks Official Drinks</h3>
            <ul>
                {officialDrinks.map((drink) => (
                    <li key={drink._id}>
                        <button>{drink.name}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OfficialDrinkList;
