import { z } from "zod";

// Step 1 - Reporter Details Schema
export const step1Schema = z
  .object({
    reporterType: z.string().min(1, "Please select a reporter type"),
    isAnonymous: z.boolean(),
    // Conditional fields
    fullName: z.string().optional(),
    country: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    // Business fields
    organization: z.string().optional(),
    role: z.string().optional(),
    // Parent-Guardian fields
    relationship: z.string().optional(),
    victimAge: z.string().optional(),
    // Other fields
    reporterRole: z.string().optional(),
    additionalInfo: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate contact info only if not anonymous
    if (!data.isAnonymous) {
      const requiredFields: Array<[keyof typeof data, string]> = [
        ["fullName", "Full name is required"],
        ["email", "Email is required"],
        ["phone", "Phone number is required"],
        ["country", "Country is required"],
      ];

      for (const [field, message] of requiredFields) {
        if (!data[field] || String(data[field]).trim().length === 0) {
          ctx.addIssue({
            code: "custom",
            message,
            path: [field],
          });
        }
      }

      // Email format check (use z.string().email() regex instead of custom)
      if (
        data.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a valid email address",
          path: ["email"],
        });
      }
    }
  });

// Step 2 - Incident Details Schema
export const step2Schema = z.object({
  incidentType: z.string().min(1, "Please select an incident type"),
  isOngoing: z.string().min(1, "Please indicate if the incident is ongoing"),
  whatHappened: z
    .string()
    .min(50, "Please provide at least 50 characters describing the incident")
    .max(600, "Description must not exceed 600 characters"),
  incidentTime: z
    .iso
    .datetime({ offset: true })
    .or(z.string().min(1, "Please select when the incident occurred")),
  platform: z.string().optional(),
  platformUrl: z
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("").transform(() => undefined)), // allow empty input
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to proceed',
  }),
  files: z.array(z.instanceof(File)).optional(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
