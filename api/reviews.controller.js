import reviewsDAO from "../dao/reviewsDAO.js"

export default class reviewsCtrl{
    
    //posting a review
    static async apiPostReview(req, res, next){
        try{
            const movieId = parseInt(req.body.movieId)
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await reviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({ status: "success"})
        } catch(e){
            res.status(500).json({ error: e.message})
        }
    }

    //gettng a review
    static async apiGetReview(req, res, next){
        try{
            //id means the review id and not the movie id
            let id = req.params.id || {}
            let review = await reviewsDAO.getReview(id)
            if(!review){
                res.status(404).json({ error: "Reviews not found!"})
                return
            }
            res.json(review)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({ error: e})
        }
    }

    //updating a review
    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await reviewsDAO.updateReview(
                reviewId,
                user,
                review
            )
            //similar to let error = reviewResponse.error
            let { error } = reviewResponse
            if(error){
                res.status(400).json({ error })
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error("Unable to update review")
            }

            res.json({ status: "success" })
        } catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    //deleting reviews
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.params.id
            const reviewResponse = await reviewsDAO.deleteReview(reviewId)
            res.json({ status: "success" })
        } catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    //getting all the reviews for a particular movie
    static async apiGetReviews(req, res, next){
        try{
            //the id here is not review id but the movie id
            let id = req.params.id || {}
            let reviews = await reviewsDAO.getReviewsByMovieId(id)
            if(!reviews){
                res.status(400).json({ error: "Reviews not found!" })
                return
            }
            res.json(reviews)
        }catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}