import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import PropertyPage from "../pages/PropertyPage.vue";
import PropertyDetailPage from "../pages/PropertyDetailPage.vue";
import PropertyListingPage from "../pages/PropertyListingPage.vue";
import PropertyHistoryPage from "../pages/PropertyHistoryPage.vue";
import WishListPage from "../pages/WishListPage.vue";
import ReservationPage from "../pages/ReservationPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import NotFound from "../pages/NotFound.vue";
import UserProfile from "../pages/UserProfile.vue";
import AdminPanal from "../pages/AdminPanal.vue";
import ForgetPassword from "../pages/ForgetPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import AboutUs from "../pages/AboutUs.vue";

import Cookies from "js-cookie";
import store from "../store";

const token = Cookies.get("token");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/property",
      component: PropertyPage,
    },
    {
      path: "/property/:propertyId",
      component: PropertyDetailPage,
    },
    {
      name: "listProperty",
      path: "/list-property",
      component: PropertyListingPage,
      beforeEnter(_, _2, next) {
        if (token && store.state.user.role !== "user") {
          return next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/trip-history/:userId",
      component: PropertyHistoryPage,
      beforeEnter(_, _2, next) {
        if (!token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/wish-list/:userId",
      component: WishListPage,
      beforeEnter(_, _2, next) {
        if (!token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/reservations/:ownerId",
      component: ReservationPage,
      beforeEnter(_, _2, next) {
        if (token && store.state.user.role !== "user") {
          return next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/login",
      component: LoginPage,
      beforeEnter(_, _2, next) {
        if (token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/signUp",
      component: SignUpPage,
      beforeEnter(_, _2, next) {
        if (token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/userProfile",
      component: UserProfile,
      beforeEnter(_, _2, next) {
        if (!token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/admin",
      component: AdminPanal,
      beforeEnter(_, _2, next) {
        if (token && store.state.user.role === "admin") {
          return next();
        } else {
          next("/");
        }
      },
    },
    {
      path: "/forgetPassword",
      component: ForgetPassword,
      beforeEnter(_, _2, next) {
        if (token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/resetPassword/:token",
      component: ResetPassword,
      beforeEnter(_, _2, next) {
        if (token) {
          return next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/about-us",
      component: AboutUs,
    },
    { path: "/notFound", component: NotFound },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else return { left: 0, top: 0 };
  },
});
