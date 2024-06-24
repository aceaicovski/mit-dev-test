import { useEffect, useState } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { getProducts } from "services/productsService";
import MainLayout from "components/ui/main-layout/MainLayout";
import ProductsList from "components/modules/products-list/ProductsList";
import ProductsFilters from "components/modules/products-filters/ProductsFilters";
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

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const products = await getProducts({
          ...filterQueries,
          ...paginationQueries,
        });
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products list:", error);
      }
    };
    getProductsList();
    console.log("Products page effect!!!!!");
  }, [currentPage, filterQueries, paginationQueries]);

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
          pt: { xs: 10, sm: 12 },
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
          <Typography component="h2" variant="h3" color="text.primary">
            Products
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to our clothing collection, where fashion meets comfort.
            Explore a wide range of stylish and trendy apparel that caters to
            all your fashion needs.
          </Typography>
        </Box>

        <ProductsFilters setFilters={setFilterQueries} />

        {products.length > 0 ? (
          <>
            <ProductsList products={products} />
            {/* MUI Pagination requires total number of pages and since we don't have it from API
          I just set it to currentPage + 1 and it dynamically updates till the products list ends  */}
            <Pagination
              variant="outlined"
              color="primary"
              count={pagesCount}
              page={currentPage}
              onChange={handleChangePage}
            />
          </>
        ) : (
          <Box
            sx={{
              width: { sm: "100%", md: "60%" },
              textAlign: { sm: "left", md: "center" },
            }}
          >
            <Typography variant="h5" color="text.primary">
              No products satisfy the criteria
            </Typography>
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};

export default Products;

