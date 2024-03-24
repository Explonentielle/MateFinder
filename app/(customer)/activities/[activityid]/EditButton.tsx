"use client";

import { Button } from "@/src/components/ui/button"
import { Upload } from "lucide-react";
import Link from "next/link";

interface EditButtonProps {
    id: string;
  }

export const EditButton = ( { id }: EditButtonProps ) => {

    return (
        <Link href={`/activities/${id}/edit`}>
            <Button variant={"outline"}>
                <p className="mr-2">Update </p>
                <Upload size={16} />
            </Button>
        </Link>
    )
}
