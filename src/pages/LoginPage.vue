<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card rounded="lg" max-width="500" class="mx-auto pa-12">
          <div class="tw-flex tw-justify-center">
            <img
              src="/home holiday hubbub.svg"
              alt="Logo"
              class="tw-w-14 tw-h-14"
            />
            <v-card-title class="font"> Login </v-card-title>
          </div>
          <v-card-text>
            <v-form ref="form" @submit.prevent="login">
              <CustomText
                v-model="formData.email"
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                required
                :rules="[required, emailRule]"
                type="email"
              />
              <v-text-field
                v-model="formData.password"
                name="password"
                label="Password"
                :rules="[required, passwordRule]"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="show = !show"
                :type="show ? 'text' : 'password'"
                variant="underlined"
                class="tw-mt-3"
              ></v-text-field>
              <div class="tw-flex tw-justify-end">
                <router-link to="/login" class="hover:tw-underline"
                  >forgetPassword??</router-link
                >
              </div>
              <v-btn
                color="success"
                type="submit"
                :loading="loading"
                class="mt-4"
                block
                >Login</v-btn
              >
              <div class="tw-text-center tw-mt-6">
                <span>Don't have an account? </span>
                <router-link
                  to="/signUp"
                  class="tw-text-blue-300 hover:tw-underline"
                  >Sign Up</router-link
                >
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import CustomText from "../components/CustomText.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";

const show = ref(false);
const loading = ref(false);
const form = ref(null);
const formData = ref({
  email: "",
  password: "",
});
const store = useStore();

//reqired validation
const required = (value) => !!value || "Field is required !!";

const emailRule = (value) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
  "Email must be a valid email address";

//password validation
const passwordRule = (value) =>
  (value && value.length >= 8) || "Password must be at least 8 characters long";

//reset form

const reset = () => {
  form.value.reset();
};

//login user
const login = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;
  store.dispatch("login", {
    email: formData.value.email,
    password: formData.value.password,
  });
  loading.value = false;
  reset();
};
</script>

<style scoped>
.v-container {
  background-color: transparent;
  background-image: url("/assets/login.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  min-height: 100vh;
}
.v-card {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 24px;
  max-width: 100%;
}
.v-card-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
}
.v-card-title,
.v-text-field {
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
}
:deep(
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active
  ) {
  transition: background-color 5000s;
  -webkit-text-fill-color: #fff !important;
}
:deep(.v-text-field .v-messages__message) {
  color: rgb(255, 255, 255);
}
</style>
