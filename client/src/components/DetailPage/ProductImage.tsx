import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Product } from '../../modules/product/types';

type ProductImageProps = {
  detail: Product;
};
export default function ProductImage({
  detail,
}: ProductImageProps): JSX.Element {
  const images = detail.images.map(v => ({
    original: `http://localhost:8000/${v}`,
    thumbnail: `http://localhost:8000/${v}`,
  }));

  return (
    <section>
      <ReactImageGallery items={images} />
    </section>
  );
}
