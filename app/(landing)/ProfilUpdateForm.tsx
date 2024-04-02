"use client"

import React, { FormEvent, useState } from "react";
import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";
import { verifyUserUniqueness } from "../(customer)/users/[id]/edit/User.action";


export type UserFormProps = {
    userId?: string
}

const ProfileUpdateForm = (userId: UserFormProps) => {
    const [username, setUsername] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userId.userId) {
            verifyUserUniqueness(username, userId.userId)
        }

        setSubmitted(true);
    };

    return (
        <Layout>
            <LayoutTitle>Update My Profile</LayoutTitle>
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
                        <Card className="flex flex-col items-center">
                            <CardHeader>
                                <CardTitle>Username Available</CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col items-center">
                                <CardDescription>
                                    You can now check and update you profil
                                </CardDescription>
                                <Link className="my-8 flex items-center " href={`/users/${username}/new`}>
                                    <Button>
                                        View Profile
                                    </Button>
                                    <ArrowBigRight className="ml-4"/>
                                </Link>
                            </CardContent>

                        </Card> 
                    )}
                </CardContent>
            </Card>
        </Layout>
    );
};

export default ProfileUpdateForm;
