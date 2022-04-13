<template>
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
            @click.prevent="playSong(true), (pause = true)"
            >play_arrow</i
          >
          <i
            v-if="pause === true"
            class="text-lg material-icons"
            @click.prevent="playSong(false), (pause = false)"
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
</template>
<script>

import song from '../assets/medias/goat.mp3'
const audio = new Audio(song)

export default {
  name: "PlayBar",
  data: function () {
    return {

      pause: false,


    };
  },
  methods:{
       playSong(playerState) {
      playerState === true ? audio.play() : audio.pause();
    },
  }
};
</script>