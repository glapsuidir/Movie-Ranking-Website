const movieForm = document.getElementById('movie-form');
const movieTitle = document.getElementById('movie-title');
const movieCover = document.getElementById('movie-cover');
const movieRating = document.getElementById('movie-rating');
const moviesList = document.getElementById('movies');

let movies = []; // Array to store movie objects

// Load movies from LocalStorage on page load
window.onload = loadMovies;

// Handle movie form submission
movieForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const title = movieTitle.value.trim();
    const cover = movieCover.value.trim();
    const rating = parseFloat(movieRating.value);

    if (title && cover && !isNaN(rating)) {
        // Create a new movie object
        const movie = { title, cover, rating };

        // Add movie to the array
        movies.push(movie);

        // Save the movie to LocalStorage
        localStorage.setItem('movies', JSON.stringify(movies)); // Save the whole array
        
        // Clear the form inputs
        movieTitle.value = '';
        movieCover.value = '';
        movieRating.value = '';

        // Update the movie list display
        displayMovies();
    }
});

// Function to load movies from LocalStorage
function loadMovies() {
    const savedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    movies = savedMovies; // Populate the movies array from LocalStorage
    displayMovies(); // Display the loaded movies
}

// Function to display movies in the list
function displayMovies() {
    // Clear the current movie list
    moviesList.innerHTML = '';

    // Sort movies by rating
    movies.sort((a, b) => b.rating - a.rating); // Descending order

    // Add each movie to the list
    movies.forEach((movie, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${movie.cover}" alt="${movie.title} Cover" style="width: 100px; height: auto;">
            <strong>${movie.title}</strong> - Rating: ${movie.rating.toFixed(1)}
            <button onclick="editMovie(${index})">Edit</button>
            <button onclick="deleteMovie(${index})">Delete</button>
        `;
        moviesList.appendChild(listItem);
    });
}

// Function to edit a movie
function editMovie(index) {
    const movie = movies[index]; // Get the movie object by index

    // Set the input fields with the movie's current details
    movieTitle.value = movie.title;
    movieCover.value = movie.cover;
    movieRating.value = movie.rating;

    // Remove the movie from the array
    movies.splice(index, 1);

    // Update the LocalStorage
    localStorage.setItem('movies', JSON.stringify(movies));

    // Update the display
    displayMovies();
}

// Function to delete a movie
function deleteMovie(index) {
    // Remove the movie from the array
    movies.splice(index, 1);

    // Update the LocalStorage
    localStorage.setItem('movies', JSON.stringify(movies));

    // Update the display
    displayMovies();
}
