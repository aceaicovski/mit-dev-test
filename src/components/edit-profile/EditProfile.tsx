import { Box, Button, Card, Grid, TextField, styled } from "@mui/material";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { UpdateUserPayload } from "shared/models/user.interface";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export interface UserProfile {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

const EditProfile = () => {
  const { user, updateUser, deleteUser } = useAuth();
  const { id, name, email, password, role } = user as UserProfile;
  const [editProfilePayload, setEditProfilePayload] =
    useState<UpdateUserPayload>({ name, email, password, role });

  const handleEditUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(id, editProfilePayload);
  };

  const handleDeleteUser = () => {
    deleteUser(user?.id as number);
  };

  return (
    <Card
      component="form"
      onSubmit={handleEditUser}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={editProfilePayload?.name}
        onChange={(e) =>
          setEditProfilePayload((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={editProfilePayload?.email}
        onChange={(e) =>
          setEditProfilePayload((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={editProfilePayload?.password}
        onChange={(e) =>
          setEditProfilePayload((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="role"
        label="Role"
        type="text"
        id="role"
        autoComplete="role"
        value={editProfilePayload?.role}
        onChange={(e) =>
          setEditProfilePayload((prev) => ({ ...prev, role: e.target.value }))
        }
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleDeleteUser}
        >
          Delete Account
        </Button>
      </Box>

      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </Card>
  );
};

export default EditProfile;

