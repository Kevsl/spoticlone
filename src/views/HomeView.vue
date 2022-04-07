<template>
  <div class="px-6 py-3">
    <div class="px-6 py-3 flex items-center justify-between">
      <h1
        class="
          pl-2
          text-2xl
          font-semibold
          text-white
          tracking-wider
          hover:underline
        "
      >
        Recently played
      </h1>
      <h2
        class="
          pr-8
          pt-4
          text-xs text-lightest
          uppercase
          tracking-wider
          hover:underline
          mb-3
        "
      >
        See all
      </h2>
    </div>

    <div class="w-full flex flex-wrap">
      <div
        v-for="recent in recents"
        :key="recent.title"
        class="p-2 w-48 relative"
      >
        <div class="absolute w-full h-full flex justify-end items-end p-8  opacity-0
              hover:opacity-100">
          <div
            class="
              bg-green
              rounded-full
              w-10
              h-10
              flex
              items-center
              justify-center
             
            "
          >
            <i class="material-icons text-white text-2xl">play_arrow </i>
          </div>
        </div>

        <div class="bg-light w-full h-auto p-5 rounded-lg shadow-md">
          <img
            :src="`${recent.src}`"
            class="shadow mb-2 object-cover h-36 w-72"
          />
          <h2 class="text-sm font-semibold text-white tracking-wide">
            {{ recent.title }}
          </h2>
          <h3 class="text-xs text-lightest tracking-wide pb-5">
            {{ recent.artist }}
          </h3>
        </div>
      </div>
    </div>
  </div>
  <div class="px-6 py-3">
    <div class="pl-2">
      <h2
        class="text-2xl font-semibold text-white tracking-wider hover:underline"
      >
        Made for Kev
      </h2>
      <h3 class="text-sm text-lightest">
        Get better recommendations the more you listen.
      </h3>
    </div>

    <div class="w-full flex flex-wrap overflow-x-scroll">
      <div v-for="custom in customs" :key="custom.title" class="p-2 w-48 relative">
        <div class="absolute w-full h-full flex justify-end items-end p-8  opacity-0
              hover:opacity-100">
          <div
            class="
              bg-green
              rounded-full
              w-10
              h-10
              flex
              items-center
              justify-center
             
            "
          >
            <i class="material-icons text-white text-2xl">play_arrow </i>
          </div>
        </div>
        <div class="bg-light w-full h-auto p-5 rounded-lg shadow-md">
          <img
            :src="`${custom.src}`"
            class="shadow mb-2 object-cover h-36 w-72"
          />
          <h2 class="text-sm font-semibold text-white tracking-wide">
            {{ custom.title }}
          </h2>
          <h3 class="text-xs text-lightest tracking-wide pb-5">
            {{ custom.artist }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Buffer } from "buffer";
import qs from "qs";

export default {
  name: "HomeView",
  data: function () {
    return {
      recentsList:[],
      token: "",

      recents: [
        {
          src: require("@/assets/images/1-1.jpeg"),
          title: "G.O.A.T",
          artist: "Polyphia",
        },
        {
          src: require("@/assets/images/1-2.jpeg"),
          title: "Stranger things",
          artist: "Periphery",
        },
        {
          src: require("@/assets/images/1-3.jpeg"),
          title: "Surf Solar",
          artist: "Fuck Buttons",
        },
        {
          src: require("@/assets/images/1-4.jpg"),
          title: "The remedy",
          artist: "Polaris",
        },
        {
          src: require("@/assets/images/1-5.jpeg"),
          title: "Lux",
          artist: "The Surrealist",
        },
        {
          src: require("@/assets/images/1-6.jpeg"),
          title: "Synthesis",
          artist: "Andromida",
        },
      ],
      customs: [
        {
          src: require("@/assets/images/2-1.jpeg"),
          title: "Die tausende ",
          artist: "KOMPROMAT",
        },
        {
          src: require("@/assets/images/2-2.jpeg"),
          title: "судно",
          artist: "Molchat Doma",
        },
        {
          src: require("@/assets/images/2-3.jpeg"),
          title: "The curse",
          artist: "The toxic avenger",
        },
        {
          src: require("@/assets/images/2-4.jpeg"),
          title: "Paradise",
          artist: "Voyage",
        },
        {
          src: require("@/assets/images/2-5.jpeg"),
          title: "Doomsday",
          artist: "Architects",
        },
        {
          src: require("@/assets/images/2-6.jpeg"),
          title: "Falaise",
          artist: "Floating Points",
        },
      ],
    };
  },
  methods:{
    async getRecent() {
      const client_id = process.env.VUE_APP_ID;
      const client_secret = process.env.VUE_APP_SECRET;
      const auth_token = Buffer.from(
        `${client_id}:${client_secret}`,
        "utf-8"
      ).toString("base64");
      const recentUrl = `	https://api.spotify.com/v1/me/player/recently-played`;

      const getAuth = async () => {
        const token_url = "https://accounts.spotify.com/api/token";
        const data = qs.stringify({ grant_type: "client_credentials" });
        try {
          const response = await axios.post(token_url, data, {
            headers: {
              Authorization: `Basic ${auth_token}`,
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json",
            },
          });
          localStorage.token = response.data.access_token;
        } catch (error) {
          console.log(error);
        }
      };

      const getRecentData = async () => {
        const recents = await axios
          .get(recentUrl, {
            params: { limit: 10, offset: 0},

            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              Accept: "application/json",
            },
          })
          .then((response) => {
            this.recentsList = response.data;
            console.log(response.data)
            
           

            return response.data;
          });
      };
      await getAuth();
      await getRecentData();
    },
   
   
  },
  beforeMount(){
    this.getRecent()
  }
};
</script>
