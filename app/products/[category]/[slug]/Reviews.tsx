'use client'

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { productObject } from "../../page"
import { Box, Button, Card, Divider } from "@mui/material"
import ReviewModal from "./ReviewModal"
import ReviewFilter from "./ReviewFilter"
import { getTimeAgo } from "@/utils/helpers"

export type review = {
  _id: string,
  user: string,
  name: string,
  rating: number,
  comment: string,
  createdAt: string,
}

function calculateAverageRating(reviews: review[]) {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
}

export default function Reviews({ reviews, product }: { reviews: review[], product: productObject }) {
  const [reviewData, setReviewData] = useState(reviews);
  const [rating, setRating] = useState(product.rating);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    const avgRating = calculateAverageRating(reviewData);
    setRating(Number(avgRating));
  }, [reviewData]);

  return (
    <>
      <Divider />
      <Box sx={{ mt: 4 }}>
        <div className="flex gap-4 w-full my-4 flex-col ml:flex-row">
          <Typography variant="h3" sx={{ minWidth: 300 }}>
            Reviews
          </Typography>
          <div className="flex justify-between w-full items-center">
            <Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography>{rating}</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  precision={0.5}
                  readOnly
                />
              </Box>
              <Typography variant="body2">Based on {reviewData.length} reviews</Typography>
            </Box>

            <ReviewModal itemId={product._id} setReviewData={setReviewData} />
          </div>
        </div>

        <div className="flex gap-4 flex-col ml:flex-row">
          <div className="min-w-[300px]">
            <div className="hidden ml:block">
              <Typography>Filter Reviews</Typography>
              <ReviewFilter />
            </div>
            <div className="ml:hidden">
              <Button onClick={handleFilterButtonClick} variant="outlined">
                <Typography>Filter Reviews</Typography>
              </Button>
              {isFilterVisible && <ReviewFilter />}
            </div>
          </div>

          <List sx={{ width: '100%' }}>
            {reviewData.length === 0 ? <ListItem>No reviews</ListItem> : (
              reviewData.map((review) => (
                <ListItem key={review._id} sx={{ width: '100%' }}>
                  <Card sx={{ width: '100%', p: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography>
                        <strong>{review.name}</strong>
                      </Typography>
                      <Typography variant="body2">{getTimeAgo(review.createdAt)}</Typography>
                    </Box>
                    <Rating value={review.rating} readOnly></Rating>
                    <Typography>{review.comment}</Typography>
                  </Card>
                </ListItem>
              ))
            )}
          </List>
        </div>
      </Box>
    </>
  )
}
