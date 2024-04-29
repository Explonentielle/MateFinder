"use client"

import { Layout, LayoutTitle } from "@/src/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { LocationCategories } from "../../../app/(customer)/users/[id]/edit/User.schema";
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
        <>
            <LayoutTitle className="flex items-center">
                <p className="mr-2 md:mr-4 text-lg md:text-4xl">Bienvenue sur</p><p className="titleBorder font-extrabold text-2xl md:text-5xl">Mate Finder</p>
            </LayoutTitle>
            <h1 className="text-xl md:text-2xl  pl-6">Découvrez de nombreux partenaires et l'activité parfaite avec Mate Finder </h1>
            <Card>
                <CardHeader>
                    <span className="text-md">Voir toutes les activités proche de vous</span>
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
                        <Link aria-label="Select location" href={`/landing/${selectedLocation}`}>
                            <Button aria-label="Select location" className="w-full my-4" variant="default">
                            Choisir ce département
                            </Button>
                        </Link>
                        :
                        <Button aria-label="Select location" className="w-full my-4" variant="default">
                            Choisir ce département
                        </Button>}
                </CardContent>
            </Card>
        </>
    );
}
