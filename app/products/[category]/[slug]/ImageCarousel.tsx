'use client'

import { Opacity } from '@mui/icons-material';
import Image from 'next/image'
import { Key } from 'react';
import Carousel from "react-material-ui-carousel";

interface PageProps {
  images: string[];
  indicatorIcons: JSX.Element[];
}

export default function ImageCarousel({ images, indicatorIcons }: PageProps) {

  const indicatorIconButtonProps = {
    style: { opacity: 0.5 }
  };

  const activeIndicatorIconButtonProps = {
    style: { opacity: 1 }
  };

  return (
    <Carousel
      animation="slide"
      autoPlay={false}
      IndicatorIcon={indicatorIcons}
      indicatorIconButtonProps={indicatorIconButtonProps}
      activeIndicatorIconButtonProps={activeIndicatorIconButtonProps}
    >
      {images.map((image, i: Key) => (
        <div key={i} className="relative aspect-square">
          <Image
            src={image}
            alt={image}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 899px) 100vw, 50vw"
          />
        </div>
      ))}
    </Carousel>
  )
}
