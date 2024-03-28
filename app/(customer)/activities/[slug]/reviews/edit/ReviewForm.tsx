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
import { Input } from "@/src/components/ui/input"
import { Star } from "lucide-react"

import React, { useEffect } from "react"

export type ReviewFormProps = {
  slug?: string
  activityId?: string
}

const ReviewForm = (props: ReviewFormProps) => {

  const form = useZodForm({
    schema: ReviewSchema,
  })

  const router = useRouter();
  const [rating, setRating] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (values: ReviewType) => {
      const { data, serverError } = await createReviewAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }
      toast.success("Review created");
      router.push(`/activities/${props.slug}/reviews`);
    }
  });

  const handleStarClick = (value: string) => {
    setRating(value);
    form.setValue('rating', value);
  };


  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Create Review</h2>
      </CardHeader>

      <CardContent>
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>

          <input
            type="hidden"
            {...form.register("activityId")}
            defaultValue={props.activityId ?? ""}
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
                  <div className="flex items-center">
                    {["1", "2", "3", "4", "5"].map((num) => (
                      <Star
                        key={num}
                        size={24}
                        onClick={() => handleStarClick(num) }
                        className={rating && rating >= num ? "text-yellow-500 cursor-pointer" : "cursor-pointer"}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Click on the stars to rate (1-5).
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
