import { TableRow, TableCell, Skeleton } from '@mui/material'

export default function LoadingSkeleton() {
  return (
    <TableRow>
      <TableCell><Skeleton width="100%" height={50} /> </TableCell>
      <TableCell><Skeleton width="100%" height={50} /> </TableCell>
      <TableCell><Skeleton width="100%" height={50} /> </TableCell>
      <TableCell><Skeleton width="100%" height={50} /> </TableCell>
      <TableCell><Skeleton width="100%" height={50} /> </TableCell>
    </TableRow>
  )
}
