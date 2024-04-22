"use client"

import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { LocationCategories } from "../(customer)/users/[id]/edit/User.schema";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";


export const LocationForm = () => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selected, setSelected] = useState(false);


    const handleSelectChange = (newValue: string) => {
        setSelectedLocation(newValue);
        setSelected(true);
    }



    return (
        <Layout>
            <Layout>
                <LayoutTitle className="flex items-center">
                    <p className="mr-4 text-4xl">Welcome to</p><p className="titleBorder font-extrabold text-5xl">Mate Finder</p>
                </LayoutTitle>
                <h1 className="text-2xl  pl-6">Discover your perfect mate with Mate Finder</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Select your Department</CardTitle>
                    </CardHeader>
                    <CardContent className="shadow-lg p-8">
                        <Select required value={selectedLocation} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {LocationCategories.map((location) => (
                                    <SelectItem value={location} key={location}>
                                        <div>{location}</div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selected ?
                            <Link href={`/landing/${selectedLocation}`}>
                                <Button className="w-full my-4" variant="default">
                                    Choose this Department
                                </Button>
                            </Link>
                            :
                            <Button className="w-full my-4" variant="default">
                                Choose this Department
                            </Button>}
                    </CardContent>
                </Card>
            </Layout>
        </Layout>
    );
}
