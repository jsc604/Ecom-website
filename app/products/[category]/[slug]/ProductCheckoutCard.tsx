import { Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Paper } from '@mui/material';

interface ProductCheckoutCardProps {
  itemSubtotal: number;
  setItemSubtotal: Dispatch<SetStateAction<number>>;
  countInStock: number;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export default function ProductCheckoutCard({ itemSubtotal, setItemSubtotal, countInStock, quantity, setQuantity }: ProductCheckoutCardProps) {

  if (countInStock < 1) {
    setItemSubtotal(0);
  };

  const increase = () => {
    if (countInStock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Paper elevation={2}>
    <Card  sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4'>${itemSubtotal}</Typography>
        <CardActions>
          <ButtonGroup size="small" aria-label="quantity selection button group" variant='outlined'>
            <Button onClick={decrease} color='info' disabled={quantity <= 1} >
              <Typography variant="h5">-</Typography>
            </Button>
            <Box component="span" sx={{ padding: '6px 16px', border: '1px solid #4fc3f7' }}>
              <Typography>{countInStock < 1 ? 0 : quantity}</Typography>
            </Box>
            <Button onClick={increase} color='info' disabled={quantity >= countInStock} >
              <Typography variant="h5">+</Typography>
            </Button>
          </ButtonGroup>
        </CardActions>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color='success' variant='contained' sx={{ width: '100%' }} className='bg-green-600'>Add to Cart</Button>
      </CardActions>
    </Card>
    </Paper>
  )
}
