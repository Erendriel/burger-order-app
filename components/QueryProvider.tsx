"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

type Props = {
    children: React.ReactNode
};

const QueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={new QueryClient}>{children}</QueryClientProvider>
    )
}

export default QueryProvider