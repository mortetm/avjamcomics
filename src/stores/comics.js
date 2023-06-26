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
      ogshare: "https://www.avjam.xyz/CDN/ogshare.png",
    },
    comicFamily: [
      { name: "The TourBunny", code: "ttb" },
      { name: "The Hairball Chronicles", code: "thbc" },
      { name: "Dark Lines", code: "dl" },
    ],
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
      const urlCDN = "https://www.avjam.xyz/CDN/",
        comic = this.filteredComics.find((comic) => comic.id === comicID),
        count = comic.numberOfPanels,
        categoryUppercase = comic.category.toUpperCase();
      let images = [],
        imagesColor = [];

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
      for (let i = 1; i <= count; i++) {
        imagesColor.push(
          `${urlCDN}/${categoryUppercase}-${comic.id}-panel-${i}-c.jpg`
        );
      }
      this.images.shareColor = `${urlCDN}/${categoryUppercase}-${comic.id}-share-c.jpg`;
      this.images.stripColor = `${urlCDN}/${categoryUppercase}-${comic.id}-strip-c.jpg`;
      this.images.panelsColor = imagesColor;
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
  },
});
