"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { ActivitySchema, ActivityType, activityCategories, icons } from "./Activity.schema"
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
import LucideIcons, { IconName } from "@/src/components/LucideIcons"


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
      const { data, serverError } = isCreate ? await createActivityAction(values) :
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
          ? <p className="font-extrabold text-2xl">Create avtivity</p>
          : <p className="font-extrabold text-2xl">{`Edit activity : ${props.defaultValues?.Title}`}</p>}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>
          <Tabs defaultValue="one" className="w-full flex flex-col justify-center">
            <TabsList >
              <TabsTrigger className="w-full" value="one">Step One</TabsTrigger>
              <TabsTrigger className="w-full" value="two">Step Two</TabsTrigger>
            </TabsList>
            <TabsContent value="one">

              <div className="py-4">
                <FormField
                  control={form.control}
                  name="Title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Title</FormLabel>
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
              </div>

              <div className="py-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Slug</FormLabel>
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
              </div>
              <div className="py-4">
                <FormField
                  control={form.control}
                  name="categorie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Categories</FormLabel>
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
              </div>

              <div className="py-4">
                <FormField
                  control={form.control}
                  name="Icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Icon</FormLabel>
                      <FormControl>
                        <Select value={field.value ?? ""} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {icons.map((icon) => {
                              return (
                                <SelectItem value={icon} key={icon}>
                                  <LucideIcons name={icon as IconName} size={24} />
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select your icon
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="two">
              <div>
                <div className="py-4">
                  <FormField
                    control={form.control}
                    name="Information"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Informations</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Details"
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
                </div>
                <div className="py-4">
                  <FormField
                    control={form.control}
                    name="Date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">Select the scheduled date for this activity.</FormLabel>
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
                          Your activity date.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-4">
                  <FormField
                    control={form.control}
                    name="userWanted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Available spots</FormLabel>
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
                </div>
              </div>
              <Button className="w-full" variant={'default'} type="submit">Edit Activity</Button>
            </TabsContent>
          </Tabs>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ActivityForm