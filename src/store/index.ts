import { Store, createStore } from "vuex";
import property from "./modules/property";

const store: Store<any> = createStore({
  modules: {
    property,
  },
});

export default store;
