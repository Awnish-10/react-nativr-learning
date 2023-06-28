import { GET_PAGE_LIST } from "../constants/page-constants";

const initialState = {
pageList: []
};
const pageListReducer = (state = initialState, action) => {
switch(action.type) {
case GET_PAGE_LIST:
return {
...state,
pageList: action.payload
};
default:
return state;
}
}
export default pageListReducer;