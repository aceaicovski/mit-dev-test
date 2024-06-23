import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserPayload, UserProfile } from "shared/models/user.interface";
import { getChangedValues } from "shared/utils";
import { z } from "zod";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const roleSelectValues = [
  { value: "customer", label: "Customer" },
  { value: "admin", label: "Admin" },
];

const EditProfileFormSchema = z.object({
  name: z
    .string({
      required_error: "This field is required",
    })
    .min(1, { message: "Please provide a valid name" }),
  email: z
    .string({
      required_error: "Enter a valid email",
    })
    .email("This is not a valid email")
    .min(2, { message: "This field is required" }),
  password: z
    .string({
      required_error: "This field is required",
    })
    .min(8, { message: "Password should be at least 8 characters" }),
  role: z
    .string({
      required_error: "This field is required",
    })
    .min(1, { message: "Please choose a role" }),
});

type EditProfileFormSchemaType = z.infer<typeof EditProfileFormSchema>;

const EditProfile = () => {
  const { user, updateUser, deleteUser } = useAuth();
  const { id, name, email, password, role } = user as UserProfile;
  const [editProfilePayload, setEditProfilePayload] =
    useState<UpdateUserPayload>({ name, email, password, role });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormSchemaType>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      name,
      email,
      password,
      role,
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormSchemaType> = (data) => {
    const payload = getChangedValues(user as UserProfile, data);

    updateUser(id, payload as UpdateUserPayload);
  };

  const handleDeleteUser = () => {
    deleteUser(user?.id as number);
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        )}
        name="name"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
        name="email"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        )}
        name="password"
        control={control}
      />
      <FormControl fullWidth error={Boolean(errors.role)}>
        <Controller
          render={({ field }) => (
            <TextField {...field} select id="role">
              {roleSelectValues.map((item) => (
                <MenuItem value={item.value}>{item.label}</MenuItem>
              ))}
            </TextField>
          )}
          name="role"
          control={control}
        />
      </FormControl>
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
    </Card>
  );
};

export default EditProfile;

