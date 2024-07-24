import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle the password reset logic here (e.g., API call)
    console.log("Password reset email sent to:", values.email);
    setSubmitting(false);
    navigate("/login");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 8, padding: 4, borderRadius: "8px", boxShadow: 3 }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              component="div"
              noValidate
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Field
                as={TextField}
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                helperText={<ErrorMessage name="email" />}
                error={<ErrorMessage name="email" />}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2} justifyContent="space-evenly">
                <Grid item>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      marginBottom: "10px",
                      color: "white",
                      backgroundColor: "black",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginBottom: "10px",
                      backgroundColor: "#FF204E",
                      "&:hover": {
                        backgroundColor: "#FF204E",
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Confirm"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
