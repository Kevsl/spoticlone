<template>
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
      z-50

    "
  >
    <div class="flex items-center">
      <button
        class="rounded-full bg-black w-8 h-8 text-white mr-3"
      >
        <i class="material-icons text-3xl">keyboard_arrow_left</i>
      </button>
      <button class="rounded-full bg-black w-8 h-8 text-white">
        <i class="material-icons text-3xl">keyboard_arrow_right</i>
      </button>
    </div>
    <div class="relative">
      <button
        class="bg-light rounded-full py-1 px-2 flex items-center"
      >
        <img
          src="../assets/images/profil.jpeg"
          class="rounded-full h-6 w-6 mr-2"
        />
        <p class="text-white font-semibold text-xs mr-3">Kevin Terrier</p>
        <i v-if="showDropdown === false" class="material-icons text-white"
         @click="showDropdown = true"
          >arrow_drop_down</i
        >
        <i
        v-if="showDropdown === true"
          @click="showDropdown = false"
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
</template>
<script>export default {
  name: "Header",
  data: function () {
    return {
      showDropdown: false,


    };
  },
 
};
</script>