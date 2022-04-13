<template>
  <div class="bg-dark h-screen">
    <div class="flex" style="height: 88vh">
      <!-- Side nav -->
      <div class="w-56 bg-black h-full flex-none">
        <div class="p-6">
          <img src="./assets/images/spotify-logo.png" class="h-10" />
        </div>
        <div class="mx-2 mb-5">
          <button
            v-for="page in pages"
            :key="page.id"
            @click="setID = page.id"
            :class="`w-full focus:outline-none text-sm font-semibold rounded px-3 py-2 flex items-center justify-start ${
              setID === page.id ? 'bg-light text-white' : 'text-lightest'
            }`"
          >
            <i class="material-icons mr-3"> {{ page.icon }}</i>
            <p>{{ page.name }}</p>
          </button>
        </div>
        <div class="mx-5">
          <h1 class="mb-3 text-xs text-lightest tracking-widest uppercase">
            Playlists
          </h1>
          <button
            class="
              flex
              items-center
              justify-start
              opacity-75
              hover:opacity-100
              mb-2
            "
          >
            <img
              src="./assets/images/whiteAdd.png"
              class="material-icons h-6 w-6 mr-3"
            />
            <p class="text-sm text-white font-semibold">Create Playlist</p>
          </button>
          <button
            class="
              flex
              items-center
              justify-start
              opacity-75
              hover:opacity-100
              mb-2
            "
          >
            <img
              src="./assets/images/like.png"
              class="material-icons h-6 w-6 mr-3"
            />
            <p class="text-sm text-white font-semibold">Liked songs</p>
          </button>
          <div class="h-px w-full bg-light my-3"></div>
          <div class="mx-5">
            <div class="w-full h-10 overflow-y-scroll">
              <p
                v-for="album in albums"
                :key="album.name"
                class="text-lightest hover:text-white text-sm py-1"
              >
                {{ album.name }}
              </p>
            </div>

            <button
              class="
                flex
                items-center
                justify-start
                text-lightest
                hover:text-white
                py-2
              "
            >
              <i class="material-icons mr-3 rounded-full border border-lightest"
                >arrow_downward</i
              >
              <p class="text-sm font-semibold">Install App</p>
            </button>
          </div>
          <div class="relative pt-4">
            <div
              class="
                w-full
                h-full
                flex
                justify-end
                items-start
                opacity-75
                hover:opacity-100
                p-2
                absolute
              "
            >
              <div class="bg-black rounded-full h-6 w-6 cursor-pointer">
                <i class="material-icons text-white"> keyboard_arrow_down</i>
              </div>
            </div>

            <img src="./assets/images/1-1.jpeg" />
          </div>
        </div>
      </div>
      <!-- main content -->
      <div class="w-full h-full relative overflow-y-scroll">
        <!-- header -->
        <div
          class="
            w-full
            sticky
            top-0
            py-2
            px-6
            flex
            items-center
            justify-between
            bg-dark
          "
        >
          <div class="flex items-center">
            <button
              class="rounded-full bg-black w-8 h-8 text-white mr-3"
              @click="goback()"
            >
              <i class="material-icons text-3xl">keyboard_arrow_left</i>
            </button>
            <button class="rounded-full bg-black w-8 h-8 text-white">
              <i class="material-icons text-3xl">keyboard_arrow_right</i>
            </button>
          </div>
          <div class="relative">
            <button
              @click="showDropdown = true"
              class="bg-light rounded-full py-1 px-2 flex items-center"
            >
              <img
                src="./assets/images/profil.jpeg"
                class="rounded-full h-6 w-6 mr-2"
              />
              <p class="text-white font-semibold text-xs mr-3">Kevin Terrier</p>
              <i v-if="showDropdown === false" class="material-icons text-white"
                >arrow_drop_down</i
              >
              <i
                @click="showDropdown = false"
                v-if="showDropdown === true"
                class="material-icons text-white"
                >arrow_drop_up
              </i>
            </button>
            <div
              v-if="showDropdown === true"
              class="absolute bg-light w-full rounded mt-1"
            >
              <button
                @click="showDropdown = false"
                class="
                  focus:outline-none
                  w-full
                  text-sm
                  py-2
                  text-lightest
                  hover
                  text-white
                  border-b border-white
                  opacity-75
                  hover:opacity-100
                "
              >
                Account
              </button>
              <button
                @click="showDropdown = false"
                class="
                  w-full
                  focus:outline-none
                  text-sm
                  py-2
                  text-lightest
                  hover
                  text-white
                  border-b border-light
                  opacity-75
                  hover:opacity-100
                "
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        <!--Start   dynamic content  -->
        <div>
          <SearchView v-if="setID === 'search'" />
        </div>
        <div>
          <HomeView v-if="setID === 'home'" />
        </div>
        <!--End dynamic content   -->
      </div>
    </div>
    <!-- play bar -->

    <div
      class="
        w-full
        flex
        items-center
        justify-between
        px-6
        bg-light
        border-t border-dark
      "
      style="height: 12vh"
    >
      <div class="flex items-center w-1/4">
        <div>
          <h1 class="text-sm text-white tracking wide">G.O.A.T</h1>
          <h2 class="text-xs text-lightest tracking-wide">Polyphia</h2>
        </div>
        <i class="material-icons text-base text-green mx-4 hover:text-white"
          >favorite
        </i>
        <i class="material-icons text-base text-lightest hover:text-white"
          >picture_in_picture
        </i>
      </div>

      <div class="flex flex-col justify-center w-2/4 items-center">
        <div class="flex items-center">
          <button class="text-lightest hover:text-white mx-5">
            <i class="text-lg material-icons">shuffle</i>
          </button>
          <button class="text-lightest hover:text-white">
            <i class="text-lg material-icons">skip_previous</i>
          </button>
          <button
            class="
              rounded-full
              w-8
              h-8
              border-lightest border
              text-lightest
              hover:text-white
              flex
              items-center
              justify-center
              mx-5
            "
          >
            <i
              v-if="pause === false"
              class="text-lg material-icons"
              @click.prevent="
                playSong(true), (pause = true)
              "

              >play_arrow</i
            >
            <i
              v-if="pause === true"
              class="text-lg material-icons"
              @click.prevent="
                playSong(false), (pause = false)"
              >pause</i
            >
          </button>
          <button class="text-lightest hover:text-white">
            <i class="text-lg material-icons">skip_next</i>
          </button>
          <button class="mx-5 text-lightest hover:text-white">
            <i class="material-icons">repeat</i>
          </button>
        </div>
        <div class="w-3/4 flex items-center justify-center mt-3">
          <p class="text-xs text-lightest mr-1">0:28</p>
          <div class="w-full h-1 bg-dark flex items center rounded-full">
            <div class="h-1 bg-green rounded-full" style="width: 18%"></div>
            <div class="bg-white h-3 w-3 rounded-full -ml-1 shadow"></div>
          </div>
          <p class="text-xs text-lightest ml-1">2:40</p>
        </div>
      </div>

      <div class="flex items-center w-1/4 justify-end">
        <i class="material-icons text-lightest hover:text-white"
          >playlist_play
        </i>
        <i class="material-icons text-xl text-lightest mx-3 hover:text-white"
          >important_devices
        </i>
        <i class="material-icons text-xl text-lightest hover:text-white"
          >volume_up
        </i>
        <div class="w-24 ml-1 bg-lightest rounded-full h-1"></div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchView from "./views/SearchView.vue";
import HomeView from "./views/HomeView.vue";
import router from "./router";
import song from './assets/medias/goat.mp3'
const audio = new Audio(song)

export default {
  name: "App",
  components: {
    SearchView,
    HomeView,
  },
  data: function () {
    return {
      search: null,
      token: null,
      pages: [
        { id: "home", name: "Home", icon: "home" },
        { id: "search", name: "Search", icon: "search" },
        { id: "library", name: "Your Library", icon: "bar_chart" },
      ],
      setID: "search",
      albums: [
        { name: "drive" },
        { name: "walk" },
        { name: "chill " },
        { name: "classical trending" },
        { name: "Indies" },
        { name: "Lo-fi" },
        { name: "Road trip" },
      ],
      showDropdown: false,
      pause: false,
    };
  },
  methods: {
    goBack() {
      router.go(-1);
    },
    playSong(playerState) {
      playerState === true ? audio.play() : audio.pause();
    },
  },
};
</script>

