<template>
  <div
    class="tw-flex tw-justify-center tw-content-center tw-min-h-[750px] tw-items-center"
  >
    <div class="tw-flex tw-justify-center">
      <v-card class="tw-w-[400px] sm:tw-w-[500px] tw-h-[370px]">
        <v-form ref="form" @submit.prevent="resetPass">
          <div class="tw-m-8">
            <router-link to="/login"
              ><v-icon icon="mdi-arrow-left"></v-icon
            ></router-link>
            <v-card-title>
              <p>Reset Your Password</p>
            </v-card-title>
            <v-text-field
              v-model="password"
              name="password"
              label="New Password"
              :rules="[required, passwordRule]"
              class="tw-m-4"
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              :rules="[required, confirmPasswordRul]"
              type="text"
              class="tw-m-4"
            />
            <v-btn
              color="green"
              type="submit"
              :loading="loading"
              class="tw-mx-4"
              >Reset password</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRoute, useRouter } from "vue-router";

const password = ref();
const confirmPassword = ref();
const form = ref(null);
const loading = ref(false);

const route = useRoute();
const router = useRouter();
const store = useStore();
//reqired validation
const required = (value) => !!value || "Field is required !!";

//password validation
const passwordRule = (value) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
    value
  ) ||
  `Password must have at least 8 characters,including at least one number, one lowercase letter, one uppercase letter, and one special character`;

//confirmPass Validation
const confirmPasswordRul = (value) => {
  if (!password.value) {
    return true;
  }
  if (value === password.value) {
    return true;
  } else {
    return "Passwords do not match";
  }
};

//reset user password
const resetPass = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;
  const resetToken = route.params.token;
  const data = {
    newPass: password.value,
    confirmPass: confirmPassword.value,
    resetToken,
  };
  const res = await store.dispatch("resetPassword", data);
  if (res.status === 200) {
    toast.success("Password reset Success Full");
    router.replace("/login");
  } else if (res.response && res.response.status === 400) {
    toast.error(res.response.data.message);
  }
  loading.value = false;
};
</script>
