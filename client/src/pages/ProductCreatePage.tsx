import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { ThumbnailUploader } from "../components/create";
import { createProduct, modifyThumbnail } from "../utils/apis";


const ProductCreatePage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: any) => {
    setPrice(event.target.value);
  };

  const handleExplanationChange = (event: any) => {
    setExplanation(event.target.value);
  };

  const handleClearThumbnail = () => {
    setThumbnail(null);
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data: { product } } = await createProduct({
      name,
      explanation,
      price,
    })

    if (thumbnail) {
      const productWithThumbnail = await modifyThumbnail(product.id, thumbnail);

      setProducts((prev) => [...prev, productWithThumbnail]);
      return;
    }

    setProducts((prev) => [...prev, product]);
    return;
  };

  return (
    <>
        <Container maxWidth="sm">
        <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
        >
            상품 생성
        </Typography>
        <form onSubmit={handleCreateProduct}>
            <TextField
                label="상품 이름"
                fullWidth
                value={name}
                onChange={handleNameChange}
                margin="normal"
            />
            <TextField
                label="가격"
                type="number"
                fullWidth
                value={price}
                onChange={handlePriceChange}
                margin="normal"
            />
            <TextField
                label="상품 설명"
                fullWidth
                multiline
                rows={4}
                value={explanation}
                onChange={handleExplanationChange}
                margin="normal"
            />
            <ThumbnailUploader 
                value={thumbnail}
                onChange={(file) => setThumbnail(file)}
                onClickThumbnail={handleClearThumbnail}
                onUpload={() => console.log("성공")}
                onError={() => console.error("에러")}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                생성
            </Button>
        </form>
        </Container>
    </>
  );
};

export default ProductCreatePage;
