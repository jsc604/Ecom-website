'use client'

import { Card, CardActionArea, CardContent, Rating, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export interface ItemOptions {
  size: string;
  price: number;
  countInStock: number;
}

interface ProductItemProps {
  name: string;
  image: string;
  options: ItemOptions[];
  category: string;
  slug: string;
  rating?: number;
}

export default function ProductItem({ name, image, options, category, slug, rating }: ProductItemProps) {

  return (
    <Card key={name} className="w-full rounded-md shadow-lg hover:shadow-gray-700 rounded-md">
      <Link href={`/products/${category}/${slug}`}>
        <CardActionArea>
          <div className="relative aspect-square">
            <Image
              src={image}
              alt="Product image"
              fill
              loading="lazy"
              className="object-cover"
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
          <CardContent className="text-center">
            <Typography className="font-semibold">{name}</Typography>
            <Rating value={rating} readOnly />
            <Typography className="text-green-600">
              {options.length > 1 ?
                `$${options[0].price.toFixed(0)} - $${options[options.length - 1].price.toFixed(0)}`
                :
                `$${options[0].price.toFixed(0)}`
              }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}