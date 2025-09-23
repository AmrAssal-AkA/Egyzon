import { notFound } from 'next/navigation';

import { ProductsData } from '@/lib/Products';
import ProductDetail from './productDetailPage';


export default async function ProductDetailPage({ params }) {
    const {productId} = await params;
    const product = ProductsData.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }
  return (
    <div className='m-70'>
      <ProductDetail product={product} />
    </div>
  );
}
