import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function ProductBreadcrumbs({ category }: { category: string }) {
  return (
    <div role="presentation" onClick={handleClick} className='capitalize'>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/products" className='hover:underline'>
          products
        </Link>
        <Link color="inherit" href={`/products/${category}`} className='hover:underline'>
          {category}
        </Link>
      </Breadcrumbs>
    </div>
  )
}