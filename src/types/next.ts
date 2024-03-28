export type LayoutParams<T extends Record<string, string | string[]>> = {
    children: React.ReactNode,
    params: T,

}

export type PageParams<T extends Record<string, string | string[]>> = {
    params: T,
    searchParams: { [key: string]:  string | string[] | undefined }
}

export type Activity = {
    id: string;
    Title: string;
    Icon: string;
    Date: Date;
    reviews: Review[];
};

export type Review = {
    id: string;
    Title: string;
    content: string;
    ip: string | null;
    rating: string;
    activityId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};