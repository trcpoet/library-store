let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books'); //HTML container where books will be displayed

  booksWrapper.classList += ' books__loading' //Loading state that indicated visually that books are being loaded 

  if (!books) { //Avoids refetching every time you filter by checking if books have already been retrieved 
  books = await getBooks(); //Fetch books if not already available
  }
  // const books = await getBooks()
  booksWrapper.classList.remove('books__loading') //Remove loading state


  if (filter === 'LOW_TO_HIGH') { 
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  }
  else if (filter === "HIGH_TO_LOW") {
    books.sort((a,b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  }
  else if (filter === "RATING") {
    books.sort((a,b) => b.rating - a.rating);
  }

  const booksHtml = books //Generate HTML for all books
  .map((book) => { //Uses map() to create/generate an HTML for each book(image, title, rating, price)
    return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src= "${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
    ${ratingsHTML(book.rating)} 
    </div>
     ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`;
  }).join("")

  //Uses helper functions ratingsHTML() for stars and priceHTML for price formatting. join("") flattens the array into one HTML string

  booksWrapper.innerHTML = booksHtml; //📥 7. Replace current book HTML with new sorted/displayed books:

  // booksWrapper.innerHTML = booksHtml.join('');
}


function priceHTML(originalPrice, salePrice) { 
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`
  }
  return `<span class = "book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
  // <span class = "book__price--normal">$59.95</span> $14.95

}


function ratingsHTML(rating) {
  let ratingHTML = '';
  for (let i = 0; i< Math.floor(rating); ++i) {
    ratingHTML += '<i class = "fas fa-star"></i>\n'
  }
  if(!Number.isInteger(rating)) {
    ratingHTML +='<i class = "fas fa-star-half-alt"></i>\n'
  }
  return ratingHTML;
}


function filterBooks(event) { //This function connects the filter dropdown or buttons to the rendering logic.
// This function connects the filter dropdown or buttons to the rendering logic.
// Passes the selected filter (event.target.value) to the renderBooks() function.
// This triggers sorting and re-rendering of the book list.
    renderBooks(event.target.value)
}


setTimeout(() => {
  renderBooks("");
});
// FAKE DATA
function getBooks() {
  //FIRST EVER LOADING STATE
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
    {
      id: 1,
      title: "Crack the Coding Interview",
                url: "assets/crack the coding interview.png",
      originalPrice: 49.95,
      salePrice: 14.95,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Atomic Habits",
      url: "assets/atomic habits.jpg",
      originalPrice: 39,
      salePrice: null,
      rating: 5,
    },
    {
      id: 3,
      title: "Deep Work",
      url: "assets/deep work.jpeg",
      originalPrice: 29,
      salePrice: 12,
      rating: 5,
    },
    {
      id: 4,
      title: "The 10X Rule",
      url: "assets/book-1.jpeg",
      originalPrice: 44,
      salePrice: 19,
      rating: 4.5,
    },
    {
      id: 5,
      title: "Be Obsessed Or Be Average",
      url: "assets/book-2.jpeg",
      originalPrice: 32,
      salePrice: 17,
      rating: 4,
    },
    {
      id: 6,
      title: "Rich Dad Poor Dad",
      url: "assets/book-3.jpeg",
      originalPrice: 70,
      salePrice: 12.5,
      rating: 5,
    },
    {
      id: 7,
      title: "Cashflow Quadrant",
      url: "assets/book-4.jpeg",
      originalPrice: 11,
      salePrice: 10,
      rating: 4,
    },
    {
      id: 8,
      title: "48 Laws of Power",
      url: "assets/book-5.jpeg",
      originalPrice: 38,
      salePrice: 17.95,
      rating: 4.5,
    },
    {
      id: 9,
      title: "The 5 Second Rule",
      url: "assets/book-6.jpeg",
      originalPrice: 35,
      salePrice: null,
      rating: 4,
    },
    {
      id: 10,
      title: "Your Next Five Moves",
      url: "assets/book-7.jpg",
      originalPrice: 40,
      salePrice: null,
      rating: 4,
    },
    {
      id: 11,
      title: "Mastery",
      url: "assets/book-8.jpeg",
      originalPrice: 30,
      salePrice: null,
      rating: 4.5,
    },
  ]);
}, 1000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
});


//Let’s say you visit an online bookstore and see a dropdown labeled "Sort By":

// You click "Rating".

// This triggers filterBooks(event), which grabs the value "RATING" and calls renderBooks("RATING").

// renderBooks sorts all the books by rating (highest first), builds the new HTML, and updates the page.

// renderBooks(filter)	: Fetches and displays books, with sorting and formatting
// filterBooks(event)	: Connects UI interactions to book rendering by passing the filter choice

