'use client'
import { productObject } from '@/app/products/page';
import { Add, Delete, Edit } from '@mui/icons-material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Divider, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import LoadingSkeleton from './LoadingSkeletion';
import ProductNav from './ProductNav';

interface PageProps {
  products: productObject[]
}

export default function AdminProducts({ products }: PageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categoriesSet = new Set();

  products.map(product => {
    if (product.category) {
      categoriesSet.add(product.category);
    }
  });

  const categories = Array.from(categoriesSet) as string[];

  const filterCategories = (products: productObject[], category: string) => {
    return products.filter((product) => product.category === category)
  }

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = filterCategories(products, selectedCategory);
      setFilteredProducts(filtered)
    }

  }, [selectedCategory])

  return (
    <>
      <Button><Add /> Add New Product</Button>
      <ProductNav categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>IMAGE</TableCell>
              <TableCell>CATEGORY</TableCell>
              <TableCell>BRAND</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>OPTIONS</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!products ? (
              <>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </>
            ) : (
              <>
                {filteredProducts.map((product) => {
                  return (
                    <TableRow key={product._id}>

                      <TableCell sx={{ color: blue[800], textDecoration: 'underline' }}>
                        <Link href={`/products/${product.category}/${product.slug}`}>
                          {`${product._id.substring(0, 4)}...${product._id.substring(20, 24)}`}
                        </Link>
                      </TableCell>

                      <TableCell >
                        <Box sx={{ position: 'relative', aspectRatio: 1 / 1 }}>
                          <Image src={product.image} fill alt={product.slug} />
                        </Box>
                      </TableCell>

                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.name}</TableCell>

                      <TableCell>
                        {product.options.map((option, index) => {
                          const isLastItem = index === product.options.length - 1;
                          return (
                            <Box key={option._id}>
                              <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', color: option.countInStock < 10 ? 'red' : 'black' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}><span className='font-semibold'>size: </span>{option.size}</Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}><span className='font-semibold'>price: </span>${option.price}</Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}><span className='font-semibold'>stock: </span>{option.countInStock}</Box>
                              </Box>
                              {!isLastItem && <Divider />}
                            </Box>
                          )
                        })}
                      </TableCell>
                      <TableCell>
                        <Button color='primary' onClick={() => { }}><Edit /></Button>
                        <Button color='error' onClick={() => { }}><Delete /></Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
