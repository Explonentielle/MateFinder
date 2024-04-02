"use client"

import React, { FormEvent, useState } from "react";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
import { verifyUserUniqueness } from "../(customer)/users/[id]/edit/User.action";
import { toast } from "sonner";
import UserForm from "../(customer)/users/[id]/edit/UserForm";


export type UserFormProps = {
    userId?: string
}

const ProfileUpdateForm = (userId: UserFormProps) => {
    const [username, setUsername] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userId?.userId) {
            try {
                const message = await verifyUserUniqueness(username, userId.userId, true);
                if (message) {
                    toast.error(message);
                } else {
                    setSubmitted(true);
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while verifying user uniqueness.");
            }
        }
    };

    return (
        <Layout>
            <LayoutTitle>Create My Profile</LayoutTitle>
            <Card>
                <CardContent className="shadow-lg p-8">
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <Input className="p-4"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Button className="w-full my-4" variant="default" type="submit">
                                Choose this username
                            </Button>
                        </form>
                    ) : (
                                <UserForm userId={userId?.userId} username={username} />
                    )}
                </CardContent>
            </Card>
        </Layout>
    );
};

export default ProfileUpdateForm;
