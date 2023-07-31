import { Typography, Card } from "@mui/material"
import { useContext } from "react";
import { Store } from "@/utils/StoreProvider";
import { Home, LocalShipping, LocationOn, MyLocation, Person } from "@mui/icons-material";

export default function ShippingSummary() {
  const { shippingInfo } = useContext(Store);

  return (
    <Card  className="space-y-2" sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: 30, fontWeight: 600, textAlign: 'center' }}>Shipping Address</Typography>
      <Typography><Person /> {shippingInfo?.name}</Typography>
      <Typography><Home /> {shippingInfo?.address}</Typography>
      <Typography><LocationOn /> {shippingInfo?.city}, {shippingInfo?.province}, Canada</Typography>
      <Typography><MyLocation /> {shippingInfo?.postalCode}</Typography>
      <Typography><LocalShipping /> {shippingInfo?.shippingOption}</Typography>
    </Card>
  )

}