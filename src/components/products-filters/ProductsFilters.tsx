import { useEffect, useRef, useState } from "react";
import {
  Box,
  InputAdornment,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import useDebounce from "hooks/useDebounce";
import { FilterQueries } from "pages/Products";

interface ProductsFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<FilterQueries>>;
}
const priceRangeString = (value: number) => {
  return `${value}$`;
};

const minDistance = 15;

const ProductsFilters = ({ setFilters }: ProductsFiltersProps) => {
  const isFirstRenderSearch = useRef(true);
  const isFirstRenderRange = useRef(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedPriceRange = useDebounce(priceRange, 800);
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const handleChangePriceRange = (
    _: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const range = [
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ];
      setPriceRange(range);
    } else {
      const range = [
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ];
      setPriceRange(range);
    }
  };

  const handleSearchFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (isFirstRenderRange.current) {
      isFirstRenderRange.current = false;
      return;
    }

    const [minValue, maxValue] = debouncedPriceRange;
    console.log("Range effect triggered");

    setFilters((prev: FilterQueries) => {
      return { ...prev, price_min: minValue, price_max: maxValue };
    });
  }, [debouncedPriceRange, setFilters]);

  useEffect(() => {
    if (isFirstRenderSearch.current) {
      isFirstRenderSearch.current = false;
      return;
    }

    console.log("Search effect triggered!");

    setFilters((prev: FilterQueries) => {
      return { ...prev, title: debouncedSearchValue };
    });
  }, [debouncedSearchValue, setFilters]);

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        width: "100%",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "40ch" },
          width: "100%",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography id="price-range">Price range</Typography>
        <Slider
          min={0}
          max={500}
          aria-labelledby="price-range"
          getAriaLabel={() => "Price Range"}
          value={priceRange}
          onChange={handleChangePriceRange}
          valueLabelDisplay="auto"
          getAriaValueText={priceRangeString}
          disableSwap
          sx={{
            width: "30ch",
            px: 1,
          }}
        />
      </Box>

      <TextField
        id="outlined-search"
        label="Search field"
        margin="normal"
        type="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ManageSearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        onChange={handleSearchFieldChange}
        sx={{
          width: { xs: "100%", sm: "auto" },
        }}
      />
    </Box>
  );
};

export default ProductsFilters;

