import { Container, Typography } from "@mui/material";
import MainLayout from "components/ui/main-layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <Container
        id="home-page"
        component="main"
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
        <Typography component="h1" variant="h3">
          Home Page Placeholder
        </Typography>
      </Container>
    </MainLayout>
  );
};

export default Home;

