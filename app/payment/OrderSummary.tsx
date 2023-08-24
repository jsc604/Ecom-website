import { Typography, Card, Box, Collapse, Divider, List, ListItem, ListItemButton } from "@mui/material"
import { useState } from "react";
import { ShoppingBagOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import Image from "next/image";
import { ItemInfo } from "../cart/page";

interface PageProps {
  cartItemsInfo: ItemInfo[];
  subtotal: number;
  shippingPrice: number;
}

export default function OrderSummary({ cartItemsInfo, subtotal, shippingPrice }: PageProps) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card>
      <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Order Summary</Typography>
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
                      <Box className="max-sm:hidden" sx={{ position: 'relative', aspectRatio: 1 / 1, width: 1 / 4, minWidth: '60px', borderRadius: 6, marginBottom: 'auto' }} >
                        <Image
                          src={item.product.featuredImage}
                          alt={item.product.name}
                          fill
                          loading="lazy"
                          className="object-cover rounded-md"
                          sizes="(max-width: 639px) 0px, (max-width: 1023px) 110px, 73px"
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
        <div className='space-y-4 p-4'>
          <Divider />
          <div className='flex justify-between items-start'>
            <div className="font-semibold">Subtotal</div>
            <div>${subtotal.toFixed(2)}</div>
          </div>
          <div className='flex justify-between items-start'>
            <div className="font-semibold">Shipping</div>
            <div>{subtotal > 200 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</div>
          </div>
          <Divider />
          <div className='flex justify-between items-start'>
            <div className="font-semibold">Total</div>
            <div>${subtotal > 200 ? subtotal.toFixed(2) : (subtotal + shippingPrice).toFixed(2)}</div>
          </div>
        </div>
      </List>
    </Card>
  )
}
