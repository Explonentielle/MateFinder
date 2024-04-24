"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/src/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { LocationCategories, UserSchema, UserType } from "./User.schema"
import { format, isValid, addYears } from "date-fns"
import React, { useEffect } from "react"
import { updateUserAction } from "./User.action"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { cn } from "@/src/lib/utils"
import { Calendar } from "@/src/components/ui/calendar"
import { UserAvatar } from "@/src/components/UserAvatar"

export type UserFormProps = {
  defaultValues?: UserType
}

const UserForm = (props: UserFormProps) => {

  const form = useZodForm({
    schema: UserSchema,
    defaultValues: props.defaultValues
  })
  const isCreate = !Boolean(props.defaultValues)
  const [date, setDate] = React.useState<Date>();
  const [avatarLink, setAvatarLink] = React.useState<string | undefined>(props.defaultValues?.image);

  const handlePresetSelection = (yearsToAdd: number) => {
    setDate(addYears(new Date(), -yearsToAdd));
  };

  const handleRandomizeAvatar = () => {
    const randomString = generateRandomString(15);
    setAvatarLink(randomString);
    form.setValue('image', randomString);
  }

  useEffect(() => {

  }, [date])


  const router = useRouter();
  const mutation = useMutation({

    mutationFn: async (values: UserType) => {
      const { data, serverError } = await updateUserAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      if (isCreate) {
        window.location.reload()
        toast.success("Profil Created");
      }
      else {
        toast.success("Profil Updated");
        router.push(`/`);
      }
    }
  });

  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreate
          ? <p className="font-extrabold text-lg md:text-2xl">Create Profil</p>
          : <p className="font-extrabold text-lg md:text-2xl">{`Update Profil : ${props.defaultValues?.username}`}</p>}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form className="flex flex-col gap-4" form={form} onSubmit={async (values) => await mutation.mutateAsync(values)}>


          <div className="py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Firstname Lastname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhon doe"
                      {...field} />
                  </FormControl>
                  <FormDescription>
                    Your  Firstname and Lastname
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !isValid(field.value) && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="w-full rounded-md border">
                          {!date ?
                              <Select onValueChange={(value) => handlePresetSelection(parseInt(value))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your birth year here" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  {Array.from({ length: 81 }, (_, index) => (
                                    <SelectItem key={index} value={String(index)}>
                                      {format(addYears(new Date(), -index), "yyyy")}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            :
                            <div className="rounded-md border">
                              <Calendar mode="single" toYear={date.getFullYear()} selected={field.value} onSelect={field.onChange} />
                            </div>}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field} />
                  </FormControl>
                  <FormDescription>
                    Chose your Username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Location</FormLabel>
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
                    Select your Location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="hidden"
                      placeholder="Avatar Link"
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center">
                    <Button type="button" onClick={handleRandomizeAvatar} className="mr-8 w-3/4 md:w-1/4">
                      Randomize your avatar
                    </Button>
                    <UserAvatar email={props.defaultValues?.name || ""} image={avatarLink} size={"size-14 md:size-20"} />
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full" variant={'default'} type="submit">Edit Profil</Button>
        </Form>
      </CardContent>

    </Card>
  )
}

export default UserForm;
