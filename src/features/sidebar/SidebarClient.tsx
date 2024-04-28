"use client"

import { FC, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/src/components/ui/scroll-area';
import { UserAvatar } from '@/src/components/UserAvatar';
import { Input } from '@/src/components/ui/input';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { Card, CardContent } from '@/src/components/ui/card';

interface UserInfo {
    username: string | null;
    image: string | null;
}
interface SidebarClientProps {
    usersInfo: UserInfo[];
    users: UserInfo[]
}

export const SidebarClient: FC<SidebarClientProps> = ({ usersInfo, users }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchValue, setSearchValue] = useState("");


    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {

    }, [isOpen, searchValue])

    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className={`relative overflow-hidden flex flex-col lg:flex-col-reverse justify-between lg:justify-end items-start ${isOpen ? "w-full lg:w-[14vw]" : "w-full lg:w-[4vw]"} ${isOpen ? "h-[10vh] lg:h-full" : "h-[4vh] lg:h-full"} lg:fixed border-b lg:border-r border-border px-4 transition-all duration-300 z-10`}>
            {isOpen &&
                (<>
                    <div className="flex lg:flex-col items-center lg:items-start">
                        <span>Online</span>
                        <ScrollArea className="w-2/3 md:w-full whitespace-nowrap">
                            <div className="mt-2 flex lg:flex-col pl-2">
                                <div className="flex flex-row lg:flex-col ml-2 lg:ml-0" >
                                    <div className="flex items-center mb-2">
                                        <UserAvatar email={""} image={"qfef"} size="size-4" />
                                        <span className="ml-2 text-xs">{"MateAdmin"}</span>
                                        <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row lg:flex-col ml-2 lg:ml-0" >
                                    <div className="flex items-center mb-2">
                                        <UserAvatar email={""} image={"qfef"} size="size-4" />
                                        <span className="ml-2 text-xs">{"MateAdmin"}</span>
                                        <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                                    </div>
                                </div>
                                {usersInfo.map(user => (
                                    <div className="flex flex-row lg:flex-col ml-2 lg:ml-0" key={user.username}>
                                        <Link href={`/users/${user.username}`} className="flex items-center mb-2">
                                            <UserAvatar email={user.username || ""} image={user.image || ""} size="size-4" />
                                            <span className="ml-2 text-xs">{user.username}</span>
                                            <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                    <div className="overflow-visible flex items-center lg:items-start flex-row lg:flex-col my-2 lg:my-4">
                        <span>Find user</span>
                        <div>
                            <Input
                                className="w-2/3 lg:w-full mt-0 lg:mt-2 ml-4 lg:ml-0 rounded-2xl"
                                aria-label="find user"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            {(filteredUsers.length > 0 && searchValue !== "") && (
                                <Card className='absolute lg:relative top-0 left-0 mt-1 w-full' >
                                    <ScrollArea>
                                        <CardContent className="flex flex-row lg:flex-col items-start px-2 py-2">
                                            {filteredUsers.map(filtred => (
                                                <Link href={`/users/${filtred.username}`} key={filtred.username} className="flex items-center mb-0 lg:mb-2">
                                                    <UserAvatar email={filtred.username || ""} image={filtred.image || ""} size="size-4" />
                                                    <span className="ml-2 text-xs">{filtred.username}</span>
                                                    <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                                                </Link>
                                            ))}
                                        </CardContent>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </Card>
                            )}
                        </div>
                    </div>
                </>)
            }

            <div onClick={toggleSidebar} className="absolute right-5  h-full lg:h-auto lg:w-full flex items-end lg:items-center justify-end cursor-pointer py-2">
                <ArrowLeft className={`${isOpen ? "rotate-90 lg:rotate-0" : "-rotate-90 lg:-rotate-180"} text-primary`} size={24} />
            </div>
        </div>
    );
};