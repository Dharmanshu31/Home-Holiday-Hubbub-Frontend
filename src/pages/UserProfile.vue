<template>
  <div class="tw-mt-20 tw-mb-5">
    <v-slide-group
      class="tw-m-11"
      v-if="role !== 'user' && $vuetify.display.smAndDown"
    >
      <v-slide-group-item>
        <v-card
          class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
          elevation="10"
        >
          <div class="tw-text-2xl tw-m-3 tw-text-green-900">
            <v-icon icon="mdi-cash"></v-icon>
          </div>
          <div class="tw-text-xl tw-font-bold tw-text-second">
            Earning Per Month
          </div>
          <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
            &#x20B9; {{ perMonth }}
          </div>
        </v-card>
        <v-card
          class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
          elevation="10"
        >
          <div class="tw-text-2xl tw-m-3 tw-text-green-900">
            <v-icon icon="mdi-cash-multiple"></v-icon>
          </div>
          <div class="tw-text-xl tw-font-bold tw-text-second">
            Earning Per Year
          </div>
          <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
            &#x20B9; {{ perYear }}
          </div>
        </v-card>
        <v-card
          class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
          elevation="10"
        >
          <div class="tw-text-2xl tw-m-3 tw-text-green-900">
            <v-icon icon="mdi-bag-checked"></v-icon>
          </div>
          <div class="tw-text-xl tw-font-bold tw-text-second">
            Earning Of lifeTime
          </div>
          <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
            &#x20B9; {{ lifeTime }}
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <div class="tw-flex tw-justify-center" v-if="$vuetify.display.mdAndUp">
      <v-card
        class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
        elevation="10"
      >
        <div class="tw-text-2xl tw-m-3 tw-text-green-900">
          <v-icon icon="mdi-cash"></v-icon>
        </div>
        <div class="tw-text-xl tw-font-bold tw-text-second">
          Earning Per Month
        </div>
        <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
          &#x20B9; {{ perMonth }}
        </div>
      </v-card>
      <v-card
        class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
        elevation="10"
      >
        <div class="tw-text-2xl tw-m-3 tw-text-green-900">
          <v-icon icon="mdi-cash-multiple"></v-icon>
        </div>
        <div class="tw-text-xl tw-font-bold tw-text-second">
          Earning Per Year
        </div>
        <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
          &#x20B9; {{ perYear }}
        </div>
      </v-card>
      <v-card
        class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
        elevation="10"
      >
        <div class="tw-text-2xl tw-m-3 tw-text-green-900">
          <v-icon icon="mdi-bag-checked"></v-icon>
        </div>
        <div class="tw-text-xl tw-font-bold tw-text-second">
          Earning Of lifeTime
        </div>
        <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
          &#x20B9; {{ lifeTime }}
        </div>
      </v-card>
    </div>

    <div class="tw-flex tw-justify-center tw-text-center">
      <v-card class="tw-min-w-[400px] tw-min-h-[640px]" elevation="15">
        <div class="tw-flex tw-justify-center tw-h-[85%]">
          <div>
            <v-avatar size="150" class="tw-mt-4">
              <v-img
                v-if="userData"
                :src="
                  previewProfileImg
                    ? previewProfileImg
                    : `../../assets/users/${userData.photo}`
                "
              ></v-img>
            </v-avatar>
            <label for="profileImage">
              <v-badge icon="mdi-lead-pencil" class="tw-cursor-pointer">
                <input
                  id="profileImage"
                  type="file"
                  class="tw-hidden"
                  @change="profileImage"
                />
              </v-badge>
            </label>
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
                  <v-btn
                    :loading="loading"
                    type="submit"
                    color="green"
                    append-icon="mdi-pencil"
                    >Update</v-btn
                  >
                </div>
              </v-form>
              <p
                class="tw-float-right tw-my-4 hover:tw-text-blue-600 hover:tw-underline tw-cursor-pointer"
                @click="updateDialog = !updateDialog"
              >
                update password
              </p>
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
        <v-btn :loading="loading" color="red" variant="text" @click="deleteUser"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="updateDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Update Password</v-card-title>
      <v-form ref="updateForm" @submit.prevent="updatepassword">
        <v-card-text>
          <div class="tw-m-8">
            <v-text-field
              v-model="currentPass"
              name="current Password"
              label="Current Password"
              class="tw-m-4"
              :rules="[required]"
            ></v-text-field>

            <v-text-field
              v-model="newPass"
              name="password"
              label="New Password"
              class="tw-m-4"
              :rules="[required, passwordRule]"
            ></v-text-field>

            <v-text-field
              v-model="confirmPass"
              name="confirmPassword"
              label="confirmPassword"
              type="text"
              class="tw-m-4"
              :rules="[required, confirmPasswordRul]"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red"
            variant="text"
            @click="updateDialog = !updateDialog"
            >Cancel</v-btn
          >
          <v-btn :loading="loading" color="green" variant="text" type="submit"
            >Update password</v-btn
          >
        </v-card-actions>
      </v-form>
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

const currentPass = ref();
const newPass = ref();
const confirmPass = ref();
const updateDialog = ref(false);
const loading = ref(false);
const userData = ref();
const form = ref();
const updateForm = ref(null);
const role = ref("");
const first = ref("");
const last = ref("");
const email = ref("");
const phone = ref("");
const showDialog = ref(false);
const updateProfileImg = ref(null);
const previewProfileImg = ref(null);
const perMonth = ref(0);
const perYear = ref(0);
const lifeTime = ref(0);

const profileImage = (e) => {
  const file = e.target.files[0];
  updateProfileImg.value = file;
  if (file) {
    const render = new FileReader();
    render.onload = (e) => {
      previewProfileImg.value = e.target.result;
    };
    render.readAsDataURL(file);
  }
};

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
  first.value = store.state.user.user.name.split(" ")[0];
  last.value = store.state.user.user.name.split(" ")[1];
  email.value = store.state.user.user.email;
  phone.value = store.state.user.user.phone;
  role.value = store.state.user.role;
});

watch(userData.value, () => {
  first.value = userData.value.name.split(" ")[0];
  last.value = userData.value.name.split(" ")[1];
  email.value = userData.value.email;
  phone.value = userData.value.phone;
});
const token = Cookies.get("token");

const deleteUser = async () => {
  loading.value = true;
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
  loading.value = false;
};

const updateUser = async () => {
  if (!(await form.value.validate()).valid) return;
  loading.value = true;
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
  if (updateProfileImg.value) {
    formData.append("photo", updateProfileImg.value);
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
  loading.value = false;
};
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
  if (!newPass.value) {
    return true;
  }
  if (value === newPass.value) {
    return true;
  } else {
    return "Passwords do not match";
  }
};
const updatepassword = async () => {
  if (!(await updateForm.value.validate()).valid) return;
  loading.value = true;
  const data = {
    currentPassword: currentPass.value,
    password: newPass.value,
    confirmPassword: confirmPass.value,
  };
  const res = await store.dispatch("updatePassword", data);
  if (res.status === 200) {
    updateDialog.value = false;
    toast.success("password Update Successfully");
  } else if (res.response) {
    toast.error("Incorrect Current Password");
  }
  loading.value = false;
};

//owner earning
const totalEarning = async () => {
  try {
    const res = await axios.get(
      `booking/owner/${store.state.user.id}/earning`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      perMonth.value = res.data.currentMonth;
      perYear.value = res.data.currentYear;
      lifeTime.value = res.data.lifetime;
    }
  } catch (err) {
    if (err.response && err.response.data) {
      toast.error("Somthing wents Wrong Try Again latter");
    }
  }
};

onMounted(() => {
  if (role.value !== "user") {
    totalEarning();
  }
});
</script>

<style scoped>
.bgGardiant {
  background: linear-gradient(to top right, #c1c1c1, gray, #c1c1c1);
}
</style>
