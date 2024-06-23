import { Avatar, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth } from "contexts/AuthContext";
import { UserProfile, UserProfileLabels } from "shared/models/user.interface";

const ProfileInfo = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "left" },
            }}
          >
            <Avatar
              alt={user?.name}
              src={user?.avatar ? user?.avatar : "/avatar.jpg"}
              sx={{
                width: "180px",
                height: "180px",
              }}
            />
          </Box>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flexGrow: 0,
            }}
          >
            <Typography variant="h4" color="text.primary" sx={{ mb: 2 }}>
              Your Personal Details
            </Typography>
            <Box>
              {user &&
                Object.entries(UserProfileLabels)?.map(([key, value]) => (
                  <div key={key} style={{ marginBottom: "10px" }}>
                    <Typography
                      variant="h5"
                      color="text.primary"
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <strong>{key}:</strong>{" "}
                      <span> {user[key as keyof UserProfile]}</span>
                    </Typography>
                  </div>
                ))}
            </Box>
          </Paper>
        </Box>
      ) : null}
    </>
  );
};

export default ProfileInfo;

