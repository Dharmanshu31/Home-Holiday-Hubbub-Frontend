import { Commit } from "vuex";
import axios from "../axios";

interface State {
  propertys: Property[];
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
        console.log(err);
        return err;
      }
    },
  },
};
