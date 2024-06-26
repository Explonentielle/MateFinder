"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { ActivitySchema, ActivityType, activityCategories, icons } from "./Activity.schema"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField, useZodForm } from "@/src/components/ui/form"
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
import { Switch } from "@/src/components/ui/switch"
import { LocationCategories } from "@/app/(customer)/users/[id]/edit/User.schema"


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
      if (!isCreate) {
        toast.success("Activity update")
      } else {
        toast.success("Activity created")
      }
      router.push(`/activities/${data.slug}`)
    }
  })
  const availablesPlaces = ["1","2","3","4","5","6","7","8","9",]


  return (
    <Card>
      <CardHeader className="p-2 md:p-6">
        <CardTitle>{isCreate
          ? <p className="font-extrabold text-lg md:text-2xl">Créer une activité</p>
          : <p className="font-extrabold text-lg md:text-2xl">{`Edit activity : ${props.defaultValues?.Title}`}</p>}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>
          <Tabs defaultValue="one" className="w-full flex flex-col justify-center">
            <TabsList >
              <TabsTrigger className="w-full" value="one">Etape One</TabsTrigger>
              <TabsTrigger className="w-full" value="two">Etape Two</TabsTrigger>
              <TabsTrigger className="w-full" value="three">Etape Three</TabsTrigger>
            </TabsList>
            <TabsContent value="one">
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="Title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Titre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Running"
                          {...field} />
                      </FormControl>
                      <FormDescription>
                         Titre de l activité proposé
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2">
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
                            const value = e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/gi, '').replace(" ", "-").toLocaleLowerCase()
                            field.onChange(value)
                          }} />
                      </FormControl>
                      <FormDescription>
                        Le Slug dans l url de la page de votre activité.  max 20 chars no spécial chars no space
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="categorie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Categories</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
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
                        Selectionez la categorie de votre activité
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2">
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
                        Selectionez votre icon
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="two">
              <div>
                <div className="py-2">
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
                          Plus Informations à propos de l activité proposée
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="Date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">Selectionez une date pour cette activité</FormLabel>
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
                                  <span>selectionnez une date</span>
                                )}
                                <CalendarIcon className="ml-auto size-4 opacity-50" />
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
                          Date de votre activité
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="Hour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Heur</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Hours"
                            {...field} />
                        </FormControl>
                        <FormDescription>
                          L heur à l aquel votre activité ce déroule
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="Departement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Departement</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {LocationCategories.map((location) => {
                                return (
                                  <SelectItem value={location} key={location}>
                                    <div>{location}</div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>

                          </Select>
                        </FormControl>
                        <FormDescription>
                          Selectionez votre Departement
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="three">

              <div className="py-2">
                <FormField
                  control={form.control}
                  name="Location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Lieux</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Location"
                          {...field} />
                      </FormControl>
                      <FormDescription>
                        Lieux ou l activité ce déroulera
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div className="py-2">
                <FormField
                  control={form.control}
                  name="userWanted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Places disponible</FormLabel>
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
                        Entrer le nombre de places disponible pour votre activité
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2">
                <FormField
                  control={form.control}
                  name="Free"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>FREE</FormLabel>
                        <FormDescription>
                          Cette activité est gratuit ou non.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="py-2">
                <FormField
                  control={form.control}
                  name="Link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Liens  *optionel</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Link"
                          {...field} />
                      </FormControl>
                      <FormDescription>
                        Liens vers l etablissement proposant l activité.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" variant={'default'} type="submit">Créer cette activité</Button>

            </TabsContent>
          </Tabs>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ActivityForm