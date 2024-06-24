import { useState } from "react";
import {
  Box,
  Button,
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
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedPriceRange = useDebounce(priceRange, 800);
  const debouncedSearchValue = useDebounce(searchValue, 900);

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

  const handleSetFilters = () => {
    const [minValue, maxValue] = debouncedPriceRange;

    setFilters((prev: FilterQueries) => {
      return {
        ...prev,
        title: debouncedSearchValue,
        price_min: minValue,
        price_max: maxValue,
      };
    });
  };

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

      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", sm: "auto" },
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-betweeright",
          gap: 1,
        }}
      >
        <TextField
          id="outlined-search"
          size="small"
          label="Search field"
          margin="none"
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
        <Button
          variant="contained"
          onClick={handleSetFilters}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsFilters;

