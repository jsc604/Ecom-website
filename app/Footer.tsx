import Image from "next/image"
import Link from "next/link"
import { Key } from "react";

function Copyright() {
  return (
    <div color="white">
      {'Copyright © '}
      <Link color="inherit" href="/" className="underline">
        Ecom MN
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </div>
  );
}

export default function Footer({ categories }: { categories: string[] }) {
  return (
    <footer className="flex flex-col items-center bg-[#27272a] text-white mt-auto p-8 font-extralight">
      <div className="flex max-sm:flex-col max-sm:space-y-8 justify-evenly w-full max-w-[1350px] mb-8">
        <div className="max-sm:mx-auto">
          <div className="relative aspect-video max-w-[200px] mx-auto">
            <Image
              src={'/../public/images/logo.avif'}
              alt='logo'
              fill
              loading="lazy"
              className="object-cover rounded-md"
              sizes="200px"
            />
          </div>
          <div className="mt-2">
            Your company description here
          </div>
        </div>

        <div className="flex max-sm:justify-between sm:hidden">
          <div className="flex flex-col space-y-1">
            <div className="font-semibold mb-2">Shop</div>
            <Link className="hover:underline" href={'/products'}>All Products</Link>
            {categories.map((category: string, index: Key) => (
              <Link key={index} href={`/products/${category}`} className="hover:underline" >{category}</Link>
            ))}
          </div>

          <div className="flex flex-col space-y-1">
            <div className="font-semibold mb-2">Company</div>
            <Link className="hover:underline" href={'/'}>About Us</Link>
            <Link className="hover:underline" href={'/'}>Contact</Link>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="font-semibold mb-2">Support</div>
            <Link className="hover:underline" href={'/'}>FAQs</Link>
            <Link className="hover:underline" href={'/'}>Cookie Policy</Link>
            <Link className="hover:underline" href={'/'}>Terms of Use</Link>
          </div>
        </div>

        <div className="flex flex-col space-y-1 max-sm:hidden">
          <div className="font-semibold mb-2">Shop</div>
          <Link className="hover:underline" href={'/products'}>All Products</Link>
          {categories.map((category: string, index: Key) => (
            <Link key={index} href={`/products/${category}`} className="hover:underline" >{category}</Link>
          ))}
        </div>

        <div className="flex flex-col space-y-1 max-sm:hidden">
          <div className="font-semibold mb-2">Company</div>
          <Link className="hover:underline" href={'/'}>About Us</Link>
          <Link className="hover:underline" href={'/'}>Contact</Link>
        </div>

        <div className="flex flex-col space-y-1 max-sm:hidden">
          <div className="font-semibold mb-2">Support</div>
          <Link className="hover:underline" href={'/'}>FAQs</Link>
          <Link className="hover:underline" href={'/'}>Cookie Policy</Link>
          <Link className="hover:underline" href={'/'}>Terms of Use</Link>
        </div>
      </div>

      <Copyright />
    </footer>
  )
}