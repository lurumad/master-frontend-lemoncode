import { delay, http, HttpResponse } from "msw";

const kitties: PictureInfo[] = [
  {
    id: "1",
    picUrl:
      "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Cool Cat 1",
  },
  {
    id: "2",
    picUrl:
      "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Cool Cat 2",
  },
  {
    id: "3",
    picUrl:
      "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Cool Cat 3",
  },
  {
    id: "4",
    picUrl:
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Cool Cat 4",
  },
];

const puppies: PictureInfo[] = [
  {
    id: "1",
    picUrl: "/images/puppies-1.jpg",
    title: "Dog 1",
  },
  {
    id: "2",
    picUrl: "/images/puppies-2.jpg",
    title: "Dog 2",
  },
  {
    id: "3",
    picUrl: "/images/puppies-3.jpg",
    title: "Dog 3",
  },
  {
    id: "4",
    picUrl: "/images/puppies-4.jpg",
    title: "Dog 4",
  },
];

export const handlers = [
  http.get("https://api.images.com/kitties", async ({ request }) => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    return HttpResponse.json<PictureInfo[]>(kitties);
  }),
  http.get("https://api.images.com/puppies", async ({ params }) => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    return HttpResponse.json<PictureInfo[]>(puppies);
  }),
];
