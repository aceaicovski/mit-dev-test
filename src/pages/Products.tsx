import { useCallback, useEffect, useState } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { getProducts } from "services/productsService";
import MainLayout from "components/main-layout/MainLayout";
import ProductsList from "components/products-list/ProductsList";
import ProductsFilters from "components/products-filters/ProductsFilters";
import { Product } from "shared/models/products.interface";

interface PaginationQueries {
  offset: number;
  limit: number;
}
export interface FilterQueries {
  title: string;
  price_min: number;
  price_max: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [paginationQueries, setPaginationQueries] = useState<PaginationQueries>(
    {
      offset: 0,
      limit: 6,
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount =
    products && products.length === 0 ? currentPage : currentPage + 1;

  const [filterQueries, setFilterQueries] = useState<FilterQueries>({
    title: "",
    price_min: 1,
    price_max: 500,
  });

  const getProductsList = useCallback(async () => {
    try {
      const products = await getProducts({
        ...filterQueries,
        ...paginationQueries,
      });
      setProducts(products);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products list:", error);
    }
  }, [currentPage, filterQueries]);

  useEffect(() => {
    getProductsList();
  }, [currentPage, filterQueries]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    const { offset, limit } = paginationQueries;
    if (value > currentPage) {
      const nextPageOffset = offset + limit;
      setPaginationQueries((prev) => ({ ...prev, offset: nextPageOffset }));
      setCurrentPage(value);
      return;
    }

    const previousPageOffset = offset - limit;
    setPaginationQueries((prev) => ({ ...prev, offset: previousPageOffset }));
    setCurrentPage(value);
  };

  return (
    <MainLayout>
      <Container
        id="products"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" color="text.primary">
            Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to our clothing collection, where fashion meets comfort.
            Explore a wide range of stylish and trendy apparel that caters to
            all your fashion needs.
          </Typography>
        </Box>

        <ProductsFilters setFilters={setFilterQueries} />

        <ProductsList products={products} />

        <Pagination
          variant="outlined"
          color="primary"
          count={pagesCount}
          page={currentPage}
          onChange={handleChangePage}
        />
      </Container>
    </MainLayout>
  );
};

export default Products;

