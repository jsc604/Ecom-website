'use client'

import Image from 'next/image'
import { Key } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Deal } from '../admin/settings/page'
import Link from 'next/link'

export default function DealsCarousel({ deals }: { deals: Deal[] }) {

  return (
    <Carousel
      animation="slide"
      className='mt-4 sm:mt-8'
    >
      {deals.map((deal, i: Key) => (
        <div key={i} className="relative aspect-[3/1]">
          <Link href={deal.link}>
            <Image
              src={deal.image}
              alt={`Deal ${deal.dealNum}`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="100vw"
            />
          </Link>
        </div>
      ))}
    </Carousel>
  )
}
