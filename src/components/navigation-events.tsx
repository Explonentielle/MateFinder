"use client"

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
    const [previousUrl, setPreviousUrl] = useState('');
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const currentUrl = `${pathname}?${searchParams}`;

        if (currentUrl !== previousUrl) {
            const isReturnFromForm = (previousUrl.includes(`/new?`) || previousUrl.includes(`/edit?`))
         
            if (isReturnFromForm) {
                window.location.reload();
            }
            setPreviousUrl(currentUrl);
        }
    }, [pathname, searchParams, previousUrl]);

    return null;
}