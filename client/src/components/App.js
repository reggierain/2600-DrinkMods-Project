import OfficialDrinkList from "./OfficialDrinkList.js";
import CustomizedDrinkForm from "./CustomizedDrinkForm.js";
import CustomizedDrinkList from "./CustomizedDrinkList.js";

const App = (props) => {
    return (
        <div className="react-container">
            <h1>DrinkMods</h1>
            <h3>Your favorite Starbucks drinks in one place.</h3>
            <hr></hr>
            <div className="drinks-list">
                <OfficialDrinkList />
                <CustomizedDrinkList />
            </div>
            <CustomizedDrinkForm />
        </div>
    );
}

export default App;