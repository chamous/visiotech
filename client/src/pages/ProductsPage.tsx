import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsApi } from '../services/api';
import { getAbsoluteImageUrl } from '../utils/helpers'; // Import the helper

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl1?: string; // Product model now has imageUrl1
  imageUrl2?: string; // Product model now has imageUrl2
  images: string[]; // ProductCard expects an array
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsApi.getAll()
      .then((response: any) => {
        setProducts(response.data.map((prod: any, index: number) => {
          const images: string[] = [];
          if (prod.imageUrl1) images.push(getAbsoluteImageUrl(prod.imageUrl1));
          if (prod.imageUrl2) images.push(getAbsoluteImageUrl(prod.imageUrl2));

          // Fallback placeholders if no images are provided
          if (images.length === 0) {
            images.push(`https://picsum.photos/seed/${prod.id || index}-a/1920/1080`);
            images.push(`https://picsum.photos/seed/${prod.id || index}-b/1920/1080`);
          }

          return {
            ...prod,
            images: images,
          };
        }));
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Failed to load products.');
        setLoading(false);
        console.error('Error fetching products:', err);
      });
  }, []);

  if (loading) return <div className="text-center py-16 text-secondary-dark">Loading Products...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
  if (products.length === 0) return <div className="text-center py-16 text-gray-500">No products available.</div>;

  return (
    <div>
      <div className="py-16 bg-secondary-dark text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Our Innovative Products</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Explore VisioTech's range of cutting-edge AI and computer vision products designed to revolutionize industrial automation.
        </p>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id || index}
              name={product.name}
              description={product.description}
              images={product.images}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
