import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

//using middleware
/**
 * using cors middlewrae basically the express module in cors
 */
app.use(cors())     
/**
 * This will allow our server to accept json in the body of a request,
 * So if someone sends a GET request or POST request to our server it'll be able to read in json. 
 */
app.use(express.json())     

//specifing routes
/**
 * We will pass in the URL, if we ever route URL its gonna be api/v1/reviews. 
 * Its often a best practice to mention the version since in the future we are going to have another version.
 * For this URL we are going to route from the file api/reviews.route.js.
 */
app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => {
    res.status(404).json({error: "404 page not found"})
})

export default app