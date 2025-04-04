import { useState, useActionState, useEffect } from "react";

const CustomizedDrinkForm = (props) => {
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [userName, setUserName] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
    const [status, setStatus] = useState("unsubmitted");

    const [formStatus, submitAction, pending] = useActionState(
        async (previousState, formData) => {
            const drink = {
                name: formData.get("name").trim(),
                size: formData.get("size").trim(),
                userName: formData.get("userName").trim(),
                ingredients: ingredients.map((i) => ({
                    name: i.name.trim(),
                    amount: Number(i.amount),
                })),
            };

            try {
                const res = await fetch("/api/v1/customizedDrinks", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(drink),
                });
                if (res.status === 400) {
                    setStatus("error");
                    return "error";
                }
                setName("");
                setSize("");
                setUserName("");
                setIngredients([{ name: "", amount: "" }]);
                setStatus("success");
                if (props.onSubmitSuccess) {
                    props.onSubmitSuccess();
                }
                return "submitted";
            } catch (e) {
                console.log(e);
                setStatus("error");
                return "error";
            }
        },
        "unsubmitted"
    );

    const ingredientChange = (index, type, value) => {
        const newChange = [...ingredients];
        newChange[index][type] = value;
        setIngredients(newChange);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", amount: "" }]);
    };

    useEffect(() => {
        if (status === "success") return;
        setStatus("unsubmitted");
    }, [name, size, userName]);

    useEffect(() => {
        if (props.clearMessage) {
            setStatus("unsubmitted");
        }
    }, [props.clearMessage]);

    return (
        <div>
            <fieldset>
                <legend>
                    <h4>Have a drink in mind? Post it!</h4>
                </legend>
                <form
                    action={submitAction}
                    className={pending ? "pending" : ""}
                >
                    <label>Name: </label>
                    <input
                        name="name"
                        placeholder="Drink Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={pending}
                    />
                    <br />
                    <label>Size: </label>
                    <input
                        name="size"
                        placeholder="Size (Tall, Grande, Venti)"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        disabled={pending}
                    />
                    <br />
                    <label>User's Name: </label>
                    <input
                        name="userName"
                        placeholder="Your username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        disabled={pending}
                    />
                    <br />
                    {ingredients.map((nth, index) => (
                        <div
                            key={index}
                            style={{
                                margin: "1rem 0 1rem 1rem",
                            }}
                        >
                            <label>Ingredient {index + 1}</label>
                            <br />
                            <label>Ingredient Name: </label>
                            <input
                                placeholder="Ingredient"
                                value={nth.name}
                                onChange={(e) =>
                                    ingredientChange(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                                disabled={pending}
                            />
                            <br />
                            <label>Amount: </label>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={nth.amount}
                                onChange={(e) =>
                                    ingredientChange(
                                        index,
                                        "amount",
                                        e.target.value
                                    )
                                }
                                disabled={pending}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredient}
                        disabled={pending}
                    >
                        Add Ingredient
                    </button>
                    <br />
                    <button type="submit" disabled={pending}>
                        Submit Drink
                    </button>
                    {status === "success" && (
                        <p style={{color: "green"}}>Submitted! Thank you for your contribution.</p>
                    )}
                    {status === "error" && (
                        <p style={{color: "red"}}>Error. All fields must be filled.</p>
                    )}
                </form>
            </fieldset>
        </div>
    );
};

export default CustomizedDrinkForm;
