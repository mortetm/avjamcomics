import { defineStore } from "pinia";
import axios from "axios";

export const useComicContentStore = defineStore("comicContent", {
  state: () => ({
    comics: [],
    filteredComics: [],
    comic: null,
    loading: true,
    error: null,
    latestComic: null,
    latestComicPostID: null,
    chosenComic: null,
    isColor: true,
    images: {
      panels: [],
      panelsColor: [],
      strip: "",
      stripColor: "",
      share: "",
      shareColor: "",
    },
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
    generateImages(comicID) {
      const urlCDN = "https://www.avjam.xyz/CDN/";
      const comic = this.filteredComics.find((comic) => comic.id === comicID);
      const count = comic.numberOfPanels;
      let images = [];
      const categoryUppercase = comic.category.toUpperCase();

      // set b&w images
      for (let i = 1; i <= count; i++) {
        images.push(
          `${urlCDN}/${categoryUppercase}-${comic.id}-panel-${i}.jpg`
        );
      }
      this.images.share = `${urlCDN}/${categoryUppercase}-${comic.id}-share.jpg`;
      this.images.strip = `${urlCDN}/${categoryUppercase}-${comic.id}-strip.jpg`;
      this.images.panels = images;

      // set color images
      if (comic.isColor) {
        for (let i = 1; i <= count; i++) {
          images.push(
            `${urlCDN}/${categoryUppercase}-${comic.id}-panel-${i}-c.jpg`
          );
        }
        this.images.share = `${urlCDN}/${categoryUppercase}-${comic.id}-share-c.jpg`;
        this.images.strip = `${urlCDN}/${categoryUppercase}-${comic.id}-strip-c.jpg`;
        this.images.panels = images;
      }
    },

    async filterComics(category) {
      this.filteredComics = this.comics.filter(
        (comic) => comic.category === category
      );
      this.chosenComic = category;
      this.latestComic = this.filteredComics[0];
      this.latestComicPostID = this.filteredComics[0].id;

      return this.filteredComics;
    },

    checkUserPrefs() {
      if (localStorage.getItem("comicIsColor") === "true") {
        this.isColor = true;
      } else {
        this.isColor = false;
      }
    },

    async fetchContent() {
      this.loading = true;
      try {
        await axios
          .get(
            "https://cdn.contentful.com/spaces/3skqmxt0v2pl/environments/master/entries?access_token=kyohLP1ApLQksn_-g4ZJZaM4xgWGdoJonXuXNa5Zlyg&order=-sys.createdAt"
          )
          .then((response) => {
            this.comics = [];
            response.data.items.forEach((comicArray) =>
              this.comics.push(comicArray.fields)
            );
            this.loading = false;
            this.filteredComics = this.comics.filter(
              (comic) => comic.category === "ttb"
            );
            this.latestComic = this.filteredComics[0];
            this.latestComicPostID = this.filteredComics[0].id;
            this.checkUserPrefs();
          });
      } catch (error) {
        console.error("Error fetching comic data:", error);
      }
    },

    // async fetchComics() {
    //   this.loading = true;
    //   try {
    //     await axios
    //       .get(
    //         "https://avjam.xyz/avjamcomics/wp-json/wp/v2/posts?acf_format=standard&_fields[]=title&_fields[]=post_id&_fields[]=slug&_fields[]=strip_image&_fields[]=share_image&_fields[]=panels&_fields[]=strip_image_color&_fields[]=share_image_color&_fields[]=panels_color&_fields[]=categories"
    //       )
    //       .then((response) => {
    //         this.comics = response.data;
    //         this.loading = false;
    //         //default to The TourBunny Comic
    //         this.filteredComics = this.comics.filter((comic) =>
    //           comic.categories.includes(3)
    //         );
    //         this.latestComic = this.filteredComics[0];
    //         this.latestComicPostID = this.filteredComics[0].post_id;
    //         this.checkUserPrefs();
    //       });
    //   } catch (error) {
    //     console.log("Error fetching comic data: ", error);
    //   }
    // },
  },
});

// ("https://cdn.contentful.com/spaces/3skqmxt0v2pl/environments/master/entries?access_token=kyohLP1ApLQksn_-g4ZJZaM4xgWGdoJonXuXNa5Zlyg&content_type=comic");
// ("https://cdn.contentful.com/spaces/3skqmxt0v2pl/environments/master/content_types/comic?access_token=kyohLP1ApLQksn_-g4ZJZaM4xgWGdoJonXuXNa5Zlyg");
