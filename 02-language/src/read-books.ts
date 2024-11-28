export interface Book {
  title: string,
  isRead: boolean
}

export const isBookRead = (books: Array<Book>, title: string): boolean => {
  return (
    books.find((book) => titlesMatch(book.title, title) && book.isRead) !==
    undefined
  );
};

const titlesMatch = (bookTitle: string, searchTitle: string): boolean =>
  bookTitle.localeCompare(searchTitle, undefined, { sensitivity: "base" }) ===
  0;

