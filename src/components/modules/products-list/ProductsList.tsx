import { Grid } from "@mui/material";
import ProductCard from "components/modules/product-card/ProductCard";
import { Product } from "shared/models/products.interface";

interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {products.map((product: Product) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={product.id}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;

