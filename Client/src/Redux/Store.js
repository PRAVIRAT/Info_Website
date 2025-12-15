import {configureStore} from "@reduxjs/toolkit";
import InfoReducer from "./InfoSlice";

const Store= configureStore({
    reducer: {
        info: InfoReducer
    }
});

export default Store;