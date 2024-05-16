import Cookies from "js-cookie";
import { router } from "../../router";
import axios from "../axios";
import { ActionContext, Commit } from "vuex";

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
  id: string;
  role: string;
  user: User;
}
interface User {
  name: string;
  email: string;
  photo: string;
}

interface Decode {
  id: string;
  role: string;
}

export default {
  state(): State {
    return {
      isLogin: false,
      id: "",
      role: "",
      user: {
        name: "",
        email: "",
        photo: "",
      },
    };
  },
  mutations: {
    //set user details
    setUser(state: State, decode: Decode) {
      state.id = decode.id;
      state.role = decode.role;
      state.isLogin = true;
    },

    //logOut user
    logOut(state: State) {
      state.isLogin = false;
      state.id = "";
      state.role = "";
      Cookies.remove("token");
    },
  },
  actions: {
    //signIn User
    async signUp(_, formDataObj: formDataObj) {
      try {
        const response = await axios.post("auth/signUp", formDataObj);
        if (response.status === 201) {
          router.push("/login");
        }
        return response;
      } catch (err) {
        return err;
      }
    },

    //login user
    async login(_,loginData: { email: string; password: string }) {
      try {
        const response = await axios.post("auth/login", loginData);
        if (response.status === 201) {
          Cookies.set("token", response.data.token, { expires: 30 });
        }
        return response;
      } catch (err) {
        return err;
      }
    },
    async getUser(context: ActionContext<State, Commit>) {
      const token = Cookies.get("token");
      const response = await axios("user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      context.state.user.name = response.data.name;
      context.state.user.email = response.data.email;
      context.state.user.photo = response.data.photo;
    },
  },
};
