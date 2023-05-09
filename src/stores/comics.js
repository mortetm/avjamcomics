import { defineStore } from "pinia";
import axios from "axios";

export const useComicContentStore = defineStore("comicContent", {
  state: () => ({
    comics: [],
    comic: null,
    loading: true,
    error: null,
    latestComic: null,
    latestComicPostID: null,
  }),
  getters: {
    getComics(state) {
      return state.comics;
    },
    getLatestComic(state) {
      return state.latestComic;
    },
  },
  actions: {
    async fetchComics() {
      this.loading = true;
      try {
        await axios
          .get(
            "https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts?acf_format=standard&_fields[]=title&_fields[]=post_id&_fields[]=slug&_fields[]=strip_image&_fields[]=share_image&_fields[]=panels&_fields[]=strip_image_color&_fields[]=share_image_color&_fields[]=panels_color"
          )
          .then((response) => {
            this.comics = response.data;
            this.loading = false;
            this.latestComic = this.comics[0];
            this.latestComicPostID = this.comics[0].post_id;
          });
      } catch (error) {
        console.log("Error fetching comic data: ", error);
      }
    },
  },
});
