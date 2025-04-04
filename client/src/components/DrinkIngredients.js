const DrinkIngredients = ({ drink, type, back }) => {
    return (
        <div>
            <button onClick={back}>Back to Drinks List</button>
            <h2>{drink.name}</h2>
            {type === "official" ? (
                <div>
                    <h4>Sizes and Ingredients:</h4>
                    {Object.entries(drink.sizes).map(([size, ingredients], index) => (
                        <div key={index}>
                            <strong>{size}:</strong>
                            <ul>
                                {ingredients.map((item, i) => (
                                    <li key={i}>{item.amount} {item.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p><strong>Size:</strong> {drink.size}</p>
                    <h4>Ingredients:</h4>
                    <ul>
                        {drink.ingredients.map((item, i) => (
                            <li key={i}>{item.amount} {item.name}</li>
                        ))}
                    </ul>
                    <p><em>User:</em> {drink.creatorName}</p>
                    <p><em>Clicks:</em> {drink.clicks}</p>
                </div>
            )}
        </div>
    );
};

export default DrinkIngredients;
