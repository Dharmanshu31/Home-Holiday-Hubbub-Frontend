import { ActionContext, Commit } from "vuex";
import axios from "../axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
interface State {
  like: boolean;
}
interface Property {
  _id: string;
  name: string;
  description: string;
  highlight: string;
  highlightDetail: string;
  propertyCategory: string;
  propertyType: string;
  address: string;
  location: {
    coordinates: [number, number];
    formattedAddress: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    type: string;
  };
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  bed: number;
  amenities: string[];
  ratingsAverage: number;
  ratingQuantity: number;
  images: string[];
  createdAt: string;
  owner: string;
  bookings: any[];
  slug: string;
  __v: number;
}
export default {
  state(): State {
    return {
      like: false,
    };
  },
  actions: {
    //fetch all propertys
    async getProperty({ commit }: { commit: Commit }, { page, limit }) {
      try {
        const response = await axios.get("property", {
          params: { page, limit },
        });
        return response;
      } catch (err) {
        return err;
      }
    },

    //fetch proerty by id
    async getOneProperty(_, id: string) {
      try {
        const respone = await axios.get(`property/${id}`);
        return respone;
      } catch (err) {
        return err;
      }
    },

    //fetch filter proerty
    async getFilterProperty(_, params: {}) {
      try {
        const respone = await axios.get(`property`, { params });
        return respone;
      } catch (err) {
        return err;
      }
    },

    //add like
    async likeTheProperty(_, propertyId: string) {
      try {
        const res = await axios.post(`user/wishList/${propertyId}`, _, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res;
      } catch (err) {
        return err;
      }
    },

    //show wishList from all property
    async getWishList(_, propertyId: string) {
      try {
        if (token) {
          const response = await axios.get(`user/onlyWishList`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data.wishList.includes(propertyId);
        }
      } catch (err) {
        return err;
      }
    },
    //get user wishlist
    async getUserWishList() {
      try {
        if (token) {
          const response = await axios.get(`user/wishList`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        }
      } catch (err) {
        return err;
      }
    },

    //property near me
    async getPropertyNearMe(
      _,
      { lat, lag, newParam }: { lat: string; lag: string; newParam: {} }
    ) {
      try {
        const response = await axios.get(
          `property/near-me/distance/${lat},${lag}/unit/km`,
          {
            params: newParam,
          }
        );
        return response.data;
      } catch (err) {
        return err;
      }
    },

    //get user wishlist
    async deleteProperty(_, propertyId: string) {
      try {
        if (token) {
          const response = await axios.delete(`property/${propertyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        }
      } catch (err) {
        return err;
      }
    },

    //distance property distance
    async getDistancePorperty(
      _,
      {
        lat,
        lag,
        radius,
        newDisParam,
      }: { lat: string; lag: string; radius: string; newDisParam: {} }
    ) {
      try {
        const response = await axios.get(
          `property/near-me/distance/${radius}/${lat},${lag}`,
          {
            params: newDisParam,
          }
        );
        return response.data;
      } catch (err) {
        return err;
      }
    },

    //cancel and refund booking
    async refundBooking(_, bookingId: string) {
      try {
        if (token) {
          const response = await axios.delete(`booking/${bookingId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response;
        }
      } catch (err) {
        return err;
      }
    },
  },
};
