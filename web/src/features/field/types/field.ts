// features/fields/types/field.ts

import { z } from "zod";

// Define the schema for a single field
export const FieldBodyType = z.object({
  fieldName: z.string(),
  fieldDescription: z.string(),
});

// Define the schema for field response
export const FieldResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: z.array(FieldBodyType), // An array of fields
});

// Define the schema for a single field result
export const FieldDetailResponseBodyType = z.object({
  code: z.number(),
  message: z.string(),
  result: FieldBodyType, // A single field detail
});

// Export types for responses

// Array of fields
export type FieldResType = z.infer<typeof FieldResponseBodyType>;

export const FieldsResultBodyType = z.array(FieldBodyType);

export type FieldsResultResType = z.infer<typeof FieldsResultBodyType>;

// Single field detail
export type FieldDetailResType = z.infer<typeof FieldDetailResponseBodyType>;

// Export the inferred type for a single field
export type FieldType = z.infer<typeof FieldBodyType>;
