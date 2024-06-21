import { NavBar } from "components/navbar/NavBar";

interface IMainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: IMainLayoutProps): JSX.Element => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default MainLayout;
