import { useNavigate } from "react-router-dom";
import { 
    Box, 
    Button, 
    ButtonGroup, 
    Card, 
    CardContent, 
    CardMedia, 
    Grid, 
    Typography 
} from "@mui/material";
import { ProductType } from "../../types";

type Props = {
    product: ProductType;
}


const ProductItem = ({
    product
}: Props) => {
    const navigate = useNavigate();

    const handlePushProductPage = () => navigate(`/product/${product.id}`);

    // NOTE: 이벤트 전파에 대한 설명 필요
    const handlePushCartPage = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate('/cart');
    };
    
    const handlePushPurchasePage = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigate('/purchase');
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, padding: 3 }} onClick={handlePushProductPage}>
                {product.thumbnail && (
                    <CardMedia
                        sx={{ height: 140 }}
                        image={product.thumbnail}
                        title={product.name}
                    />
                )}
                <CardContent sx={{ padding: 0 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.explanation}
                </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                <ButtonGroup variant="contained">
                    <Button size="small" onClick={handlePushPurchasePage}>구매하기</Button>
                    <Button size="small" onClick={handlePushCartPage} variant="outlined">장바구니</Button>
                </ButtonGroup>
                </Box>
            </Card>
        </Grid>
    )
}

export default ProductItem;