import { z } from "zod";

export const CandidacySchema = z.object({

});

export type CandidacyType = z.infer<typeof CandidacySchema>
