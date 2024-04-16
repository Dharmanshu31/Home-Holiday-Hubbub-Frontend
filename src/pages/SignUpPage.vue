<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card rounded="lg" max-width="500" class="mx-auto pa-12 pb-8">
          <v-card-title class="headline"> SIGN UP </v-card-title>
          <v-card-text class="mb">
            <v-form @submit.prevent="submitForm">
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
              <v-text-field
                v-model="formData.password"
                name="password"
                label="Password"
                :rules="[required, passwordRule]"
                :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="show = !show"
                :type="show ? 'text' : 'password'"
                variant="underlined"
                error-color="white"
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
                :items="['User', 'Landlord']"
                label="User Role"
                outlined
                :rules="[required]"
                variant="underlined"
              ></v-select>
              <v-file-input
                v-model="formData.photo"
                name="photo"
                label="Photo"
                accept="image/*"
                variant="underlined"
                @change="previewImage"
                @click:clear="clearPhoto"
              >
              </v-file-input>
              <v-img
                v-if="previewUrl"
                :src="previewUrl"
                class="mt-4"
                max-height="200"
                contain
              ></v-img>
              <v-btn
                color="success"
                type="submit"
                :disabled="!formValid"
                :loading="loading"
                class="mt-4"
                block
                >SIGN UP</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import CustomText from "../components/CustomText.vue";
const show = ref(false);
const loading = ref(false);
const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  photo: null,
});
const formValid = computed(() => {
  return (
    !!formData.value.firstName &&
    !!formData.value.lastName &&
    !!formData.value.email &&
    !!formData.value.password &&
    !!formData.value.confirmPassword &&
    !!formData.value.role &&
    formData.value.password === formData.value.confirmPassword
  );
});

const previewUrl = ref(null);
const previewImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewUrl.value = null;
  }
  formData.photo = null;
};
const clearPhoto = () => {
  formData.value.photo = null;
  previewUrl.value = null;
};
const required = (value) => !!value || "Field is required !!";
const emailRule = (value) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
  "Email must be a valid email address";
const passwordRule = (value) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
    value
  ) ||
  `Password must have at least 8 characters,including at least one number, one lowercase letter, one uppercase letter, and one special character`;
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
const submitForm = () => {
  if (!formValid) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 1000);
  console.log(formData.value);
};
</script>

<style scoped>
.v-container {
  background-color: transparent;
  background-image: url("/assets/signUp.jpg");
  background-size: cover;
  padding: 24px;
  color: white;
}
.v-card {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 24px;
}
</style>
