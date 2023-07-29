import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { ItemOptions } from '@/app/components/ProductItem';
import { Alert } from '@mui/material';

interface ProductSizesProps {
  options: ItemOptions[];
  setQuantity: Dispatch<SetStateAction<number>>;
  selectedItem: ItemOptions;
  setSelectedItem: Dispatch<SetStateAction<ItemOptions>>;
}

export default function ProductSizes({ options, setQuantity, selectedItem, setSelectedItem }: ProductSizesProps) {

  const handleClick = (item: ItemOptions) => {
    if (selectedItem !== item) {
      setSelectedItem(item);
      setQuantity(1);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <List component="nav" aria-label="product sizes" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {options.map((item, index) => (
          <Button
            key={index}
            variant={selectedItem === item ? 'contained' : 'outlined'}
            color='info'
            onClick={() => handleClick(item)}
            className={selectedItem === item ? 'bg-info-dark' : 'inhertit'}
            sx={{ minWidth: 'fit-content' }}
          >
            {item.size}
          </Button>
        ))}
      </List>
      {selectedItem.countInStock <= 4 && selectedItem.countInStock > 0 &&
        <Alert severity="warning" sx={{ border: 1, borderColor: '#ffa726', width: 'fit-content' }}>Hurry, only a few left!</Alert>
      }
      {selectedItem.countInStock === 0 && <Alert severity="error" sx={{ border: 1, borderColor: '#f44336', width: 'fit-content' }}>Sold out!</Alert>}
    </Box>
  );
}
