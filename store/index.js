import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import {rootReducer} from '../reducer'
import { rootSaga } from "../saga";

const sagaMiddleware = createSagaMiddleware()
const Store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(rootSaga);

export default Store