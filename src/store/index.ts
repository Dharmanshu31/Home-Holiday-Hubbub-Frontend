import { Store, createStore } from "vuex";
import property from "./modules/property";
import user from "./modules/user";

const store: Store<any> = createStore({
  modules: {
    property,
    user,
  },
});

export default store;
