import Cookies from "js-cookie";
import { router } from "../../router";
import axios from "../axios";

interface formDataObj {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  photo: string;
}
interface State {
  isLogin: boolean;
}

export default {
  state(): State {
    return {
      isLogin: false,
    };
  },
  mutations: {},
  actions: {
    async signUp(_, formDataObj: formDataObj) {
      try {
        const response = await axios.post("auth/signUp", formDataObj);
        if (response.status === 201) {
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async login(_, loginData: { email: string; password: string }) {
      try {
        const response = await axios.post("auth/login", loginData);
        if (response.status === 201) {
          Cookies.set("token", response.data.token);
          router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
