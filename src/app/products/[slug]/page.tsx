"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react'; 

interface Product {
  id: string;
  name: string;
  brand: string;
  compareAtPrice?: number;
  original_price: number;
  rating: number;
  numReviews: number;
  shortDescription: string;
  longDescription: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
  sku: string;
  specifications: { label: string; value: string }[];
  reviews: { id: string; user: string; rating: number; comment: string; date: string }[];
}

// Dummy Product Data
const product: Product = {
  id: 'product-123',
  name: 'Premium Wireless Headphones',
  brand: 'AudioTech',
  original_price: 199.99,
  compareAtPrice: 249.99,
  rating: 4.7,
  numReviews: 128,
  shortDescription: 'Immersive sound experience with crystal-clear audio and comfortable earcups for extended listening sessions.',
  longDescription: 'Experience unparalleled audio quality with the Premium Wireless Headphones. Featuring advanced noise-cancellation technology, a long-lasting battery, and ergonomic design, these headphones are perfect for audiophiles and casual listeners alike. Enjoy deep bass, crisp highs, and a balanced mid-range for all your favorite music genres. Connect effortlessly via Bluetooth 5.2 for a stable and fast connection.',
  images: [
    '/image-placeholder.png',
    '/image-placeholder.png',
    '/image-placeholder.png',
    '/image-placeholder.png', 
  ],
  colors: [
    { name: 'Black', hex: '#000000' },
    { name: 'Silver', hex: '#C0C0C0' },
    { name: 'Midnight Blue', hex: '#191970' },
  ],
  sizes: ['One Size'], // Or 'S', 'M', 'L' for apparel
  inStock: true,
  sku: 'HW-HP-001',
  specifications: [
    { label: 'Connectivity', value: 'Bluetooth 5.2' },
    { label: 'Battery Life', value: 'Up to 30 hours' },
    { label: 'Charging Time', value: '2 hours' },
    { label: 'Weight', value: '250g' },
    { label: 'Noise Cancellation', value: 'Active Noise Cancellation' },
  ],
  reviews: [
    { id: 'rev1', user: 'Alice Smith', rating: 5, comment: 'Absolutely love these headphones! The sound quality is amazing and they are so comfortable.', date: '2025-06-20' },
    { id: 'rev2', user: 'Bob Johnson', rating: 4, comment: 'Great headphones for the price. Noise cancellation works well.', date: '2025-06-15' },
    { id: 'rev3', user: 'Charlie Brown', rating: 5, comment: 'Highly recommend! Best headphones I\'ve ever owned.', date: '2025-06-10' },
  ],
};

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    setQuantity((prev) => {
      if (type === 'increment') return prev + 1;
      if (type === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Left Section: Product Image Gallery */}
        <div className="flex flex-col items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={selectedImage}
                alt={product.name}
                width = {100}
                height={100}
                className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-lg cursor-pointer object-cover aspect-square"
              />
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <Image src={selectedImage} alt={product.name} className="w-full h-auto object-contain" width={100} height={100} />
            </DialogContent>
          </Dialog>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width = {100}
                height={100}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 rounded-md cursor-pointer object-cover border-2 ${
                  selectedImage === image ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Information & Add to Cart */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.numReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">${product.original_price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-lg line-through text-muted-foreground">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-base text-muted-foreground">{product.shortDescription}</p>

          <Separator className="my-4" />

          {/* Product Options */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Color:</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color.name}
                  variant={selectedColor === color.name ? 'default' : 'outline'}
                  className="px-4 py-2 rounded-md"
                  onClick={() => setSelectedColor(color.name)}
                >
                  <span
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: color.hex }}
                  ></span>
                  {color.name}
                </Button>
              ))}
            </div>
          </div>

          {product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Size:</h3>
              <Select onValueChange={setSelectedSize} defaultValue={selectedSize}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange('decrement')}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 text-center"
                min={1}
              />
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange('increment')}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex gap-4 mt-6">
            <Button size="lg" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              Buy Now
            </Button>
          </div>

          {/* Stock Status */}
          <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'} (SKU: {product.sku})
          </p>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3"> {/* Adjust grid-cols based on number of tabs */}
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.numReviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <p className="text-muted-foreground">{product.longDescription}</p>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                      <th className="py-2 px-4 font-medium text-foreground">{spec.label}:</th>
                      <td className="py-2 px-4 text-muted-foreground">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {review.user}
                        <div className="flex ml-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        Reviewed on {new Date(review.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Shipping & Returns (using Accordion) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Shipping Information</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                We offer standard and expedited shipping options. Standard shipping typically takes 3-5 business days. Expedited shipping is available for an additional fee.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Return Policy</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                You can return most new, unopened items within 30 days of delivery for a full refund. Please refer to our full return policy for details.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Warranty</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                This product comes with a 1-year manufacturer&apos;s warranty covering defects in materials and workmanship.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductPage;