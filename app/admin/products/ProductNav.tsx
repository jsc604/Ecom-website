'use client'
import { capitalizeWord } from '@/utils/helpers';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Dispatch, SetStateAction } from 'react'

interface PageProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export default function ProductNav({ categories, selectedCategory, setSelectedCategory }: PageProps) {
  return (
    <List className="flex">

      <ListItemButton sx={{
        backgroundColor: selectedCategory === 'all' ? blue[50] : 'transparent',
        '&:hover': {
          backgroundColor: blue[50],
        },
      }}
        onClick={() => setSelectedCategory('all')}
      >
        <ListItemText primary="All Products" />
      </ListItemButton>

      {categories.map((category) => (
        <ListItemButton
          key={category}
          sx={{
            backgroundColor: selectedCategory === category ? blue[50] : 'transparent',
            '&:hover': {
              backgroundColor: blue[50],
            },
          }}
          onClick={() => setSelectedCategory(category)}
        >
          <ListItemText primary={capitalizeWord(category)} />
        </ListItemButton>
      ))}

    </List>
  )
}
