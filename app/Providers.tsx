"use client"

import { Toaster } from "@/src/components/ui/sonner"
import { ThemeProvider } from "@/src/features/theme/ThemeProvider"
import { PropsWithChildren } from "react"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export type ProvidersProps = PropsWithChildren

export const Providers = (props: ProvidersProps) => {
    return <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {props.children}
        </QueryClientProvider>
    </ThemeProvider>
}