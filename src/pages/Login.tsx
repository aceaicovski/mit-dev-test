import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  Controller,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "contexts/AuthContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import MainLayout from "components/ui/main-layout/MainLayout";
import Container from "@mui/material/Container";

const LoginFormSchema = z.object({
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
    .min(1, { message: "This field is required" }),
});

type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const defaultValues: DefaultValues<LoginFormSchemaType> = {
  email: "",
  password: "",
};

const Login = () => {
  const { login, user, error } = useAuth();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginFormSchemaType> = (data) => {
    const { email, password } = data;
    login(email, password);
  };

  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          pt: { xs: 10, sm: 12 },
          pb: { xs: 8, sm: 16 },
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
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
                  required
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Login;

