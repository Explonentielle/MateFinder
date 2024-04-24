import { UserAvatar } from "@/src/components/UserAvatar";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";
import { prisma } from "@/src/prisma";
import { ArrowLeft } from "lucide-react";


export const Sidebar = async () => {

  async function getOnlineUsers() {

    const url = `https://api.talkjs.com/v1/tVBP2u6a/presences`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_test_Jjqcw9wCZFI0Kq5J1CcEFGXEPXfNBhZb'
      },
      body: JSON.stringify({
        includeBackgroundSessions: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching online users: ${response.statusText}`);
    }
    const onlineUsersData = await response.json();

    const onlineUserIds = [];
    for (const userId in onlineUsersData.data) {
      onlineUserIds.push(userId);
    }
    return onlineUserIds;
  }


  async function getOnlineUsersInfo() {
    const onlineUserIds = await getOnlineUsers();

    const onlineUsers = await prisma.user.findMany({
      where: {
        id: {
          in: onlineUserIds,
        }
      },
      select: {
        username: true,
        image: true
      }
    });
    return onlineUsers;
  }


  const onlineUsersInfo = await getOnlineUsersInfo();


  return (
    <div className={`relative overflow-hidden flex flex-row lg:flex-col-reverse justify-between lg:justify-end items-start w-full lg:w-[14vw] h-[10vh] lg:h-full  lg:fixed border-b lg:border-r border-border px-4 transition-all duration-300 z-10`}>
      <div className="flex lg:flex-col items-center lg:items-start">
        <span>online users :</span>

        <ScrollArea className="w-[45%] md:w-full lg:w-full whitespace-nowrap">
          <div className="mt-2 flex lg:flex-col pl-2">
            {onlineUsersInfo.map(user => (
              <li className="flex flex-row lg:flex-col ml-2 lg:ml-0" key={user.username}>
                <div className="flex items-center mb-2">
                  <UserAvatar email={user.username || ""} image={user.image || ""} size="size-4" />
                  <span className="ml-2 text-xs">{user.username}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                </div>
              </li>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="absolute right-5  h-full lg:h-auto lg:w-full flex items-end lg:items-center justify-end cursor-pointer py-2">
        <ArrowLeft className=" rotate-90 lg:rotate-0 text-primary" size={24} />
      </div>
    </div>
  )
}





