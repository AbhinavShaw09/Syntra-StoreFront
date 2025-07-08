import React from "react";

import { Star, Heart, ShoppingCart } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Button as MovingButton } from "@/components/ui/moving-border";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useCart } from "@/providers/CartProvider";

interface Product {
  id: string;
  name: string;
  original_price: number;
  selling_price: number;
  reviews: number;
  rating: number,
  inventory_count: number;
  inStock: boolean;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Product Image</span>
          </div>
          {product?.original_price && (
            <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="bg-white/80 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          {product.inventory_count <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.selling_price)
                      ? "fill-yellow-400  -yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">${product.selling_price}</span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <MovingButton
          className="w-full bg-violet-600 dark:bg-slate-900 text-white dark:text-white border-neutral-200 dark:border-slate-100"
          onClick={() =>
            addToCart({
              id: Number(product.id),
              name: product.name,
              price: product.selling_price,
              rating: product.rating,
              reviews: product.reviews,
              inStock: product.inventory_count > 0,
              image: product.image,
            })
          }
          disabled={product.inventory_count <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inventory_count > 0 ? "Add to Cart" : "Out of Stock"}
        </MovingButton>
      </CardFooter>
      <BorderBeam
        duration={4}
        size={500}
        reverse
        className="from-transparent via-violet-500 to-transparent"
      />
    </Card>
  );
};

export default ProductCard;
