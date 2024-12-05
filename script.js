//Declaring constants

/**
 * The API_LINK contains the API key that searches for the results in the database, by default it is showing the most popular movies.
 * The IMG_PATH contains the path of an image which will be added after the query being searched in the search bar.
 * The SEARCH_API adds the query search after the API link to search for the results.
 */
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e0d8b4ba851de133ce7a1f2c0e2e9d7d&page=1';
const IMG_PATH = 'https://image.tmdb.org/3/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=e0d8b4ba851de133ce7a1f2c0e2e9d7d&query=';

/**
 * These are the three elements of form and main functionality of form.
 * 
 * The main has ID section that will show the movie results.
 * The form has ID form and search has ID query used to collect search data.
 */
let main = document.getElementById("section");
let form = document.getElementById("form");
let search = document.getElementById("query");

//Calling the APILINK function by default to show the popular movies.
returnMovies(APILINK)


/**
 * 
 * This is the main function of the program.
 * 
 * @param {Url-link} url 
 * The functions fetch url-link and the response then extract the JSON file which will be sent to the inner function.
 * The inner function process the JSON file and console.log the results, for each JSON items the new card being made,
 * 
 */
function returnMovies(url){
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        console.log(data.results);
        //for each JSON element
        data.results.forEach(element => {
            //creating a new card
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_col = document.createElement('div');
            div_col.setAttribute('class', 'col');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const desc = document.createElement('div');
            desc.setAttribute('class', 'description');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');
            

            //changing the overview of the movie
            desc.innerHTML = element.overview;

            //changing the title of the movie by parsing the title of JSON element
            title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;

            //the src attribute of the image tag is modified as the path of IMG_PATH + element.poster_path (poster_path is an inner attribute of HTML)
            image.src = IMG_PATH + element.poster_path;


            //appending all elements
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_card.appendChild(desc);
            div_col.appendChild(div_card);
            div_row.appendChild(div_col);
            main.appendChild(div_row);
        });
    });
}

//setting event listner
/**Every time the form is submit, the main HTML becomes empty */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    //value of the search bar
    const searchedItem = search.value;

    //if not null then SEARCH_API with searchedItem returns the new card
    if(searchedItem){
        returnMovies(SEARCH_API + searchedItem);
        //the search bar becomes empty everytime anything is being searched
        search.value = '';
    }
});