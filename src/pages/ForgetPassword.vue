<template>
  <div
    class="tw-flex tw-justify-center tw-content-center tw-min-h-[750px] tw-items-center"
  >
    <div class="tw-flex tw-justify-center">
      <v-card class="tw-w-[400px] sm:tw-w-[500px] tw-h-[300px]">
        <v-form ref="form" @submit.prevent="sendMail">
          <div class="tw-m-8">
            <router-link to="/login"
              ><v-icon icon="mdi-arrow-left"></v-icon
            ></router-link>
            <v-card-title>
              <p>Forget Password???</p>
              <p>Enter Your Register Email Hear</p>
            </v-card-title>
            <v-text-field
              v-model="email"
              name="email"
              label="Email Your Email"
              placeholder="johndoe@gmail.com"
              required
              :rules="[required, emailRule]"
              type="email"
              variant="outlined"
              class="tw-mt-5"
            ></v-text-field>
            <v-btn color="green" type="submit" :loading="loading"
              >send mail</v-btn
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

const email = ref();
const form = ref(null);
const loading = ref(false);

const store = useStore();
//reqired validation
const required = (value) => !!value || "Field is required !!";

//email validation
const emailRule = (value) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
  "Email must be a valid email address";

const sendMail = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;
  const res = await store.dispatch("forgetPassword", email.value);
  if (res.status === 201) {
    toast.success("mail is send to your gmail");
  } else if (res.response && res.response.status === 401) {
    toast.error("User Not Exist!!!");
  }
  loading.value = false;
};
</script>
