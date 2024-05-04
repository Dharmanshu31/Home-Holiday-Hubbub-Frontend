import { Commit } from "vuex";
import axios from "../axios";

interface Count {
  propertys: [];
}

export default {
  state(): Count {
    return {
      propertys: [],
    };
  },
  mutations: {
    //set property
    getPoperty(state: Count, data: []) {
      state.propertys = data;
    },
  },
  actions: {
    //fetch all propertys
    async getProperty({ commit }: { commit: Commit }) {
      try {
        const response = await axios.get("property");
        commit("getPoperty", response.data.properties);
      } catch (err) {
        return err;
      }
    },
  },
};
