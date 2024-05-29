<template>
  <v-container>
    <v-app-bar color="#024950">
      <v-app-bar-title class="tw-max-w-fit" v-if="$vuetify.display.smAndDown"
        ><router-link to="/"
          ><img alt="HHH" src="../../../../webLogo.png" /></router-link
      ></v-app-bar-title>
      <v-app-bar-title class="tw-max-w-fit" v-else
        ><router-link to="/">Holiday Home Hubbub</router-link></v-app-bar-title
      >
      <!-- <v-app-bar-title v-else="$vuetify.display.smAndDown"
        ><router-link to="/"><img src="/home holiday hubbub.svg" /></router-link
      ></v-app-bar-title> -->
      <!-- <v-text-field
        v-model="search"
        type="search"
        name="Search"
        placeholder="Search the Home"
        append-inner-icon="mdi-magnify"
        variant="outlined"
        @input="onSearch"
        @click:append-inner="onClick"
        class="tw-my-auto tw-py-1 tw-mx-2 tw-w-48"
        rounded="pill"
      ></v-text-field> -->
      <v-spacer></v-spacer>
      <v-btn v-if="token && decode && decode.role !== 'user'">
        <router-link to="list-property">Become Host</router-link>
      </v-btn>
      <v-btn
        :prepend-icon="toggleDrawer ? 'mdi-menu-close' : 'mdi-menu'"
        class="drawer"
        @click="toggleDrawer = !toggleDrawer"
      >
        <v-avatar size="30">
          <v-img
            :src="`../../assets/users/${userData.photo || 'defualt.jpeg'}`"
          ></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="toggleDrawer"
      temporary
      location="right"
      style="height: max-content"
    >
      <v-list-item
        :prepend-avatar="`../../assets/users/${
          userData.photo || 'defualt.jpeg'
        }`"
        :title="userData.name || 'Guest'"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <router-link to="/" class="listHover">Home</router-link>
        </v-list-item>
        <v-list-item v-if="!token">
          <router-link class="listHover" to="/login">Login</router-link>
        </v-list-item>
        <v-list-item v-if="!token">
          <router-link class="listHover" to="/signUp">Sign Up</router-link>
        </v-list-item>
        <v-list-item>
          <router-link class="listHover" to="/property"
            >All Propertys</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role === 'landlord'">
          <router-link
            class="listHover"
            :to="{ path: 'property', query: { ownerId: decode.id } }"
            >Property</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode">
          <router-link class="listHover" :to="`/wish-list/${decode.id}`"
            >WishList</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role === 'landlord'">
          <router-link class="listHover" :to="`/reservations/${decode.id}`"
            >Reservation List</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role === 'admin'">
          <router-link class="listHover" :to="`/reservations/${decode.id}`"
            >Reservation List For Admin</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode">
          <router-link class="listHover" :to="`/trip-history/${decode.id}`"
            >Trip List</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role !== 'user'">
          <router-link class="listHover" to="/list-property"
            >Become A Host</router-link
          >
        </v-list-item>
        <v-list-item v-if="token">
          <router-link class="listHover" to="/userProfile">Profile</router-link>
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role === 'admin'">
          <router-link class="listHover" to="/admin">Admin Panel</router-link>
        </v-list-item>
        <v-list-item v-if="token">
          <span
            class="tw-text-pinkRed tw-cursor-pointer listHover"
            @click="logOut()"
            >Log Out</span
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const userData = ref();
const decode = ref(null);

//next 3 line for decode and store token value to VueX
const token = Cookies.get("token");
if (token) {
  decode.value = jwtDecode(token);
  store.commit("setUser", { id: decode.value.id, role: decode.value.role });
}
const getUser = async () => {
  const res = await store.dispatch("getUser");
  if (res && res.response && res.response.status === 401) {
    router.replace("/");
  }
};
userData.value = store.state.user.user;

const toggleDrawer = ref(false);

onMounted(() => {
  getUser();
});

const logOut = () => {
  store.commit("logOut");
  router.push("/");
  window.location.reload();
};
// const search = ref("");
// const onClick = () => {
//   console.log(search.value);
// };
// const onSearch = (e) => {
//   setTimeout(() => console.log(e.target.value), 2000);
// };
</script>

<style scoped>
:deep(.v-input__control) {
  margin-top: 1.5%;
  max-height: 45px;
}
.v-app-bar {
  background-color: #0fa4af;
}
:deep(
    .v-text-field .v-field--no-label input,
    .v-text-field .v-field--active input
  ) {
  padding-top: 7px;
}
:deep(.v-field__append-inner) {
  padding-bottom: 7px;
}

.drawer {
  background-color: white;
  border: 1px solid black;
  border-radius: 25px;
  color: black;
  width: 76px;
}

.listHover:hover {
  color: #024950;
  font-size: large;
}
</style>
