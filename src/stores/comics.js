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
    chosenComic: null,
    filteredComics: [],
    chosenComicContent: [],
    isColor: true,
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
    async filterComics(category) {
      let comicID = null;
      switch (category) {
        case "ttb":
          comicID = 3;
          this.chosenComic = "ttb";
          break;
        case "thbc":
          comicID = 4;
          this.chosenComic = "thbc";
          break;
        case "dlc":
          comicID = 5;
          this.chosenComic = "dlc";
          break;
        default:
          comicID = 3;
          this.chosenComic = "ttb";
      }

      this.filteredComics = this.comics.filter((comic) =>
        comic.categories.includes(comicID)
      );
      this.latestComic = this.filteredComics[0];
      this.latestComicPostID = this.filteredComics[0].post_id;

      return this.filteredComics;
    },

    checkUserPrefs() {
      if (localStorage.getItem("comicIsColor") === "true") {
        this.isColor = true;
      } else {
        this.isColor = false;
      }
    },

    async fetchComics() {
      this.loading = true;
      try {
        await axios
          .get(
            "https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts?acf_format=standard&_fields[]=title&_fields[]=post_id&_fields[]=slug&_fields[]=strip_image&_fields[]=share_image&_fields[]=panels&_fields[]=strip_image_color&_fields[]=share_image_color&_fields[]=panels_color&_fields[]=categories"
          )
          .then((response) => {
            this.comics = response.data;
            this.loading = false;
            //default to The TourBunny Comic
            this.filteredComics = this.comics.filter((comic) =>
              comic.categories.includes(3)
            );
            this.latestComic = this.filteredComics[0];
            this.latestComicPostID = this.filteredComics[0].post_id;
            this.checkUserPrefs();
          });
      } catch (error) {
        console.log("Error fetching comic data: ", error);
      }
    },
  },
});
