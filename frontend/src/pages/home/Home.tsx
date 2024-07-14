
import useGetQuery from '../../api/get-query';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import Banner from '../../container/Banner/Banner';
import FeaturedItems from '../../container/Product/Product'
import { IProduct } from '../../types/product';

const Home = () => {
  const { data: products, isLoading } = useGetQuery<IProduct[], IProduct[]>('product');
  const renderProductCard = (product: IProduct) => (
    <div >
      <ProductCard product={product} />
    </div>
  );
  return (
    <>
      <Banner />
      {isLoading ? <Spinner /> :
        <FeaturedItems data={products!} renderCard={renderProductCard} title={"Featured Products"} titleClassNames={'mb-10'} />}
    </>
  )
}

export default Home