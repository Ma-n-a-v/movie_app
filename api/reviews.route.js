import express from "express"
import reviewsCtrl from "./reviews.controller.js"

const router = express.Router()

//Colon indicates that id can be anything means its a variable
router.route("/movie/:id").get(reviewsCtrl.apiGetReviews)
router.route("/new").post(reviewsCtrl.apiPostReview)
router.route("/:id").get(reviewsCtrl.apiGetReview)
                    .put(reviewsCtrl.apiUpdateReview)
                    .delete(reviewsCtrl.apiDeleteReview)

export default router