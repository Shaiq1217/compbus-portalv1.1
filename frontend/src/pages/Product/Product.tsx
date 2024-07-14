import { useParams } from 'react-router-dom';
import { IProduct } from 'src/@types/shared';
import useGetQuery from 'src/api/get-query';
import ProductDetail from 'src/components/ProductDetail/ProductDetail';
import Spinner from 'src/components/Spinner/Spinner';

const Product = () => {
    let { productId } = useParams();
    const { data: productDetail, isLoading, error } = useGetQuery<IProduct, IProduct>('product', productId);
    console.log(productDetail)
    return (
        <div >
            {isLoading ? <Spinner /> : <ProductDetail productDetail={productDetail!} />}
        </div>
    );
};

export default Product;
