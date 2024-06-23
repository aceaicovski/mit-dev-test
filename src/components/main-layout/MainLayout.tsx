import { Box, styled } from "@mui/material";
import NavBar from "components/navbar/NavBar";
import { PropsWithChildren } from "react";

const StyledBox = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
}));

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <StyledBox>
      <NavBar />
      {children}
    </StyledBox>
  );
};

export default MainLayout;

