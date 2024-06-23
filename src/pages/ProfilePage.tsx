import { useState } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CustomTabPanel from "components/custom-tab-panel/CustomTabPanel";
import EditProfile from "components/edit-profile/EditProfile";
import MainLayout from "components/main-layout/MainLayout";
import ProfileInfo from "components/profile-info/ProfileInfo";

const ProfilePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainLayout>
      <Container
        id="profile"
        maxWidth="md"
        sx={{
          pt: { xs: 10, sm: 12 },
          pb: { xs: 8, sm: 16 },
          position: "relative",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: "left",
            mb: { xs: 4 },
            px: "0",
          }}
        >
          <Typography variant="h3" color="text.primary">
            Profile
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="profile-tabs"
            >
              <Tab label="Profile" {...tabProps(0)} />
              <Tab label="Edit Profile" {...tabProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ProfileInfo />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <EditProfile />
          </CustomTabPanel>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default ProfilePage;

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

