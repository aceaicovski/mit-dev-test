import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserPayload, UserProfile } from "shared/models/user.interface";
import { getChangedValues } from "shared/utils";
import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  TextField,
} from "@mui/material";
import { useAuth } from "contexts/AuthContext";

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

  const {
    handleSubmit,
    control,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "flex-start", sm: "space-between" },
          alignItems: "flex-start",
          gap: { xs: 2, sm: 4 },
          my: 2,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ width: { xs: "100%", sm: "auto" } }}
          onClick={handleDeleteUser}
        >
          Delete Account
        </Button>
      </Box>
    </Card>
  );
};

export default EditProfile;

