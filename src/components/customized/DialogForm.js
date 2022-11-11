import {
  Alert,
  Dialog,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import { FormProvider, FTextField } from "../forms";

const defaultValues = {
  username: "",
  password: "",
};

function DialogForm() {
  const auth = useAuth();
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const to = location.state?.to?.pathname;

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    const username = data.username;
    const password = data.password;

    auth.login(username, password, () => {
      navigate(to, { replace: true });
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems="center" spacing={2} sx={{ m: 4 }}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <Typography variant="h5" fontWeight="bolder">
            Login Form
          </Typography>
          <FTextField name="username" label="Username" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            variant="contained"
            type="submit"
            loading={isSubmitting}
            sx={{ fontWeight: "bold" }}
          >
            SUBMIT
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}

export default DialogForm;
