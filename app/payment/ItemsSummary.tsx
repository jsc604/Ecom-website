'use client'
import { ExpandLess, ExpandMore, ShoppingBagOutlined } from "@mui/icons-material";
import { List, ListItemButton, Typography, Collapse, ListItem, Divider, Box, Grid } from "@mui/material";
import { useState } from "react";
import { ItemInfo } from "../cart/CartContainer";
import Image from "next/image";

interface PageProps {
  cartItemsInfo: ItemInfo[];
}

export default function ItemsSummary({ cartItemsInfo }: PageProps) {
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
                <ListItem className="grid grid-cols-4" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box className="col-span-2" sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ position: 'relative', aspectRatio: 1 / 1, width: 1 / 2.5, minWidth: '60px', borderRadius: 6, marginBottom: 'auto' }} >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        loading="lazy"
                        className="object-cover rounded-md"
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{item.product.name}</Typography>
                      <Typography>{item.product.brand}</Typography>
                      <Typography>{item.product.options[item.optionIndex].size}</Typography>
                    </Box>
                  </Box>
                  <Box className="col-span-1" sx={{ marginLeft: 'auto', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600 }}>Quantity</Typography>
                    <Typography>{item.quantity}</Typography>
                  </Box>
                  <Box className="col-span-1" sx={{ marginLeft: 'auto', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600 }}>Item Price</Typography>
                    <Typography>${item.product.options[item.optionIndex].price.toFixed(2)}</Typography>
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
