import store from "./store/index";
import { addUser } from "./actions/index";

window.store = store;
window.addUser = addUser;