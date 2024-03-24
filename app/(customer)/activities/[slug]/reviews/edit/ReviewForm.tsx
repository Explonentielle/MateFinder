"use client"

import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/src/components/ui/form"
import { Textarea } from "@/src/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createReviewAction } from "./Review.action"
import { ReviewSchema, ReviewType } from "./Review.schema"
import { Button } from "@/src/components/ui/button"
import LucideIcons, { IconName } from "@/src/components/LucideIcons"
import { Input } from "@/src/components/ui/input"
import { Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

export type ReviewFormProps = {
  activityId?: string
}

const ReviewForm = (props: ReviewFormProps) => {

  const form = useZodForm({
    schema: ReviewSchema,
  })

  const router = useRouter();

  const mutation = useMutation({

    mutationFn: async (values: ReviewType) => {
      console.log("toto")
      const { data, serverError } = await createReviewAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }
      toast.success("Review created");
      router.push(`/activities/${props.activityId}/reviews`);
    }
  });
  

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Create Review</h2>
      </CardHeader>

      <CardContent>
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>

        <FormField
            control={form.control}
            name="activityId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                     {...field}
                     defaultValue={props.activityId ?? ""}/>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Enter your review title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field} />
                </FormControl>
                <FormDescription>
                  The title of the review.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">What did you think about this activity</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Details"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)} />
                </FormControl>
                <FormDescription>
                  The content of the review.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Rating</FormLabel>
                <FormControl>
                  <Select value={field.value ?? "1"} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"1"}>
                        <div>1</div>
                      </SelectItem>
                      <SelectItem value={"2"}>
                        <div>2</div>
                      </SelectItem>
                      <SelectItem value={"3"}>
                        <div>3</div>
                      </SelectItem>
                      <SelectItem value={"4"}>
                        <div>4</div>
                      </SelectItem>
                      <SelectItem value={"5"}>
                        <div>5</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Choose to rate between 1-5.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" >
            Create Review
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ReviewForm;
