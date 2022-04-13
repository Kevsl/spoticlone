<template>
  <div class="bg-dark h-screen">
    <div class="flex overflow-y-scroll" style="height: 88vh">
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
            <div class="w-full h-14 overflow-y-scroll">
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
              <p class="text-xs font-semibold">Install App</p>
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
<Header />
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
<PlayBar />

  </div>
</template>
<script>
import SearchView from "./views/SearchView.vue";
import HomeView from "./views/HomeView.vue";
import router from "./router";
import PlayBar from './components/PlayBar.vue'
import Header from './components/Header.vue'



export default {
  name: "App",
  components: {
    SearchView,
    HomeView,
      PlayBar,
      Header

  },
  data: function () {
    return {
     
         pages: [
        { id: "home", name: "Home", icon: "home" },
        { id: "search", name: "Search", icon: "search" },
        { id: "library", name: "Your Library", icon: "bar_chart" },
      ],
          albums: [
        { name: "drive" },
        { name: "walk" },
        { name: "chill " },
        { name: "classical trending" },
        { name: "Indies" },
        { name: "Lo-fi" },
        { name: "Road trip" },
      ],
      setID: "search",

   
  
    };
  },

 
};
</script>

