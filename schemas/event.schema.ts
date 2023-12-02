import { z } from "zod";

// Individual event item schema
const eventContentSchema = z.object({
  date: z.string({ required_error: "The date is required" }),
  description: z.string({ required_error: "The description is required" }),
  finalHour: z.string({ required_error: "The final hour is required" }),
  finalHourText: z.string({ required_error: "The final hour text is required" }),
  id: z.string({ required_error: "The ID is required" }),
  initialHour: z.string({ required_error: "The initial hour is required" }),
  initialHourText: z.string({ required_error: "The initial hour text is required" }),
  isAllDay: z.boolean({ required_error: "The isAllDay field is required" }),
  name: z.string({ required_error: "The name is required" }),
  reminder: z.number({ required_error: "The reminder is required" }),
  reminderText: z.string({ required_error: "The reminder text is required" }),
});


// This schema checks that eventItems is an object where each property (date) is an array of events
const eventArraySchema = z.array(eventContentSchema);

// Event collection schema used for creation, requires _id and eventItems fields
export const eventSchema = z.object({
  _id: z.string({ required_error: "The ID is required" }),
  eventItems: z
    // The record method is used to validate that eventItems can be a serie of objects (thats why called record) with a key (date) and an array of events as value (eventArraySchema)
    .record(eventArraySchema, { required_error: "eventItems is undefined" })
    // The refine method is used to validate that eventItems is an empty object or an object(s) with with a key (date) and an array of events as value (eventArraySchema)
    .refine(
      (value) =>
        value === undefined ||
        Object.keys(value).length === 0 ||
        Object.values(value).every(
          (event) => eventArraySchema.safeParse(event).success
        ),
      {
        message:
          "eventItems must be an empty object or contain only objects that comply with the defined schema",
      }
    ),
});

// Event collection schema for update only requires the eventItems field
export const eventSchemaUpdate = z.object({
    // The _id field is not required because it is not going to be updated
  eventItems: z
    // The record method is used to validate that eventItems is an object with a key (date) and an array of events as value
    .record(eventArraySchema, {
      required_error: "eventItems is required",
      invalid_type_error:
        "eventItems must be an object with the defined schema",
    })
    // The refine method is used to validate that eventItems is not an empty object; otherwise, it will throw an error
    .refine((value) => Object.keys(value).length > 0, {
      message: "eventItems cannot be an empty object",
    }),
});