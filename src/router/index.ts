import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import store from "../store";

const token = Cookies.get("token");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/HomePage.vue"),
    },
    {
      path: "/property",
      component: () => import("../pages/PropertyPage.vue"),
    },
    {
      path: "/property/:propertyId",
      component: () => import("../pages/PropertyDetailPage.vue"),
    },
    {
      name: "listProperty",
      path: "/list-property",
      component: () => import("../pages/PropertyListingPage.vue"),
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
      component: () => import("../pages/PropertyHistoryPage.vue"),
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
      component: () => import("../pages/WishListPage.vue"),
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
      component: () => import("../pages/ReservationPage.vue"),
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
      component: () => import("../pages/LoginPage.vue"),
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
      component: () => import("../pages/SignUpPage.vue"),
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
      component: () => import("../pages/UserProfile.vue"),
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
      component: () => import("../pages/AdminPanal.vue"),
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
      component: () => import("../pages/ForgetPassword.vue"),
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
      component: () => import("../pages/ResetPassword.vue"),
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
      component: () => import("../pages/AboutUs.vue"),
    },
    { path: "/notFound", component: () => import("../pages/NotFound.vue") },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else return { left: 0, top: 0 };
  },
});
