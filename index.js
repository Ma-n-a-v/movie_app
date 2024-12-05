import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
//Date Access Object module
import reviewsDAO from "./dao/reviewsDAO.js"
const mongoClient = mongodb.MongoClient

const uri = `mongodb+srv://manupatel3345:Nita*2664@cluster0.ocjfzji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000

mongoClient.connect(
    uri,
    {
        maxPoolSize: 50,        //declaring amount of people connecte to the mongodb client at the same time.
        wtimeoutMS : 2500,     //declaring the time after which the server timeout try to connect to the database.
        useNewUrlParser : true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1) //fancy way to exit the program
    })
    .then( async client => {
        await reviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
