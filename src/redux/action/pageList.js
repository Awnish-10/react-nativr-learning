import axios from "axios";
import { GET_PAGE_LIST } from "../constants/page-constants";

export function setPageList(pageList) {
return {
type: GET_PAGE_LIST,
payload: pageList,
};
}
export function getPageList() {
return async (dispatch) => {
try {
const apiReq = await axios.get('http://13.234.186.76:3000/category')
 
// console.log('apiReq',apiReq.data);
await dispatch(setPageList(apiReq.data));
return apiReq || [];
} catch (error) {
console.error("apiReq error",error);
}
};
}
