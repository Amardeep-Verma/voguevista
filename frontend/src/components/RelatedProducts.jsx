import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];

      // Filter by category and subcategory
      productsCopy = productsCopy.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      // Set first 5 products
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {related.length > 0 ? (
          related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No related products found.
          </p>
        )}
      </div>
    </div>
  )
}

export default RelatedProducts
