<template>
  <v-container fluid class="tw-flex tw-justify-center tw-items-center">
    <v-row>
      <v-col>
        <v-card rounded="lg" max-width="500" class="mx-auto pa-12 pb-8">
          <div class="tw-flex tw-justify-center tw-items-center">
            <img
              src="/home holiday hubbub.svg"
              alt="Logo"
              class="tw-w-14 tw-h-14"
            />
            <v-card-title class="headline tw-items-center tw-mt-3">
              SIGN UP
            </v-card-title>
          </div>
          <v-card-text class="mb">
            <v-form ref="form" @submit.prevent="submitForm">
              <CustomText
                v-model="formData.firstName"
                name="firstName"
                label="First Name"
                :rules="[required]"
                type="text"
              />
              <CustomText
                v-model="formData.lastName"
                name="lastName"
                label="Last Name"
                required
                :rules="[required]"
                type="text"
              ></CustomText>
              <CustomText
                v-model="formData.email"
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                required
                :rules="[required, emailRule]"
                type="email"
              ></CustomText>
              <CustomText
                v-model="formData.phone"
                name="phone"
                label="Phone"
                required
                :rules="[required, phone]"
                type="text"
              ></CustomText>
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

              <CustomText
                v-model="formData.confirmPassword"
                name="confirmPassword"
                label="confirmPassword"
                :rules="[required, confirmPasswordRul]"
                type="text"
              />
              <v-select
                v-model="formData.role"
                :items="['user', 'landlord']"
                label="User Role"
                outlined
                :rules="[required]"
                variant="underlined"
                class="tw-mt-3"
              ></v-select>
              <v-file-input
                v-model="formData.photo"
                name="photo"
                label="Photo"
                accept="image/*"
                variant="underlined"
                @change="previewImage"
                @click:clear="clearPhoto"
                prepend-icon="mdi-camera"
                class="tw-mt-3"
              >
              </v-file-input>
              <v-img
                v-if="previewUrl"
                :lazy-src="previewUrl"
                :src="previewUrl"
                class="mt-4 rounded-circle tw-mx-auto"
                cover
              >
              </v-img>
              <v-btn
                color="success"
                type="submit"
                :loading="loading"
                class="mt-4"
                block
                >SIGN UP</v-btn
              >
              <div class="tw-text-center tw-mt-6">
                <span>Already have an account? </span>
                <router-link
                  to="/login"
                  class="tw-text-blue-400 hover:tw-underline"
                  >Login</router-link
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
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const show = ref(false);
const loading = ref(false);
const form = ref(null);
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "",
  photo: null,
});
const store = useStore();

const previewUrl = ref(null);

//show priview image
const previewImage = (e) => {
  const file = e.target.files[0];
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewUrl.value = null;
  }
};

//clear priview Image
const clearPhoto = () => {
  formData.photo = null;
  previewUrl.value = null;
};

//reqired validation
const required = (value) => !!value || "Field is required !!";

//email validation
const emailRule = (value) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
  "Email must be a valid email address";

//phone validation
const phone = (value) =>
  /^\d{10}$/.test(value) || "Please enter a valid phone number";

//password validation
const passwordRule = (value) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
    value
  ) ||
  `Password must have at least 8 characters,including at least one number, one lowercase letter, one uppercase letter, and one special character`;

//confirmPass Validation
const confirmPasswordRul = (value) => {
  if (!formData.value.password) {
    return true;
  }
  if (value === formData.value.password) {
    return true;
  } else {
    return "Passwords do not match";
  }
};

//reset form

const reset = () => {
  formData.value = {};
  formData.value.photo = null;
  previewUrl.value = null;
  form.value.resetValidation();
};

//signUp user
const submitForm = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;
  let formDataObj = new FormData();
  formDataObj.append(
    "name",
    formData.value.firstName + " " + formData.value.lastName
  );
  formDataObj.append("email", formData.value.email);
  formDataObj.append("phone", formData.value.phone);
  formDataObj.append("password", formData.value.password);
  formDataObj.append("confirmPassword", formData.value.confirmPassword);
  formDataObj.append("role", formData.value.role);
  if (formData.value.photo) {
    formDataObj.append("photo", formData.value.photo);
  }
  const response = await store.dispatch("signUp", formDataObj);
  console.log(response);
  if (response.code && response.code === "ERR_NETWORK") {
    toast.error("Network Error!! try again letter");
  }
  if (response.response && response.response.status === 400) {
    toast.error(response.response.data.message);
  }
  loading.value = false;
  reset();
};
</script>

<style scoped>
.v-container {
  background-color: transparent;
  background-image: url("/assets/signUp.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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
.v-img {
  width: 150px;
  height: 150px;
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
