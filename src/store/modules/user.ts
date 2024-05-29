import Cookies from "js-cookie";
import { router } from "../../router";
import axios from "../axios";
import { ActionContext, Commit } from "vuex";
const token = Cookies.get("token");

interface formDataObj {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  photo: string;
}
interface State {
  id: string;
  role: string;
  user: User;
}
interface User {
  name: string;
  email: string;
  photo: string;
  phone: string;
}

interface Decode {
  id: string;
  role: string;
}

export default {
  state(): State {
    return {
      id: "",
      role: "",
      user: {
        name: "",
        email: "",
        photo: "",
        phone: "",
      },
    };
  },
  mutations: {
    //set user details
    setUser(state: State, decode: Decode) {
      state.id = decode.id;
      state.role = decode.role;
    },

    //logOut user
    logOut(state: State) {
      state.id = "";
      state.role = "";
      state.user = {
        name: "",
        email: "",
        photo: "",
        phone: "",
      };
      Cookies.remove("token");
      router.replace("/");
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
    async login(_, loginData: { email: string; password: string }) {
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

    //get me function
    async getUser(context: ActionContext<State, Commit>) {
      try {
        if (token) {
          const response = await axios.get("user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          context.state.user.name = response.data.name;
          context.state.user.email = response.data.email;
          context.state.user.photo = response.data.photo;
          context.state.user.phone = response.data.phone;
        }
      } catch (err) {
        return err;
      }
    },

    //get all usre for admin
    async getUserByAdmin(_, query: {}) {
      try {
        if (token) {
          const response = await axios.get("user/admin", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: query,
          });
          return response.data;
        }
      } catch (err) {
        return err;
      }
    },

    //forget password
    async forgetPassword(_, email: string) {
      try {
        const response = await axios.post("auth/forgetPassword", { email });
        return response;
      } catch (err) {
        return err;
      }
    },

    //resetPassword
    async resetPassword(
      _,
      {
        newPass,
        confirmPass,
        resetToken,
      }: { newPass: string; confirmPass: string; resetToken: string }
    ) {
      try {
        const response = await axios.patch(`auth/resetPassword/${resetToken}`, {
          password: newPass,
          confirmPassword: confirmPass,
        });
        return response;
      } catch (err) {
        return err;
      }
    },

    //update password
    async updatePassword(_, data) {
      try {
        if (token) {
          const response = await axios.patch("user/updatePassword", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response;
        }
      } catch (err) {
        return err;
      }
    },
  },
};
