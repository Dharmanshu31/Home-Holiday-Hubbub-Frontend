import { Store, createStore } from "vuex";
import property from "./modules/property";
import user from "./modules/user";

//index of vux store
const store: Store<any> = createStore({
  modules: {
    property,
    user,
  },
});

export default store;
