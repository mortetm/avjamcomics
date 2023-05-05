import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useComicContentStore = defineStore("comicContent", () => {
  const comics = ref([]);
  const comic = null;
  const loading = false;
  const error = null;

  const fetchComics = computed(() => {
    console.log(this.comics);
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
    return this.comics;
  });

  return {
    comics,
    comic,
    loading,
    error,
    fetchComics,
  };
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
