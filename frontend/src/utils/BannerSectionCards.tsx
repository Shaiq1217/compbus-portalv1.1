import { ISectionCard } from "src/@types/shared";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import { IconProps } from "@mui/material";
const color = "#22333b"
const BannerSectionCards: ISectionCard[] = [
    {
        Icon: AddShoppingCartIcon as React.ComponentType<IconProps>,
        title: "Shop",
        subtitle: "Shop for your favorite products and brands today to get the best prices",
    },
    {
        Icon: LocalOfferIcon as React.ComponentType<IconProps>,
        title: "Offers",
        subtitle: "Get amazing offers on your favorite products and brands today",
    },
    {
        Icon: LocalShippingIcon as React.ComponentType<IconProps>,
        title: "Delivery",
        subtitle: "Fast delivery to your doorstep on all orders above $100 today",
    },
    {
        Icon: SecurityIcon as React.ComponentType<IconProps>,
        title: "Secure Payment",
        subtitle: "Secure payment options available for all orders today to ensure",
    },
]

export default BannerSectionCards;