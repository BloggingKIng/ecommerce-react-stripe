import React from 'react'
import Product from '@/components/Product'
import FooterBanner from '@/components/FooterBanner'
import Herobanner from '@/components/Herobanner'

import { client } from '@/lib/client'

const Home = ({products, bannerData}) => {
  return (
    <>
    <Herobanner heroBanner={bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers and headphones of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product)=>(<Product product={product} />))}
      </div>
      <FooterBanner footerBanner={bannerData[0]} />
      {console.log(bannerData)}
    </>
  )
}

export const getServerSideProps = async () => {
  const query =  '*[_type=="product"]';
  const products = await client.fetch(query)

  const bannerQuery = '*[_type=="banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home
