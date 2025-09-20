import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const registerFormSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    repassword: z.string(),
    phone: z.string().regex(/^[0-9]{10,15}$/, {
      message: "Phone number must be 10–15 digits.",
    }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type registerFormValues = z.infer<typeof registerFormSchema>;
