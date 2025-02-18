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
    id: "5",
    picUrl:
      "https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Dog 1",
  },
  {
    id: "6",
    picUrl:
      "https://images.pexels.com/photos/1346086/pexels-photo-1346086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Dog 2",
  },
  {
    id: "7",
    picUrl:
      "https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Dog 3",
  },
  {
    id: "8",
    picUrl:
      "https://images.pexels.com/photos/594687/pexels-photo-594687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Dog 4",
  },
];

export const handlers = [
  http.get("https://api.images.com/kitties", async () => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    return HttpResponse.json<PictureInfo[]>(kitties);
  }),
  http.get("https://api.images.com/puppies", async () => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    return HttpResponse.json<PictureInfo[]>(puppies);
  }),
];
