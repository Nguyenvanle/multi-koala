import z from "zod";

// Define schema for registration data
export const RegisterBody = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." })
      .max(20, { message: "Username must not exceed 20 characters." })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain letters and numbers.",
      }),

    firstName: z
      .string()
      .min(1, { message: "First name is required." })
      .max(20, { message: "First name must not exceed 20 characters." }),

    lastName: z
      .string()
      .min(1, { message: "Last name is required." })
      .max(20, { message: "Last name must not exceed 20 characters." }),

    email: z.string().email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number.",
      }),

    confirmPassword: z.string(),

    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match.",
        path: ["confirmPassword"],
      });
      return false;
    }
    return true;
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
