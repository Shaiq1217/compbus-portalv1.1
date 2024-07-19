import { Box } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from 'src/@types/shared';
import useGetQuery from 'src/api/get-query';
import ProductCard from 'src/components/ProductCard/ProductCard';
import ProductDetail from 'src/components/ProductDetail/ProductDetail';
import Spinner from 'src/components/Spinner/Spinner';
import { useToast } from 'src/components/Toast/Toast';
import FeaturedItems from 'src/container/FeaturedItems/FeaturedItems';
import Footer from 'src/container/Footer/Footer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from 'src/components/Cart/CartProvider';

const Product = () => {
    let { productId } = useParams();
    const cart = useCart();
    const [productIdToNavigate, setProductIdToNavigate] = useState<string | undefined>(undefined);
    const { data: productDetail, isLoading, error } = useGetQuery<IProduct, IProduct>('product', productId);

    const { data: productByCategory, isLoading: isLoadingProductByCategory } =
        useGetQuery<IProduct[], IProduct[]>('productByCategory', productDetail?.categoryId);
    const { showToast } = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        if (productIdToNavigate) {
            navigate(`/products/${productIdToNavigate}`);
        }
    }, [productIdToNavigate]);
    const handleRenderCard = (product: IProduct) => {
        return <>
            <ProductCard product={product} setProductId={setProductIdToNavigate} />
        </>
    }

    const handleCartClick = (action: any, item: IProduct) => {
        const cartMessage: ReactNode = <div>
            <ShoppingCartIcon />
            <span> {action.message}</span>
        </div>
        cart.addToCart(item);
        showToast(cartMessage, action.severity);

    }
    const handleBuyNowClick = (action: any) => {
        const buyNowMessage: ReactNode = <div>
            <AddShoppingCartIcon />
            <span> {action.message}</span>
        </div>
        showToast(buyNowMessage, action.severity);
    }

    return (
        <div >{error ? <div>Error</div> : (
            <>
                {isLoading ? <Spinner /> :
                    <>
                        <Box mb={10}>
                            <ProductDetail productDetail={productDetail!} handleCartClick={handleCartClick} handleBuyNowClick={handleBuyNowClick} />
                        </Box>
                        {isLoadingProductByCategory ?
                            <Spinner /> :
                            <FeaturedItems<IProduct> data={productByCategory!} renderCard={handleRenderCard} title='Similar Products' />}

                    </>}
            </>)}
            <Footer />
        </div>
    );
};

export default Product;
