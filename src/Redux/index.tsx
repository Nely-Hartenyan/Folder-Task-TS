import {createStore} from "redux";

import {composeWithDevTools} from "redux-devtools-extension";
import {Reducer} from "./reducer";
import {DefaultStateType} from "../Components/Type/Type";

function saveToLocalStorage(state:DefaultStateType) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = createStore(Reducer, loadFromLocalStorage(),composeWithDevTools());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
