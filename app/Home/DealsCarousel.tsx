'use client'

import Image from 'next/image'
import { Key } from 'react'
import Carousel from 'react-material-ui-carousel'

export default function DealsCarousel() {

  const images = [
    '/../public/images/1.jpeg',
    '/../public/images/2.jpeg',
    '/../public/images/3.jpeg',
    '/../public/images/4.jpeg',
    '/../public/images/5.jpeg',
  ]

  return (
    <Carousel
      animation="slide"
      className='mt-4 sm:mt-8'
    >
      {images.map((image, i: Key) => (
        <div key={i} className="relative aspect-[3/1]">
          <Image
            src={image}
            alt={image}
            fill
            loading="lazy"
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}
    </Carousel>
  )
}
