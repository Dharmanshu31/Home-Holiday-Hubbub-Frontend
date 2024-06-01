<template>
  <v-container>
    <v-app-bar color="#024950">
      <div class="tw-flex tw-items-center tw-min-w-full tw-justify-between">
        <div>
          <v-app-bar-title
            class="tw-max-w-fit"
            v-if="$vuetify.display.smAndDown"
            ><router-link to="/"
              ><img alt="HHH" src="../../../../webLogo.png" /></router-link
          ></v-app-bar-title>
          <v-app-bar-title class="tw-max-w-fit" v-else
            ><router-link to="/" class="title"
              >Holiday Home Hubbub</router-link
            ></v-app-bar-title
          >
        </div>

        <div>
          <ul class="tw-flex">
            <li class="nav" v-if="$vuetify.display.smAndUp">
              <router-link to="/" class="navHover">Home</router-link>
            </li>
            <li class="nav" v-if="$vuetify.display.smAndUp">
              <router-link class="navHover" to="/property"
                >All Propertys</router-link
              >
            </li>
            <li class="nav" v-if="$vuetify.display.smAndUp">
              <router-link
                class="navHover"
                :to="token && decode ? `/trip-history/${decode.id}` : '/login'"
                >History</router-link
              >
            </li>
            <li
              class="nav"
              v-if="
                token &&
                decode &&
                decode.role !== 'user' &&
                $vuetify.display.smAndUp
              "
            >
              <router-link class="navHover" to="/list-property"
                >Add Property</router-link
              >
            </li>
          </ul>
        </div>

        <div>
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
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="toggleDrawer"
      temporary
      location="right"
      style="height: max-content"
    >
      <router-link to="/userProfile">
        <v-list-item
          :prepend-avatar="`../../assets/users/${
            userData.photo || 'defualt.jpeg'
          }`"
          :title="userData.name || 'Guest'"
        ></v-list-item
      ></router-link>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-if="$vuetify.display.smAndDown">
          <router-link to="/" class="listHover">Home</router-link>
        </v-list-item>
        <v-list-item v-if="!token">
          <router-link class="listHover" to="/login">Login</router-link>
        </v-list-item>
        <v-list-item v-if="!token">
          <router-link class="listHover" to="/signUp">Sign Up</router-link>
        </v-list-item>
        <v-list-item v-if="$vuetify.display.smAndDown">
          <router-link class="listHover" to="/property"
            >All Propertys</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role !== 'user'">
          <router-link
            class="listHover"
            :to="{ path: '/property', query: { ownerId: decode.id } }"
            >My Property</router-link
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
        <v-list-item v-if="token && decode && $vuetify.display.smAndDown">
          <router-link class="listHover" :to="`/trip-history/${decode.id}`"
            >History</router-link
          >
        </v-list-item>
        <v-list-item v-if="token && decode && decode.role !== 'user'">
          <router-link class="listHover" to="/list-property"
            >Add Property</router-link
          >
        </v-list-item>
        <hr v-if="token && decode && decode.role !== 'user'" />
        <v-list-item v-if="token && decode">
          <router-link class="listHover" :to="`/wish-list/${decode.id}`"
            >WishList</router-link
          >
        </v-list-item>
        <v-list-item v-if="token">
          <router-link class="listHover" to="/userProfile">Profile</router-link>
        </v-list-item>
        <hr v-if="token && decode && decode.role === 'admin'" />
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

//get current user
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
.nav {
  margin-left: 14px;
  margin-right: 14px;
}
.navHover:hover {
  border-bottom: 3px solid white;
  border-bottom-left-radius: 6%;
  border-bottom-right-radius: 6%;
  font-size: 18px;
}
/* .router-link-active {
  text-decoration: underline;
} */
.router-link-exact-active {
  border-bottom: 3px solid white;
  border-bottom-left-radius: 6%;
  border-bottom-right-radius: 6%;
}
.title {
  border: none;
}
hr {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  border-style: inset;
  border-width: 1px;
}
</style>
