export function useComicContent() {
  let selectedComic = "ttb";

  const comicContent = [
    {
      id: "0001",
      name: "Do you sell tours",
      image: "https://i.imgur.com/ut6ycpX.jpg",
      slides: [
        "https://i.imgur.com/xSTw2ZY.jpg",
        "https://i.imgur.com/yXPvSnO.jpg",
        "https://i.imgur.com/hNsFHQl.jpg",
      ],
      category: "ttb",
    },
    {
      id: "0002",
      name: "Do you speak English",
      image: "https://i.imgur.com/ut6ycpX.jpg",
      slides: [
        "https://i.imgur.com/xSTw2ZY.jpg",
        "https://i.imgur.com/yXPvSnO.jpg",
        "https://i.imgur.com/hNsFHQl.jpg",
      ],
      category: "ttb",
    },
    {
      id: "0003",
      name: "The questions",
      image: "https://i.imgur.com/ut6ycpX.jpg",
      slides: [
        "https://i.imgur.com/xSTw2ZY.jpg",
        "https://i.imgur.com/yXPvSnO.jpg",
        "https://i.imgur.com/hNsFHQl.jpg",
      ],
      category: "ttb",
    },
  ];

  let comicContentFiltered = comicContent.filter(
    (comic) => comic.category === selectedComic
  );

  const latestComic = comicContentFiltered.length.toString().padStart(4, "0");

  return { comicContent, latestComic };
}
