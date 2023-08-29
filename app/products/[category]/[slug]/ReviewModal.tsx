import * as React from 'react';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import { Store } from '@/utils/StoreProvider';
import { toast } from 'react-toastify';
import { toastOptions } from '@/utils/toastOptions';
import { review } from './Reviews';
import { styled } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface PageProps {
  itemId: string;
  setReviewData: React.Dispatch<React.SetStateAction<review[]>>;
}

export default function ReviewModal({ itemId, setReviewData }: PageProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { userInfo } = React.useContext(Store);
  const [comment, setComment] = React.useState<string>();
  const [userRating, setUserRating] = React.useState<number | null>(0);
  const [name, setName] = React.useState('anonymous');
  const [loading, setLoading] = React.useState(false);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?itemId=${encodeURIComponent(JSON.stringify(itemId))}`);
    const data = await Promise.resolve(res.json());

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    setReviewData(data);
    return;
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
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
      body: JSON.stringify({ comment, userRating, itemId, name }),
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
    <div>
      <Button color='info' variant='contained' sx={{ width: '100%' }} className='bg-info-dark' size='large' onClick={handleOpen}>Write a review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  precision={0.5}
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
                  sx={{ mr: 2 }}
                  disabled={!name.trim() || !comment?.trim() || userRating === 0}
                >
                  Submit
                </Button>
                {loading && <CircularProgress></CircularProgress>}
              </ListItem>
            </List>
          </form>
        </Box>
      </Modal>
    </div>
  );
}