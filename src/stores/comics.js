import { defineStore } from "pinia";
import axios from "axios";

// Constants
const API_BASE_URL =
  "https://cdn.contentful.com/spaces/3skqmxt0v2pl/environments/master/entries";
const API_ACCESS_TOKEN = "kyohLP1ApLQksn_-g4ZJZaM4xgWGdoJonXuXNa5Zlyg";
const CDN_BASE_URL = `${window.location.origin}/CDN`;

const CACHE_DURATION = 86400000; // 24 hours in milliseconds
const CHECK_NEW_CONTENT_INTERVAL = 3600000; // Check for new content every 1 hour

const STORAGE_KEYS = {
  COMICS: "comics",
  REFRESH_TIME: "refreshTime",
  LAST_CHECK_TIME: "lastCheckTime",
  LATEST_COMIC_DATE: "latestComicDate",
  COLOR_PREFERENCE: "comicIsColor",
};

const COMIC_FAMILIES = [
  { name: "The TourBunny", code: "ttb" },
  { name: "The Hairball Chronicles", code: "thbc" },
  { name: "Dark Lines", code: "dl" },
];

const DEFAULT_OG_SHARE = "https://www.avjamcomics.com/CDN/ogshare.png";

export const useComicContentStore = defineStore("comicContent", {
  state: () => ({
    comics: [],
    filteredComics: [],
    comic: null,
    loading: false,
    error: null,
    latestComic: null,
    latestComicPostID: null,
    currentComicID: null,
    chosenComic: null,
    isColor: true,
    comicColor: "",
    newComicsCount: 0,
    images: {
      panels: [],
      panelsColor: [],
      strip: "",
      stripColor: "",
      share: "",
      shareColor: "",
      ogshare: DEFAULT_OG_SHARE,
    },
    comicFamily: COMIC_FAMILIES,
  }),

  getters: {
    getComics: (state) => state.comics,
    getLatestComic: (state) => state.latestComic,
    getFilteredComics: (state) => state.filteredComics,
    isLoading: (state) => state.loading,
    hasError: (state) => !!state.error,
    getCurrentImages: (state) => state.images,
    hasNewComics: (state) => state.newComicsCount > 0,
  },

  actions: {
    /**
     * Generate image URLs for a specific comic
     */
    generateImages(comicID) {
      // Add null check
      if (!comicID) {
        console.warn("generateImages called with null/undefined comicID");
        return;
      }

      const comic = this.filteredComics.find((c) => c.id === comicID);

      if (!comic) {
        console.error(`Comic with ID ${comicID} not found`);
        console.log(
          "Available comics:",
          this.filteredComics.map((c) => c.id)
        );
        return;
      }

      // Set the current comic ID
      this.currentComicID = comicID;
      this.comic = comic;

      const categoryUpper = comic.category.toUpperCase();
      const baseUrl = `${CDN_BASE_URL}/${categoryUpper}/${categoryUpper}-${comic.id}`;

      // Generate panel URLs
      const panels = Array.from(
        { length: comic.numberOfPanels },
        (_, i) => `${baseUrl}-panel-${i + 1}.jpg`
      );

      // Set base images
      this.images = {
        panels,
        strip: `${baseUrl}-strip.jpg`,
        share: `${baseUrl}-share.jpg`,
        panelsColor: [],
        stripColor: "",
        shareColor: "",
        ogshare: DEFAULT_OG_SHARE,
      };

      // Set color images if available
      if (comic.colored) {
        this.images.panelsColor = Array.from(
          { length: comic.numberOfPanels },
          (_, i) => `${baseUrl}-panel-${i + 1}-c.jpg`
        );
        this.images.stripColor = `${baseUrl}-strip-c.jpg`;
        this.images.shareColor = `${baseUrl}-share-c.jpg`;
      }

      this.comicColor = comic.hexColor || "";
    },

    /**
     * Generate image URLs for a comic without setting them in state
     */
    generateImageUrls(comic) {
      if (!comic) return null;

      const categoryUpper = comic.category.toUpperCase();
      const baseUrl = `${CDN_BASE_URL}/${categoryUpper}/${categoryUpper}-${comic.id}`;

      const urls = {
        panels: [],
        panelsColor: [],
        strip: `${baseUrl}-strip.jpg`,
        stripColor: comic.colored ? `${baseUrl}-strip-c.jpg` : null,
      };

      // Generate panel URLs
      for (let i = 1; i <= comic.numberOfPanels; i++) {
        urls.panels.push(`${baseUrl}-panel-${i}.jpg`);
        if (comic.colored) {
          urls.panelsColor.push(`${baseUrl}-panel-${i}-c.jpg`);
        }
      }

      return urls;
    },

    /**
     * Get adjacent comic IDs (previous and next)
     */
    getAdjacentComics(comicID) {
      const currentIndex = this.filteredComics.findIndex(
        (comic) => comic.id === comicID
      );

      if (currentIndex === -1) return { prev: null, next: null };

      const prevComic = this.filteredComics[currentIndex + 1] || null; // +1 because newest first
      const nextComic = this.filteredComics[currentIndex - 1] || null; // -1 to go to newer

      return {
        prev: prevComic,
        next: nextComic,
      };
    },

    /**
     * Preload images for adjacent comics in the background
     */
    preloadAdjacentComics(comicID) {
      const { prev, next } = this.getAdjacentComics(comicID);
      const comicsToPreload = [next, prev].filter(Boolean);

      if (comicsToPreload.length === 0) {
        console.log("No adjacent comics to preload");
        return Promise.resolve();
      }

      console.log(
        `Starting background preload of ${comicsToPreload.length} adjacent comic(s)...`
      );

      return new Promise((resolve) => {
        const startPreload = () => {
          const preloadComic = (comic) => {
            const urls = this.generateImageUrls(comic);
            if (!urls) return Promise.resolve();

            const allUrls = [
              ...urls.panels,
              ...urls.panelsColor,
              urls.strip,
              urls.stripColor,
            ].filter(Boolean);

            console.log(
              `Preloading ${allUrls.length} images for comic ${comic.id}`
            );

            const imagePromises = allUrls.map((src) => {
              return new Promise((imgResolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";

                img.onload = () => {
                  console.log(`✓ Preloaded: ${src.split("/").pop()}`);
                  imgResolve();
                };
                img.onerror = () => {
                  console.warn(`✗ Failed to preload: ${src.split("/").pop()}`);
                  imgResolve();
                };

                img.src = src;
              });
            });

            return Promise.all(imagePromises).then(() => {
              console.log(`✓ Comic ${comic.id} preloaded`);
            });
          };

          // Preload all comics
          Promise.all(comicsToPreload.map((comic) => preloadComic(comic)))
            .then(() => {
              console.log("✓ All adjacent comics preloaded");
              resolve();
            })
            .catch((error) => {
              console.error("Error preloading:", error);
              resolve(); // Resolve anyway so it doesn't block
            });
        };

        // Use requestIdleCallback if available
        if ("requestIdleCallback" in window) {
          requestIdleCallback(startPreload, { timeout: 2000 });
        } else {
          setTimeout(startPreload, 100);
        }
      });
    },

    /**
     * Filter comics by category and update related state
     */
    async filterComics(category) {
      this.filteredComics = this.comics.filter(
        (comic) => comic.category === category
      );
      this.chosenComic = category;

      if (this.filteredComics.length > 0) {
        this.latestComic = this.filteredComics[0];
        this.latestComicPostID = this.filteredComics[0].id;
      } else {
        this.latestComic = null;
        this.latestComicPostID = null;
      }

      return this.filteredComics;
    },

    /**
     * Load user color preference from localStorage
     */
    loadUserPreferences() {
      const colorPref = localStorage.getItem(STORAGE_KEYS.COLOR_PREFERENCE);
      this.isColor = colorPref === "true";
    },

    /**
     * Save user color preference to localStorage
     */
    saveColorPreference(isColor) {
      this.isColor = isColor;
      localStorage.setItem(STORAGE_KEYS.COLOR_PREFERENCE, isColor.toString());
    },

    /**
     * Check if full cache refresh is needed
     */
    needsFullRefresh() {
      const storedTime = localStorage.getItem(STORAGE_KEYS.REFRESH_TIME);
      if (!storedTime) return true;

      const timeDiff = Date.now() - parseInt(storedTime, 10);
      return timeDiff >= CACHE_DURATION;
    },

    /**
     * Check if we should check for new content
     */
    shouldCheckForNewContent() {
      const lastCheckTime = localStorage.getItem(STORAGE_KEYS.LAST_CHECK_TIME);
      if (!lastCheckTime) return true;

      const timeDiff = Date.now() - parseInt(lastCheckTime, 10);
      return timeDiff >= CHECK_NEW_CONTENT_INTERVAL;
    },

    /**
     * Get the latest comic creation date from cache
     */
    getLatestComicDate() {
      const storedDate = localStorage.getItem(STORAGE_KEYS.LATEST_COMIC_DATE);
      return storedDate || null;
    },

    /**
     * Save the latest comic creation date
     */
    saveLatestComicDate(date) {
      localStorage.setItem(STORAGE_KEYS.LATEST_COMIC_DATE, date);
    },

    /**
     * Load comics from localStorage cache
     */
    loadFromCache() {
      try {
        const storedComics = localStorage.getItem(STORAGE_KEYS.COMICS);
        if (!storedComics) return null;

        return JSON.parse(storedComics);
      } catch (error) {
        console.error("Error parsing cached comics:", error);
        this.clearCache();
        return null;
      }
    },

    /**
     * Save comics to localStorage cache
     */
    saveToCache(comics) {
      try {
        localStorage.setItem(STORAGE_KEYS.COMICS, JSON.stringify(comics));
        localStorage.setItem(STORAGE_KEYS.REFRESH_TIME, Date.now().toString());

        // Save the creation date of the newest comic
        if (comics.length > 0 && comics[0].sys?.createdAt) {
          this.saveLatestComicDate(comics[0].sys.createdAt);
        }
      } catch (error) {
        console.error("Error saving to cache:", error);
      }
    },

    /**
     * Update last check time
     */
    updateLastCheckTime() {
      localStorage.setItem(STORAGE_KEYS.LAST_CHECK_TIME, Date.now().toString());
    },

    /**
     * Initialize comics with default category
     */
    initializeComics(comics, defaultCategory = "ttb") {
      this.comics = comics;
      this.filteredComics = comics.filter(
        (comic) => comic.category === defaultCategory
      );

      if (this.filteredComics.length > 0) {
        this.latestComic = this.filteredComics[0];
        this.latestComicPostID = this.filteredComics[0].id;
      }

      this.loadUserPreferences();
    },

    /**
     * Build API URL with optional date filter for incremental fetch
     */
    buildApiUrl(sinceDate = null) {
      const params = new URLSearchParams({
        access_token: API_ACCESS_TOKEN,
        order: "-sys.createdAt",
        limit: sinceDate ? "100" : "600",
      });

      if (sinceDate) {
        params.append("sys.createdAt[gt]", sinceDate);
      }

      return `${API_BASE_URL}?${params.toString()}`;
    },

    /**
     * Fetch comics from API (full or incremental)
     */
    async fetchFromAPI(sinceDate = null) {
      const url = this.buildApiUrl(sinceDate);
      const response = await axios.get(url);

      if (!response.data?.items) {
        throw new Error("Invalid API response structure");
      }

      return response.data.items.map((item) => ({
        ...item.fields,
        sys: {
          createdAt: item.sys.createdAt,
          id: item.sys.id,
        },
      }));
    },

    /**
     * Merge new comics with cached comics, removing duplicates
     */
    mergeComics(newComics, cachedComics) {
      if (!cachedComics || cachedComics.length === 0) {
        return newComics;
      }

      const existingIds = new Set(cachedComics.map((comic) => comic.id));
      const uniqueNewComics = newComics.filter(
        (comic) => !existingIds.has(comic.id)
      );

      const merged = [...uniqueNewComics, ...cachedComics];

      merged.sort((a, b) => {
        const dateA = new Date(a.sys?.createdAt || 0);
        const dateB = new Date(b.sys?.createdAt || 0);
        return dateB - dateA;
      });

      return merged;
    },

    /**
     * Check for new content and merge with cache
     */
    async checkForNewContent() {
      const cachedComics = this.loadFromCache();
      if (!cachedComics || cachedComics.length === 0) {
        return await this.fetchFullContent();
      }

      try {
        const latestDate = this.getLatestComicDate();

        if (!latestDate) {
          console.log("No latest date found, doing full refresh");
          return await this.fetchFullContent();
        }

        console.log(`Checking for new comics since ${latestDate}`);
        const newComics = await this.fetchFromAPI(latestDate);

        if (newComics.length === 0) {
          console.log("No new comics found");
          this.newComicsCount = 0;
          this.initializeComics(cachedComics);
          this.updateLastCheckTime();
          return;
        }

        console.log(`Found ${newComics.length} new comic(s)`);
        this.newComicsCount = newComics.length;

        const mergedComics = this.mergeComics(newComics, cachedComics);

        this.initializeComics(mergedComics);
        this.saveToCache(mergedComics);
        this.updateLastCheckTime();

        return newComics;
      } catch (error) {
        console.error("Error checking for new content:", error);
        this.initializeComics(cachedComics);
        throw error;
      }
    },

    /**
     * Fetch all content from API (full refresh)
     */
    async fetchFullContent() {
      console.log("Fetching all comics from API");
      const comics = await this.fetchFromAPI();

      if (comics.length === 0) {
        throw new Error("No comics received from API");
      }

      this.newComicsCount = 0;
      this.initializeComics(comics);
      this.saveToCache(comics);
      this.updateLastCheckTime();

      return comics;
    },

    /**
     * Main method to fetch comic content (smart fetching)
     */
    async fetchContent() {
      if (this.loading) return;

      this.loading = true;
      this.error = null;

      try {
        const cachedComics = this.loadFromCache();
        if (cachedComics && cachedComics.length > 0) {
          this.initializeComics(cachedComics);
        }

        if (this.needsFullRefresh()) {
          console.log("Cache expired, doing full refresh");
          await this.fetchFullContent();
        } else if (this.shouldCheckForNewContent()) {
          console.log("Checking for new content");
          await this.checkForNewContent();
        } else {
          console.log("Using fresh cache, no update needed");
        }
      } catch (error) {
        console.error("Error fetching comic data:", error);
        this.error = error.message || "Failed to load comics";

        const cachedComics = this.loadFromCache();
        if (cachedComics && cachedComics.length > 0) {
          console.warn("Using cached data as fallback");
          this.initializeComics(cachedComics);
          this.error = "Showing cached data (update failed)";
        }
      } finally {
        this.loading = false;
      }
    },

    /**
     * Clear all cached data
     */
    clearCache() {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    },

    /**
     * Force refresh from API (full fetch)
     */
    async forceRefresh() {
      this.clearCache();
      await this.fetchContent();
    },

    /**
     * Manually trigger check for new content
     */
    async refreshNewContent() {
      if (this.loading) return;

      this.loading = true;
      this.error = null;

      try {
        await this.checkForNewContent();
      } catch (error) {
        this.error = "Failed to check for new content";
      } finally {
        this.loading = false;
      }
    },
  },
});
