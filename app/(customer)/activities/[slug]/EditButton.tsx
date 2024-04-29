"use client";

import { Button } from "@/src/components/ui/button"
import { Upload } from "lucide-react";
import Link from "next/link";

interface EditButtonProps {
    slug: string;
  }

export const EditButton = ( { slug }: EditButtonProps ) => {

    return (
        <Link href={`/activities/${slug}/edit`}>
            <Button variant={"outline"}>
                <p className="mr-2">Update</p>
                <Upload size={16} />
            </Button>
        </Link>
    )
}
