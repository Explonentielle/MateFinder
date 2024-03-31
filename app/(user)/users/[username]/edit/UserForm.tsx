"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/src/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { UserSchema, UserType } from "./User.schema"
import { format, isValid, parseISO } from "date-fns"
import { z } from "zod"
import React, { useEffect } from "react"
import { updateUserAction } from "./User.action"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"

import { cn } from "@/src/lib/utils"
import { Calendar } from "@/src/components/ui/calendar"

export type UserFormProps = {
  userId?: string
  username?: string
  defaultValues?: UserType
}

const UserForm = (props: UserFormProps) => {

  const form = useZodForm({
    schema: UserSchema,
    defaultValues: props.defaultValues
  })
  const isCreate = !Boolean(props.defaultValues)
  const [year, setYear] = React.useState<Date | undefined>(props.defaultValues?.age);
  const [inputYear, setInputYear] = React.useState<number | undefined>(year?.getFullYear());


  const router = useRouter();
  const mutation = useMutation({

    mutationFn: async (values: UserType) => {
      const { data, serverError } = await updateUserAction(values);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      toast.success("Profil Updated");
      router.push(`/`);
    }
  });


  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreate
          ? <p className="font-extrabold text-2xl">Create Profil</p>
          : <p className="font-extrabold text-2xl">{`Update Profil : ${props.defaultValues?.username}`}</p>}
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Input
                        type="text"
                        placeholder="Enter year"
                        onChange={(e) => {
                          setInputYear(Number(e.target.value));
                        }}
                        className="w-full"
                      />
                      <div className="rounded-md border">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          toYear={inputYear ? inputYear : year?.getFullYear()}
                          toDate={year}
                          toMonth={year}
                        />
                      </div>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      defaultValue={props.username}
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Avatar (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Avatar Link"
                      {...field} />
                  </FormControl>
                  <FormDescription>
                    Past the link of Avatar of your profil
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
