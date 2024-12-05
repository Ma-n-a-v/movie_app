import { ObjectId } from "mongodb"

let reviews

export default class reviewsDAO{
    //establishing the connection
    static async injectDB(connection){
        if(reviews){
            return
        }
        try{
            reviews = await connection.db("reviews").collection("reviews")
        }catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    //adding a review for the movie
    static async addReview(movieId, user, review){
        try{
            const reviewDoc = {
                movieId: movieId.toString(),
                user: user,
                review: review,
            }
            //insertOne() is a mongodb function for inserting a document
            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(`Unable to post reviews: ${e} `)
            return { error: e }
        }
    }

    //getting the reviews
    static async getReview(reviewId){
        try{
            const objId = new ObjectId(reviewId)
            return await reviews.findOne({ _id: objId })
        }catch(e){
            console.error(`Unable to get reviews: ${e}`)
            return { error: e.message }
        }
    }

    //updating reviews
    static async updateReview(reviewId, user, review){
        try{
            const objId = new ObjectId(reviewId)
            const updateResponse = await reviews.updateOne(
                { _id: objId },
                //$set is specific to mongodb
                { $set: { user: user, review: review }}
            )
            return updateResponse
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    //deleting review
    static async deleteReview(reviewId){

        try{
            const objId = new ObjectId(reviewId)
            const deleteResponse = await reviews.deleteOne({
                _id: objId
            })

            return deleteResponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

    //all other implementations particularly getReviewsByMovieId
    static async getReviewsByMovieId(movieId){
        console.log("mov", movieId)
        try{
            let cursor = await reviews.find({ movieId: movieId })
            return cursor.toArray()
        }catch(e){
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }
}