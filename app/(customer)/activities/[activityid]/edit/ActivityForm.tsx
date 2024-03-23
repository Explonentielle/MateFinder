"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ActivitySchema, ActivityType, activityCategories } from "./Activity.schema"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/src/components/ui/form"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { createActivityAction, updateActivityAction } from "./Activity.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { cn } from "@/src/lib/utils"
import { Calendar } from "@/src/components/ui/calendar"
import { format } from "date-fns"




export type ActivityFormProps = {
  defaultValues?: ActivityType
  activityId?: string
}

export const ActivityForm = (props: ActivityFormProps) => {
  const form = useZodForm({
    schema: ActivitySchema,
    defaultValues: props.defaultValues
  })

  const isCreate = !Boolean(props.defaultValues)
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: ActivityType) => {
      const { data, serverError } = isCreate? await createActivityAction(values) : 
        await updateActivityAction({
          id: props.activityId ?? "-",
          data: values
        })

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }
      toast.success("Activity created");
      router.push(`/activities/${data.id}`)
    }
  })
  const availablesPlaces = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]


  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreate
          ? "Create avtivity"
          : `Edit avtivity ${props.defaultValues?.Title}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>
          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Running"
                    {...field} />
                </FormControl>
                <FormDescription>
                  The Title of the activity proposed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="my slug"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(" ", "-").toLocaleLowerCase()

                      field.onChange(value)
                    }} />
                </FormControl>
                <FormDescription>
                  The Slug in the url of your activity page
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categorie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {activityCategories.map((activity) => {
                        return (
                          <SelectItem value={activity} key={activity}>
                            <div>{activity}</div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>

                  </Select>
                </FormControl>
                <FormDescription>
                  Select your activity Categorie
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Information"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Informations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="details"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)} />
                </FormControl>
                <FormDescription>
                  More Informations about activity proposed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select the scheduled date for this activity.</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ?? new Date()}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userWanted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available spots</FormLabel>
                <FormControl>
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availablesPlaces.map((place) => {
                        return (
                          <SelectItem value={place} key={place}>
                            <div>{place}</div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Enter the number of available spots for your activity
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'secondary'} type="submit">Edit Activity</Button>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ActivityForm