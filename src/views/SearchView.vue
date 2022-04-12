<template>
  <div class="relative">
    <label class="text-white flex items-center mx-auto w-60 justify-center"
      >Lookin for an artist ?</label
    >
    <br />

    <input
      type="text"
      class="flex items-center mx-auto w-60 rounded-lg"
      placeholder="cannibal corpse"
      v-model="search"
    />

    <button
      @click="getArtist(search, 'followers')"
      class="
        flex
        items-center
        mx-auto
        w-60
        text-white
        align-center
        justify-center
        bg-green
        rounded-lg
        mt-5
      "
    >
      Search
    </button>
  </div>
  <ul
    class="absolute top-10 w-90 xl:ml-64 z-20 opacity-75 lg:ml-12 sm:w-24 hover:opacity-100 "
    v-if="search"
  >
    <p class="text-lightest text-center">Search history</p>
    <li
      class="
        text-lightest text-sm
        italic
        w-48
        cursor-pointer
        bg-light
        px-4
        pt-2
        opacity-75
        hover:opacity-100
      "
      v-for="item in searchHistory"
      @click="getArtist(item, 'followers')"
      :key="item"
    >
      {{ item }}
    </li>
  </ul>
  <p
    v-if="showArtist === true && artistList.length < 1"
    class="
      text-red-800 text-center
      flex
      items-center
      text-center
      flex
      mx-auto
      w-60
      text-center text-xl
      pt-3
    "
  >
    Sorry, no results related for that artist name
  </p>

  <div v-if="showArtist === true">
    <h2
      class="
        text-xl
        font-semibold
        text-white
        tracking-wide
        text-centers
        items-center
        mx-auto
        w-64
        text-center 
        mt-12
      "
    >
      Order Artists by :
    </h2>

    <div class="flex items-center justify-around">
      <button
        @click="getArtist(searchHistory[0], 'alphabetic')"
        class="bg-white text-green rounded-lg w-32 mb-6"
      >
        Alphabetic
      </button>
      <button
        @click="getArtist(searchHistory[0], 'followers')"
        class="bg-white text-green rounded-lg w-32 mb-6"
      >
        Followers
      </button>
    </div>

    <div class="w-full flex flex-wrap">
      <div
        v-for="artiste in artistList"
        :key="artiste.id"
        class="p-4 w-48 relative h-72 overflow-y-scroll"
      >
        <div
          class="
            absolute
            w-full
            h-full
            flex
            justify-end
            items-end
            p-8
            opacity-0
            hover:opacity-100
            cursor-pointer
          "
          @click="getAlbumsAndTracks(artiste.id)"
        ></div>
        <div class="bg-light w-full h-auto p-5 rounded-lg shadow-md h-64">
          <img
            v-if="artiste.images.length > 0"
            :src="`${artiste.images[0].url}`"
            class="shadow mb-2 object-cover h-36 w-72"
          />
          <img
            v-if="artiste.images.length < 1"
            src="../assets/images/noPhoto.png"
            class="shadow mb-2 object-cover h-36 w-72"
          />

          <h2
            @click="alert(artiste.name)"
            class="text-sm font-semibold text-white tracking-wide text-center"
          >
            {{ artiste.name }}
          </h2>

          <h3
            v-if="artiste.followers.total > 0"
            class="text-xs text-lightest tracking-wide text-center"
          >
            <span class="text-lightest">Followers : </span>
            {{ artiste.followers.total }}
          </h3>
        </div>
      </div>
    </div>
  </div>
          <button
       v-if='showTracks === true'
        class="bg-white text-green rounded-lg w-32  mx-auto my-6 w-32 flex items-center justify-center text-center"
      >
      <a href='#topTracks'>
        See top tracks
        </a>
      </button>
  <!-- Albums -->
  <h1
    v-if="showAlbums === true"
    class="mb-3 text-xs text-lightest tracking-widest uppercase  mx-3 text-center text-xl my-4        
"
  >
    Albums
  </h1>
  <div v-if="showAlbums === true">
    <div class="w-full flex flex-wrap">
      <div
        v-for="albums in albumsList"
        :key="albums.id"
        class="
          p-2
          w-48
          relative
          h-72
          overflow-x-hidden overflow-y-scroll overflow-x-hidden
        "
      >
        <div
          class="
            absolute
            w-full
            h-full
            flex
            justify-end
            items-end
            p-8
            opacity-0
            hover:opacity-100
          "
        ></div>
        <div class="bg-light w-full h-auto p-5 rounded-lg shadow-md h-64">
          <img
            v-if="albums.images.length > 0"
            :src="`${albums.images[0].url}`"
            class="shadow mb-2 object-cover h-36 w-80"
          />

          <h2 class="text-sm font-semibold text-white tracking-wide h-32 text-center">
            {{ albums.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
  <h1
    v-if="showTracks === true"
    class="mb-3 text-lightest tracking-widest uppercase mx-3 text-center text-xl my-4"
    id='topTracks'
  >
    Top Tracks
  </h1>
  <div v-if="showTracks === true">
    <div class="w-full flex flex-wrap">
      <div
        v-for="tracks in tracksList"
        :key="tracks.id"
        class="p-2 w-48 relative h-72 "
      >
       
        <div class="bg-light w-full h-auto p-5 rounded-lg shadow-md h-64 overflow-y-hidden
 ">
          <img
            v-if="tracks.album.images.length > 0"
            :src="`${tracks.album.images[0].url}`"
            class="shadow mb-2 object-cover h-36 w-72"
          />

          <h2 class="text-sm font-semibold text-white tracking-wide text-center ">
            {{ tracks.name }}
          </h2>
         
          <p class="text-white text-xs text-center">Popularity: {{ tracks.popularity }}</p>
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
  name: "SearchView",
  components: {},
  data: function () {
    return {
      search: null,
      token: "",
      searchHistory: [],
      showArtist: false,
      artistList: {},
      albumsList: {},
      topTracksList: {},
      showAlbums: false,
      showTracks: false,
      order: "followers",
    };
  },
  mounted() {
    if (localStorage.searchHistory) {
      this.searchHistory = JSON.parse(localStorage.searchHistory);
    }
  },
  methods: {
    async getAlbumsAndTracks(id) {
      const artistId = id;
      const albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums`;
      const tracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=FR`;
      const artistAlbums = await axios
        .get(albumsUrl, {
          params: {limit:10},

          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.albumsList = response.data.items;
          this.showArtist = false;
          this.showAlbums = true;

          return response.data;
        });
      const artistTracks = await axios
        .get(tracksUrl, {
          params: {},

          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.tracksList = response.data.tracks;
          this.tracksList.sort((a, b) => b.popularity - a.popularity);
          this.showTracks = true;

          return response.data;
        });
    },

    async getArtist(search, order) {
      this.order = order;
      const client_id = process.env.VUE_APP_ID;
      const client_secret = process.env.VUE_APP_SECRET;
      const auth_token = Buffer.from(
        `${client_id}:${client_secret}`,
        "utf-8"
      ).toString("base64");
      const artistUrl = `https://api.spotify.com/v1/search?q=${search}&type=artist`;

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

      const getArtistData = async () => {
        const artistes = await axios
          .get(artistUrl, {
            params: { limit: 10, offset: 0, order: "DESC" },

            headers: {
              Authorization: `Bearer ${localStorage.token}`,
              Accept: "application/json",
            },
          })
          .then((response) => {
            this.artistList = response.data.artists.items;
            this.order === "followers"
              ? this.artistList.sort(
                  (a, b) => b.followers.total - a.followers.total
                )
              : this.artistList.sort((a, b) => {
                  let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                  if (fa < fb) {
                    return -1;
                  }
                  if (fa > fb) {
                    return 1;
                  }
                  return 0;
                });

            this.showArtist = true;
            this.showAlbums = false;
            this.showTracks = false;

            {
              this.searchHistory =
                JSON.parse(localStorage.getItem("searchHistory")) || [];
              this.searchHistory.unshift(search);
              this.searchHistory.length > 10 ? this.searchHistory.pop() : <></>;

              localStorage.setItem(
                "searchHistory",
                JSON.stringify(this.searchHistory)
              );
              this.search = "";
            }

            return response.data;
          });
      };
      await getAuth();
      await getArtistData();
    },
  },
};
</script>

