<template>
  <v-parallax class="tw-bg-footer">
    <div class="tw-mt-14">
      <v-slide-group class="tw-m-11">
        <v-slide-group-item>
          <v-card
            class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
            elevation="10"
          >
            <div class="tw-text-2xl tw-m-3 tw-text-blue-700">
              <v-icon icon="mdi-account-group"></v-icon>
            </div>
            <div class="tw-text-xl tw-font-bold tw-text-second">
              NUMBER'S OF USERS
            </div>
            <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
              {{ numOFUser }}
            </div>
          </v-card>
          <v-card
            class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
            elevation="10"
          >
            <div class="tw-text-2xl tw-m-3 tw-text-lime-800">
              <v-icon icon="mdi-shield-home"></v-icon>
            </div>
            <div class="tw-text-xl tw-font-bold tw-text-second">
              NUMBER'S OF PROPERTYS
            </div>
            <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
              {{ numOFPropertys }}
            </div>
          </v-card>
          <v-card
            class="bgGardiant tw-w-[300px] tw-h-44 tw-m-4 tw-text-center tw-content-center"
            elevation="10"
          >
            <div class="tw-text-2xl tw-m-3 tw-text-yellow-600">
              <v-icon icon="mdi-star"></v-icon>
            </div>
            <div class="tw-text-xl tw-font-bold tw-text-second">
              NUMBER'S OF REVIEWS
            </div>
            <div class="tw-text-2xl tw-mt-2 tw-text-teal-800 tw-font-extrabold">
              {{ numOFReviews }}
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <div class="tw-m-8">
        <div class="tw-m-5 tw-text-2xl tw-font-bold tw-text-center">
          All Users Information
        </div>
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          item-value="name"
          @update:options="loadItems"
        >
          <template v-slot:item.edit="{ item }">
            <v-icon
              @click="toggleShowUpdateDialog(item)"
              class="tw-m-2"
              color="green"
              icon="mdi-lead-pencil"
            ></v-icon>
            <v-icon
              @click="toggleShowDialog(item._id)"
              class="tw-m-2"
              color="red"
              icon="mdi-trash-can"
            ></v-icon>
            <v-dialog v-model="showDialog" max-width="500px">
              <v-card>
                <v-card-title class="headline">Confirm Delete</v-card-title>
                <v-card-text>
                  Are you sure you want to delete this User?
                </v-card-text>
                <v-card-actions>
                  <v-btn color="red" variant="text" @click="showDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    :loading="loadingBtn"
                    color="red"
                    variant="text"
                    @click="deleteUser()"
                    >Delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="showUpdateDialog" max-width="500px">
              <v-card>
                <v-card-title class="headline">Update User</v-card-title>
                <v-card-text>
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
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    v-model="phone"
                    name="phone"
                    label="Phone"
                    required
                    type="text"
                  ></v-text-field>
                  <v-select
                    v-model="updateRole"
                    label="Role"
                    :items="['user', 'admin', 'landlord']"
                    required
                  >
                  </v-select>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="red"
                    variant="text"
                    @click="showUpdateDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    :loading="loadingBtn"
                    color="red"
                    variant="text"
                    @click="editUser()"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:tfoot>
            <tr>
              <td>
                <v-text-field
                  v-model="search"
                  class="tw-m-5"
                  density="compact"
                  placeholder="Search name..."
                  hide-details
                ></v-text-field>
              </td>
              <td>
                <v-select
                  v-model="role"
                  class="tw-w-32"
                  label="Role"
                  density="compact"
                  hide-details
                  variant="outlined"
                  :items="['user', 'landlord', 'admin']"
                ></v-select>
              </td>
            </tr>
          </template>
        </v-data-table-server>
      </div>
    </div>
  </v-parallax>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "../store/axios.ts";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const loadingBtn = ref(false);
const numOFPropertys = ref(0);
const numOFUser = ref(0);
const numOFReviews = ref(0);
const store = useStore();
const itemsPerPage = ref(10);
const search = ref("");
const serverItems = ref([]);
const loading = ref(true);
const showDialog = ref(false);
const showUpdateDialog = ref(false);
const totalItems = ref(0);
const role = ref();
const first = ref();
const last = ref();
const email = ref();
const phone = ref();
const updateRole = ref();
const id = ref();
const headers = ref([
  {
    title: "Name",
    align: "start",
    key: "name",
  },
  { title: "Role", key: "role", align: "end" },
  { title: "Email", key: "email", align: "center" },
  { title: "Phone", key: "phone", align: "center" },
  { title: "Edit", key: "edit", align: "center", sortable: false },
]);

const fatchUser = async (query) => {
  const res = await store.dispatch("getUserByAdmin", query);
  serverItems.value = res;
  totalItems.value = res.length;
};
const query = {};
const loadItems = ({ page, itemsPerPage, sortBy, search }) => {
  loading.value = true;
  query.page = page;
  query.limit = itemsPerPage;
  if (sortBy.length > 0) {
    if (sortBy[0].order === "asc") {
      query.sort = sortBy[0].key;
    } else if (sortBy[0].order === "desc") {
      query.sort = "-" + sortBy[0].key;
    }
  }
  if (search === "") {
    delete query.keyword;
  } else {
    query.keyword = search;
  }

  fatchUser(query);
  loading.value = false;
};
watch(role, () => {
  query.role = role.value;
  fatchUser(query);
});
const token = Cookies.get("token");
const fatchNumberOfUsers = async () => {
  const res = await axios.get("user/admin/numberOfUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  numOFUser.value = res.data;
};
const fatchNumberOfPropertys = async () => {
  const res = await axios.get("property/admin/numberOfProperty", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  numOFPropertys.value = res.data;
};
const fatchNumberOfRveiws = async () => {
  const res = await axios.get("property/review/admin/numberOfReviews", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  numOFReviews.value = res.data;
};

const toggleShowDialog = (userId) => {
  id.value = userId;
  showDialog.value = !showDialog.value;
};

const toggleShowUpdateDialog = (user) => {
  showUpdateDialog.value = !showUpdateDialog.value;
  first.value = user.name.split(" ")[0];
  last.value = user.name.split(" ")[1];
  email.value = user.email;
  phone.value = user.phone;
  updateRole.value = user.role;
  id.value = user._id;
};

const editUser = async () => {
  const user = {
    name: first.value + " " + last.value,
    email: email.value,
    phone: phone.value,
    role: updateRole.value,
  };
  loadingBtn.value = true;
  try {
    const res = await axios.patch(`user/admin/${id.value}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      showUpdateDialog.value = false;
      toast.success("User Update Successfully");
    }
  } catch (err) {
    if (err && err.response && err.response.message) {
      toast.error("Somthing Wents Wrong Try Again Letter");
    }
  }
  loadingBtn.value = false;
};

const deleteUser = async () => {
  loadingBtn.value = true;
  try {
    const res = await axios.delete(`user/admin/${id.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data === "") {
      showDialog.value = false;
      toast.success("User Deleted Successfully");
    }
  } catch (err) {
    if (err && err.response && err.response.message) {
      toast.error("Somthing Wents Wrong Try Again Letter");
    }
  }
  loadingBtn.value = false;
};

onMounted(() => {
  fatchNumberOfUsers();
  fatchNumberOfPropertys();
  fatchNumberOfRveiws();
});
</script>

<style scoped>
.bgGardiant {
  background: linear-gradient(to top right, #c1c1c1, gray, #c1c1c1);
}
</style>
