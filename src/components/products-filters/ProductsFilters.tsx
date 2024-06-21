import { useEffect, useState } from "react";
import { Box, InputAdornment, Slider, TextField } from "@mui/material";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import useDebounce from "hooks/useDebounce";
import { FilterQueries } from "pages/Products";
import { SearchOff } from "@mui/icons-material";

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
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const debouncedSearchValue = useDebounce(searchValue, 600);

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
    const [minValue, maxValue] = debouncedPriceRange;
    setFilters((prev: FilterQueries) => {
      return { ...prev, price_min: minValue, price_max: maxValue };
    });
  }, [debouncedPriceRange]);

  useEffect(() => {
    setFilters((prev: FilterQueries) => {
      return { ...prev, title: debouncedSearchValue };
    });
  }, [debouncedSearchValue]);

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Slider
        min={0}
        max={500}
        getAriaLabel={() => "Minimum distance"}
        value={priceRange}
        onChange={handleChangePriceRange}
        valueLabelDisplay="auto"
        getAriaValueText={priceRangeString}
        disableSwap
        sx={{
          width: "40ch",
          px: 1,
        }}
      />
      <TextField
        id="outlined-search"
        label="Search field"
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
      />
    </Box>
  );
};

export default ProductsFilters;

