

import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from 'src/@types/shared';
import useGetQuery from 'src/api/get-query';
import ProductCard from 'src/components/ProductCard/ProductCard';
import Spinner from 'src/components/Spinner/Spinner';
import Banner from 'src/container/Banner/Banner';
import Footer from 'src/container/Footer/Footer';
import InquirySection from 'src/container/InquirySection/InquirySection';
import FeaturedItems from 'src/container/Product/Product';
import SectionCardDisplay from 'src/container/SectionCards/SectionCardDisplay';
import Testimonials from 'src/container/Testimonials/Testimonals';
import BannerSectionCards from 'src/utils/BannerSectionCards';

const Home = () => {
  const { data: products, isLoading } = useGetQuery<IProduct[], IProduct[]>('product');
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if (productId) {
      navigate(`/products/${productId}`);
    }
  }, [productId]);
  const renderProductCard = (product: IProduct) => (
    <div >
      <ProductCard product={product} setProductId={setProductId} />
    </div>
  );

  const titleNode: ReactNode = <>
    Welcome to <br />
    <span style={{ fontWeight: 'bolder' }}>Compbus</span>
  </>

  const descripitonNode: ReactNode = <>
    Your one stop shop for all your electronic needs
  </>

  const descriptionStyles = {
    color: 'black',
    fontSize: '3rem',
    fontWeight: 'light',
    textAlign: 'center',
    padding: '1rem',
  }
  return (
    <>
      <Banner titleNode={titleNode} />
      <SectionCardDisplay sectionCards={BannerSectionCards} />
      {isLoading ? <Spinner /> :
        <FeaturedItems<IProduct> data={products!} renderCard={renderProductCard} title={"Featured Products"} titleClassNames={'mb-10'} />}
      <Banner invert={true} imageUrl='https://picsum.photos/id/6/5000/3281' buttonVisible={false} description={descripitonNode} descriptionStyles={descriptionStyles} />
      <InquirySection />
      <Testimonials />
      <Footer />
    </>
  )
}

export default Home