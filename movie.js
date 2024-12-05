//Declaring constants
const url = new URL(location.href)
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")
const APILINK = 'http://localhost:8000/api/v1/reviews/';

let main = document.getElementById("section");
let title = document.getElementById("title");

title.innerText = movieTitle;

const div_new = document.createElement('div')
div_new.innerHTML = `
    <div class="row"?
        <div class="col">
            <div class="card">
            New Review
            <p><strong>Review: </strong>
                <input type="text" id="new_review" value="">
            </p>
            <p><strong>User: </strong>
                <input type="text" id="new_user" value="">
            </p>
            <p><a href="#" onclick="saveReview('new_review', 'new_user')">Save</a>
            </p>
` 
main.appendChild(div_new)
//Calling the APILINK function by default to show the popular movies.
returnReviews(APILINK)
/**
 * 
 * This is the main function of the program.
 * 
 * @param {url-link} url 
 * The functions fetch url-link and the response then extract the JSON file which will be sent to the inner function.
 * The inner function process the JSON file and console.log the results, for each JSON items the new card being made,
 * 
 */
function returnReviews(url){
    fetch(url + "movie/" + movieId)
    .then(res => res.json())
    .then(function(data){
        console.log(data)
        data.forEach(review => {
            //creating a new card
            const div_card = document.createElement('div');
            div_card.setAttribute("class", "row")
            div_card.innerHTML = `
                    <div class="col">
                        <div class="card" id="${review._id}">
                            <p><strong>Review: </strong>${review.review}</p>
                            <p><strong>User: </strong>${review.user}</p>
                            <p class="review_modifier"><a href="#" class="edit_btn" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">Edit</a>
                            <a href="#" class="delete_btn" onclick="deleteReview('${review._id}')">Delete</a></p>
                        </div>
                    </div>
            `
            main.appendChild(div_card);
        });
    });
}


function editReview(id, review, user){
    console.log(review)
    const element = document.getElementById(id)
    console.log(element)
    const reviewInputId = "review" + id
    const userInputId = "user" + id

    element.innerHTML = `
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">Save</a>
        </p>
    `
}
//if no id find then default is empty string
function saveReview(reviewInputId, userInputId, id=''){
    const review = document.getElementById(reviewInputId).value
    const user = document.getElementById(userInputId).value

    if(id){
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json()).then(res => {
            console.log(res)
            location.reload();//reload the webpage and update the data
        });
    } else {
        fetch(APILINK+"new", {
            method: 'Post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'user': user, 'review': review, 'movieId': movieId})
        }).then(res => res.json()).then(res =>
            {
                console.log(res)
                location.reload();
            }
        )
    };
}