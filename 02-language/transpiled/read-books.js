export var isBookRead = function (books, title) {
    return (books.find(function (book) { return titlesMatch(book.title, title) && book.isRead; }) !==
        undefined);
};
var titlesMatch = function (bookTitle, searchTitle) {
    return bookTitle.localeCompare(searchTitle, undefined, { sensitivity: "base" }) ===
        0;
};
