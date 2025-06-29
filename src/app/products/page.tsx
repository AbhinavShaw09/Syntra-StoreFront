"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import ProductCard from "@/components/products/ProductCard"

import useProducts from "@/hooks/useProducts";
// Sample product data
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
};

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/api/placeholder/300/300",
    // category: "electronics",
    rating: 4.5,
    reviews: 324,
    inStock: true,
  },
];


// Filter options
const categories = [
  { id: "electronics", name: "Electronics", count: 2 },
  { id: "clothing", name: "Clothing", count: 1 },
  { id: "sports", name: "Sports & Outdoors", count: 2 },
];

export default function AllProducts() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState("featured");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { products }: { products: Product[] } = useProducts();


  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.category && selectedCategories.includes(product.category)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Stock filter
    if (showInStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    priceRange,
    sortBy,
    showInStockOnly,
    products,
  ]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 300]);
    setShowInStockOnly(false);
  };

  const activeFiltersCount =
    selectedCategories.length + (showInStockOnly ? 1 : 0);

  type FilterSectionProps = {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  };

  const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h3 className="font-semibold text-sm">{title}</h3>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6 p-10">
      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Active Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {categories.find((c) => c.id === cat)?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== cat)
                    )
                  }
                />
              </Badge>
            ))}
            {showInStockOnly && (
              <Badge variant="secondary" className="text-xs">
                In Stock Only
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => setShowInStockOnly(false)}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      <Separator />

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories((prev) => [...prev, category.id]);
                  } else {
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== category.id)
                    );
                  }
                }}
              />
              <Label
                htmlFor={category.id}
                className="text-sm flex-1 cursor-pointer"
              >
                {category.name}
              </Label>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={300}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Availability */}
      <FilterSection title="Availability">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked === true)}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In stock only
          </Label>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600">Discover our complete collection</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search   ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Top controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Mobile filter toggle */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-4">
            <FilterSidebar />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No products found matching your criteria.
              </p>
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div
              className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
