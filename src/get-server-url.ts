export const getServerUrl = () => {

    if (typeof window !== "undefined") {
        return window.location.origin;
    }
    if (process.env.VERCEL_ENV === "production") {
        return "https://matefinder.vercel.app"
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }
    return "https://localhost:3000"
}

