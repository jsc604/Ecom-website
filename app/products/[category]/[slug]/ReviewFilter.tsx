import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { review } from './Reviews';

interface PageProps {
  reviewData: review[];
  setFilteredReviews: React.Dispatch<React.SetStateAction<review[]>>
}

export default function ReviewFilter({ reviewData, setFilteredReviews }: PageProps) {
  const [state, setState] = React.useState({
    five: false,
    four: false,
    three: false,
    two: false,
    one: false,
  });
  const { five, four, three, two, one } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  React.useEffect(() => {
    const filterRatings = () => {
      const checkedRatings: number[] = [];
      for (const number in state) {
        if (number === 'five' && state[number]) {
          checkedRatings.push(5);
        }
        if (number === 'four' && state[number]) {
          checkedRatings.push(4);
        }
        if (number === 'three' && state[number]) {
          checkedRatings.push(3);
        }
        if (number === 'two' && state[number]) {
          checkedRatings.push(2);
        }
        if (number === 'one' && state[number]) {
          checkedRatings.push(1);
        }
      }

      const filteredRatings = reviewData.filter(review => {
        return checkedRatings.includes(Math.floor(review.rating));
      });

      if (checkedRatings.length === 0) {
        setFilteredReviews(reviewData);
      } else {
        setFilteredReviews(filteredRatings);
      }
    }

    filterRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [five, four, three, two, one, reviewData]);

  let numReviews: number[] = new Array(6).fill(0);
  reviewData.forEach((review) => {
    const rating = Math.floor(review.rating);
    numReviews[rating]++;
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Rating</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={five} onChange={handleChange} name="five" />
            }
            label={`5 Star (${numReviews[5]})`}
          />
          <FormControlLabel
            control={
              <Checkbox checked={four} onChange={handleChange} name="four" />
            }
            label={`4 Star (${numReviews[4]})`}
          />
          <FormControlLabel
            control={
              <Checkbox checked={three} onChange={handleChange} name="three" />
            }
            label={`3 Star (${numReviews[3]})`}
          />
          <FormControlLabel
            control={
              <Checkbox checked={two} onChange={handleChange} name="two" />
            }
            label={`2 Star (${numReviews[2]})`}
          />
          <FormControlLabel
            control={
              <Checkbox checked={one} onChange={handleChange} name="one" />
            }
            label={`1 Star (${numReviews[1]})`}
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}