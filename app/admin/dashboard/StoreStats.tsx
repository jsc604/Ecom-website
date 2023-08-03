import { Card, CardActionArea, Typography } from "@mui/material"

interface StoreStatsProps {
  category: string;
  data: number | string;
}

export default function StoreStats({ category, data }: StoreStatsProps) {
  return (
    <Card elevation={4} onClick={() => alert('hello')}>
      <CardActionArea sx={{ p: 3 }}>
        <Typography component='h1' variant="h4">{category === 'Sales' ? `$${data}` : data}</Typography>
        <Typography component='h2' variant="h6">{category}</Typography>
      </CardActionArea>
    </Card>
  )
}
