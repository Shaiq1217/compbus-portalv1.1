import { useParams } from 'react-router-dom';
import { IProduct } from 'src/@types/shared';
import useGetQuery from 'src/api/get-query';
import ProductDetail from 'src/components/ProductDetail/ProductDetail';
import Spinner from 'src/components/Spinner/Spinner';

const Product = () => {
    let { productId } = useParams();
    const { data: productDetail, isLoading, error } = useGetQuery<IProduct, IProduct>('product', productId);

    return (
        <div >
            {isLoading ? <Spinner /> : <ProductDetail productDetail={productDetail!} />}
            <div style={{ height: '10vh' }}>
                sadjkflskdjf
            </div>
        </div>
    );
};

export default Product;
