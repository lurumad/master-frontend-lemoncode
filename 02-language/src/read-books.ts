const isBookRead = (books: Array<string>, title: string): boolean => {
  return (
    books.find((book) => titlesMatch(book.title, title) && book.isRead) !==
    undefined
  );
};

const titlesMatch = (bookTitle: string, searchTitle: string): boolean =>
  bookTitle.localeCompare(searchTitle, undefined, { sensitivity: "base" }) ===
  0;

module.exports = {
  isBookRead,
};
