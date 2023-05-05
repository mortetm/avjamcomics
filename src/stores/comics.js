import { defineStore } from "pinia";
import axios from "axios";

export const useComicContentStore = defineStore({
  id: "comicContent",
  state: () => ({
    comics: [],
    comic: null,
    loading: false,
    error: null,
  }),
  getters: {},
  actions: {
    fetchComics() {
      this.comics = [];
      this.loading = true;
      try {
        this.comics = axios
          .get("https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts")
          .then((response) => {
            this.comics = response.data;
            console.log("comics fetched", response);
          });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
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

// onMounted(fetchComics);
