'use client'
import { ExpandLess, ExpandMore, ShoppingBagOutlined } from "@mui/icons-material";
import { List, ListItemButton, Typography, Collapse, ListItem, Divider, Box } from "@mui/material";
import { useState } from "react";
import { ItemInfo } from "../cart/CartContainer";
import Image from "next/image";

interface PageProps {
  cartItemsInfo: ItemInfo[];
}

export default function ItemScroll({ cartItemsInfo }: PageProps) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingBagOutlined />
          <Typography component='span'>{cartItemsInfo.length} items</Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List>
          {cartItemsInfo.map((item, index) => {
            const isLastItem = index === cartItemsInfo.length - 1;
            return (
              <div key={index}>
                <ListItem>
                  <Box sx={{ position: 'relative', aspectRatio: 1 / 1, width: 1 / 4, minWidth: '60px', borderRadius: 6, marginBottom: 'auto' }}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      loading="lazy"
                      className="object-cover rounded-md"
                    />
                  </Box>
                  <Box sx={{ width: 3 / 4, marginLeft: 2, marginBottom: 'auto' }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.product.name}</Typography>
                    <Typography>{item.product.brand}</Typography>
                    <Typography>{item.product.options[item.optionIndex].size}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>x{item.quantity}</Typography>
                      <Typography>${(item.product.options[item.optionIndex].price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </ListItem>
                {!isLastItem && <Divider />}
              </div>
            )
          })}
        </List>
      </Collapse>
    </List>
  )
}
