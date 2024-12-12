import { isBookRead } from "../src/exercises/read-books"
import type { Book } from "../src/exercises/read-books"
import { expect, test } from "@jest/globals"

test("checks if a book is read based on the title", () => {
  const books: Array<Book> = [
    { title: "Harry Potter y la piedra filosofal", isRead: true },
    { title: "Canción de hielo y fuego", isRead: false },
    { title: "Devastación", isRead: true },
  ];

  expect(isBookRead(books, "devastación")).toBe(true);
  expect(isBookRead(books, "Canción de hielo y fuego")).toBe(false);
  expect(isBookRead(books, "Los Pilares de la Tierra")).toBe(false);
});
