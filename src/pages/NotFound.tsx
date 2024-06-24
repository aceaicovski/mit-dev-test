import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ mt: 6, mb: 3, color: "text.secondary" }}>
        {"Page not found. Return to"}{" "}
        <Link onClick={() => navigate("/")}>home page</Link>
      </Typography>
    </Box>
  );
};

export default NotFound;

