<template>
  <div class="tw-mt-20">
    <div class="tw-flex tw-justify-center tw-text-center">
      <v-card class="tw-min-w-[400px] tw-min-h-[640px]" elevation="15">
        <div class="tw-flex tw-justify-center tw-h-[85%]">
          <div>
            <v-avatar size="150" class="tw-mt-4">
              <v-img
                v-if="userData"
                :src="`../../assets/users/${userData.photo}`"
              ></v-img>
              <!-- <v-icon icon="mdi-arrow-up"></v-icon> -->
            </v-avatar>
            <div class="tw-text-center">
              <p class="tw-mt-4 tw-font-bold tw-text-lg" v-if="userData">
                {{ userData.name }}
              </p>
              <p class="tw-mt-2 tw-font-bold tw-text-lg tw-mb-5">
                Login As <span class="tw-text-four">{{ role }}</span>
              </p>
              <v-form ref="form" @submit.prevent="updateUser">
                <v-text-field
                  v-model="first"
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                <v-text-field
                  v-model="last"
                  name="lastName"
                  label="Last Name"
                  required
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  name="email"
                  label="Email"
                  required
                  :rules="[emailRule]"
                  type="email"
                ></v-text-field>
                <v-text-field
                  v-model="phone"
                  name="phone"
                  label="Phone"
                  required
                  :rules="[phoneRule]"
                  type="text"
                ></v-text-field>
                <div class="tw-mt-3">
                  <v-btn
                    color="red"
                    class="tw-mr-9"
                    append-icon="mdi-trash-can"
                    @click="showDialog = true"
                    >Delete</v-btn
                  >
                  <v-btn type="submit" color="green" append-icon="mdi-pencil"
                    >Update</v-btn
                  >
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text> Are you sure you want to delete this user? </v-card-text>
      <v-card-actions>
        <v-btn color="red" variant="text" @click="showDialog = false"
          >Cancel</v-btn
        >
        <v-btn color="red" variant="text" @click="deleteUser">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "../store/axios";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useStore();
const router = useRouter();
const userData = ref();
const form = ref();
const role = ref("");
const first = ref("");
const last = ref("");
const email = ref("");
const phone = ref("");
const showDialog = ref(false);

//email validation
const emailRule = (value) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
  "Email must be a valid email address";

//phone validation
const phoneRule = (value) =>
  /^\d{10}$/.test(value) || "Please enter a valid phone number";

const getUser = async () => {
  const res = await store.dispatch("getUser");
  if (res && res.response && res.response.status === 401) {
    router.replace("/");
  }
};
userData.value = store.state.user.user;
role.value = store.state.user.role;

onMounted(() => {
  getUser();
});

watch(userData.value, () => {
  first.value = userData.value.name.split(" ")[0];
  last.value = userData.value.name.split(" ")[1];
  email.value = userData.value.email;
  phone.value = userData.value.phone;
});
const token = Cookies.get("token");

const deleteUser = async () => {
  try {
    const res = await axios.delete("user/deleteMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 204) {
      store.commit("logOut");
      showDialog.value = false;
      router.replace("/");
    }
  } catch (err) {
    if (err.response && err.response.data) {
      toast.error("Somthing wents Wrong Try Again latter");
    }
  }
};

const updateUser = async () => {
  if (!(await form.value.validate()).valid) return;
  const formData = new FormData();
  let hasChanged = false;
  if (
    first.value !== userData.value.name.split(" ")[0] ||
    last.value !== userData.value.name.split(" ")[1]
  ) {
    formData.append("name", first.value + " " + last.value);
    hasChanged = true;
  }
  if (email.value !== userData.value.email) {
    formData.append("email", email.value);
    hasChanged = true;
  }
  if (phone.value !== userData.value.phone) {
    formData.append("phone", phone.value);
    hasChanged = true;
  }
  if (hasChanged) {
    try {
      const res = await axios.patch("user/updateMe", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("User Updated Successfuly");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error("Somthing wents Wrong Try Again latter");
      }
    }
  }
};
</script>
