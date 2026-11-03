'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatKSh, calculateDiscount } from '@/lib/utils';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const isWish = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  // Extract top 2 key specs for the summary pill
  const specEntries = Object.entries(product.specs).slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group apple-card p-5 sm:p-6 flex flex-col justify-between border border-[#E3EBF7] hover:border-[#0866F5]/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden bg-white"
    >
      {/* Top Floating Bar: Badges & Wishlist */}
      <div className="flex items-center justify-between w-full mb-3.5 z-10">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge && (
            <span className="px-2.5 py-0.5 bg-[#0866F5] text-white text-[10px] font-extrabold rounded-full shadow-2xs font-sora">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 font-sora">
              Save {discount}%
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            isWish
              ? 'bg-red-50 text-red-500 shadow-xs'
              : 'bg-[#F7FAFF] text-[#718096] hover:text-red-500 hover:bg-white border border-[#E3EBF7] shadow-2xs'
          }`}
          title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Large Product Image Stage with Studio Light Backing */}
      <div
        onClick={() => setQuickViewProduct(product)}
        className="w-full h-52  flex items-center justify-center relative cursor-pointer overflow-hidden transition-colors mb-5"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={240}
          height={180}
          className="object-contain max-h-40 sm:max-h-44 w-auto transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-md"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md text-[#0866F5] text-xs font-bold rounded-full shadow-md border border-blue-100 hover:bg-blue-50 font-manrope">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating Bar */}
          <div className="flex items-center justify-between text-xs text-[#718096] mb-1.5">
            <span className="font-sora text-[11px] font-extrabold text-[#0866F5] uppercase tracking-wider">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs font-sora">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal text-[11px]">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Name with Sora Typography */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-sora text-[15px] sm:text-[16px] font-bold text-[#10244A] line-clamp-2 leading-snug group-hover:text-[#0866F5] transition-colors cursor-pointer min-h-[44px]"
          >
            {product.name}
          </h3>

          {/* Key Specifications Tag Strip */}
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            {specEntries.map(([key, val]) => (
              <span
                key={key}
                className="font-manrope text-[11px] text-[#4A5D78] bg-[#F7FAFF] px-2.5 py-0.5 rounded-md border border-[#E3EBF7] font-medium"
              >
                {val}
              </span>
            ))}
          </div>

          {/* Availability Status */}
          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-emerald-600 font-semibold font-manrope">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>In Stock • Nairobi Warehouse</span>
          </div>
        </div>

        {/* Pricing Hierarchy & Add to Cart Action */}
        <div className="mt-5 pt-4 border-t border-[#E3EBF7] flex items-center justify-between">
          <div>
            <div className="font-sora text-lg sm:text-xl font-extrabold text-[#0866F5] leading-none">
              {formatKSh(product.price)}
            </div>
            {product.originalPrice && (
              <div className="font-manrope text-xs text-slate-400 line-through mt-1">
                {formatKSh(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2.5 bg-[#0866F5] hover:bg-[#1677FF] text-white rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer font-manrope text-xs font-bold"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
