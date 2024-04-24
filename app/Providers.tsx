"use client"

import { Toaster } from "@/src/components/ui/sonner"
import { ThemeProvider } from "@/src/features/theme/ThemeProvider"
import { PropsWithChildren } from "react"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider } from "next-auth/react";
import { ChatProvider } from "./(customer)/users/chat/ChatContext"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const queryClient = new QueryClient()

export type ProvidersProps = PropsWithChildren

export const Providers = (props: ProvidersProps) => {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <QueryClientProvider client={queryClient}>
                    <ChatProvider>
                        <Toaster />
                        {props.children}
                    </ChatProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}