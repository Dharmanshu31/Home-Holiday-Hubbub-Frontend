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
      // children: [{ path: ":propertyId", component: PropertyDetailPage }],
    },
    {
      path: "/property/::propertyId",
      component: PropertyDetailPage,
    },
    { path: "/list-property", component: PropertyListingPage },
    { path: "/trip-history/:userId", component: PropertyHistoryPage },
    { path: "/wish-list/:userId", component: WishListPage },
    { path: "/reservations/:ownerId", component: ReservationPage },
    { path: "/login", component: LoginPage },
    { path: "/signUp", component: SignUpPage },
    { path: "/notFound", component: NotFound },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});
