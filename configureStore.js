import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import countReducer from './src/redux/reducers/countReducer';
import pageListReducer from './src/redux/reducers/pageListReducer';
const rootReducer = combineReducers(
{ pageList: pageListReducer ,
count: countReducer}
);
const configureStore = () => {
return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;