import { Commit } from "vuex";
import axios from "../axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
interface State {
  propertys: Property[];
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
      propertys: [],
      like: false,
    };
  },
  mutations: {
    //set property
    getPoperty(state: State, data: Property[]): void {
      state.propertys = data;
    },
  },
  actions: {
    //fetch all propertys
    async getProperty({ commit }: { commit: Commit }) {
      try {
        const response = await axios.get("property");
        commit("getPoperty", response.data.properties);
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
        await axios.post(`user/wishList/${propertyId}`, _, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        return err;
      }
    },

    //get wishlist
    async getWishList(_, propertyId: string) {
      try {
        const response=await axios.get(`user/onlyWishList`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.wishList.includes(propertyId)
      } catch (err) {
        return err;
      }
    },
  },
};
