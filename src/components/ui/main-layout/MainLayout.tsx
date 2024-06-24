import { PropsWithChildren } from "react";
import { Box, styled } from "@mui/material";
import NavBar from "components/modules/navbar/NavBar";

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

