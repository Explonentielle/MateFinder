"use client"

import { Form, useZodForm } from "@/src/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/src/components/ui/button"
import React from "react"
import { CandidacySchema, CandidacyType } from "./Candidacy.schema"
import { createCandidacyAction, updateCandidacyAction } from "./candidacy.action"
import LucideIcons, { IconName } from "@/src/components/LucideIcons"

export type CandidacyFormProps = {
    activityId?: string
    userId?: string
    status?: string
    candidacyId?: string
    icon: string
}

const CandidacyForm = (props: CandidacyFormProps) => {

    const form = useZodForm({
        schema: CandidacySchema,
    })


    const mutation = useMutation({
        mutationFn: async (values: CandidacyType) => {

            if (props.status === "PENDING") {
                const { data, serverError } = await createCandidacyAction(values);
                if (serverError || !data) {
                    toast.error(serverError);
                    return;
                }
                toast.success("Candidacy created");

            } else if (props.status === "REJECTED") {
                const { data, serverError } = await updateCandidacyAction({
                    id: props.candidacyId ?? "-",
                    data: values,
                });
                if (serverError || !data) {
                    toast.error(serverError);
                    return;
                }
                toast.success("Candidacy Rejected");
                window.location.reload();

            } else if (props.status === "APPROVED") {
                const { data, serverError } = await updateCandidacyAction({
                    id: props.candidacyId ?? "-",
                    data: values,
                });
                if (serverError || !data) {
                    toast.error(serverError);
                    return;
                }
                toast.success("Candidacy Approved");
                window.location.reload();
            }
        },
    });

    return (
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>
            <input
                type="hidden"
                {...form.register("status")}
                defaultValue={props.status}
            />
            <input
                type="hidden"
                {...form.register("activityId")}
                defaultValue={props.activityId}
            />
            <input
                type="hidden"
                {...form.register("userId")}
                defaultValue={props.userId}>
            </input>

            <Button type="submit" variant={"ghost"}>
                {props.icon === "Send" && (
                    <span className="mr-2">Participate</span>
                )}
                <div className={props.icon === "Cross" ? " rotate-45" : ""}>
                    <LucideIcons name={props.icon as IconName} size={16} />
                </div>
            </Button>
        </Form>
    )
}

export default CandidacyForm;
