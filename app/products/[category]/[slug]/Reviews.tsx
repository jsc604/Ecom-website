'use client'

import { Store } from "@/utils/StoreProvider"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Rating from "@mui/material/Rating"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { FormEvent, MouseEvent, useContext, useEffect, useState } from "react"
import { productObject } from "../../page"
import { toast } from "react-toastify"
import { toastOptions } from "@/utils/toastOptions"
import { Divider } from "@mui/material"

type review = {
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
  return totalRating / reviews.length;
}

export default function Reviews({ reviews, product }: { reviews: review[], product: productObject }) {
  const { userInfo } = useContext(Store);
  const [reviewData, setReviewData] = useState(reviews);
  const [rating, setRating] = useState<number>();
  const [comment, setComment] = useState<string>();
  const [userRating, setUserRating] = useState<number | null>(0);
  const [name, setName] = useState('anonymous');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const avgRating = calculateAverageRating(reviewData);
    setRating(avgRating);
  }, [reviewData]);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?itemId=${encodeURIComponent(JSON.stringify(product._id))}`);
    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    setReviewData(data);
    return;
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    let headers: { 'Content-Type': string, authorization?: string } = {
      'Content-Type': 'application/json',
    }

    if (userInfo?.token) {
      headers.authorization = `Bearer ${userInfo.token}`;
    }

    const res = await fetch(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({ comment, userRating, itemId: product._id, name }),
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(`${data.message}`, toastOptions);
      return;
    }

    toast.success(`${data.message}`, toastOptions);
    fetchReviews();
    setLoading(false);
  };

  return (
    <>
      <Divider />
      <div>
        
      </div>
      <List>
        <ListItem>
          <Typography variant="h4">
            Customer Reviews
          </Typography>
        </ListItem>
        {reviewData.length === 0 ? <ListItem>No reviews</ListItem> : (
          reviewData.map((review) => (
            <ListItem key={review._id}>
              <Grid container>
                <Grid item >
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <Typography>{review.createdAt.substring(0, 10)}</Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly></Rating>
                  <Typography>{review.comment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))
        )}
        <ListItem>
          <form onSubmit={submitHandler}>
            <List>
              <ListItem>
                <Typography variant="h6">Leave your review</Typography>
              </ListItem>
              {!userInfo &&
                <ListItem>
                  <TextField
                    required
                    multiline
                    variant="outlined"
                    fullWidth
                    name="name"
                    label="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </ListItem>
              }
              <ListItem>
                <TextField
                  required
                  multiline
                  variant="outlined"
                  fullWidth
                  name="review"
                  label="Enter comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <Rating
                  name="simple-controlled"
                  value={userRating}
                  onChange={(event, newValue) => setUserRating(newValue)}
                />
              </ListItem>
              <ListItem>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="info"
                  className="bg-info-dark"
                >
                  Submit
                </Button>

                {loading && <CircularProgress></CircularProgress>}
              </ListItem>
            </List>
          </form>
        </ListItem>
      </List>
    </>
  )
}
