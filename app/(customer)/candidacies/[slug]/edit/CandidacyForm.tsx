"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { CandidacySchema, CandidacyType } from "./Candidacy.schema"
import { useMutation } from "@tanstack/react-query"
import { createCandidacyAction, updateCandidacyAction } from "./candidacy.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useZodForm } from "@/src/components/ui/form"



export type CandidacyProps = {
  defaultValues?: CandidacyType
  activityId?: string
}

export const CandidacyForm = (props: CandidacyProps) => {
  const form = useZodForm({
    schema: CandidacySchema,
    defaultValues: props.defaultValues
  })

  const isCreate = !Boolean(props.defaultValues)
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: CandidacyType) => {
      const { data, serverError } = isCreate ? await createCandidacyAction(values) :
        await updateCandidacyAction({
          id: props.activityId ?? "-",
          data: values
        })

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }
      toast.success("Candidacy created");
      router.push(`/candidacies/${data.slug}`)
    }
  })

  return (
    <Card>
      <CardHeader>
      </CardHeader>

      <CardContent>
        
      </CardContent>
    </Card>
  )
}

export default CandidacyForm