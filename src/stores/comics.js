import { defineStore } from "pinia";
import axios from "axios";

export const useComicContentStore = defineStore("comicContent", {
  state: () => ({
    comics: [],
    comic: null,
    loading: false,
    error: null,
  }),
  getters: {
    getComics(state) {
      return state.comics;
    },
    getLatestComic(state) {
      console.log("comics in state", state.comics);

      return "";
    },
  },
  actions: {
    async fetchComics() {
      this.loading = true;
      try {
        const data = await axios.get(
          "https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts"
        );
        this.comics = data.data;
        this.loading = false;
      } catch (error) {
        alert(error);
        console.log("Error fetching comic data: ", error);
      }
    },
  },
});

// import axios from "axios";
// import { onMounted, reactive } from "vue";

// /* AXIOS call to API */
// const fetchComics = () => {
//   axios
//     .get("https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts")
//     .then((response) => {
//       response.data.forEach((comic) => comicContentReactive.push(comic));
//       console.log("comics", comicContentReactive);
//     });
// };

// onMounted(fetchComics)
