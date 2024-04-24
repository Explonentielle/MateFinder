import { UserAvatar } from "@/src/components/UserAvatar";
import { prisma } from "@/src/prisma";
import { ArrowRight } from "lucide-react";


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
    <div className={`flex flex-row lg:flex-col-reverse justify-between lg:justify-end items-start w-full lg:w-[10vw] h-[10vh] lg:h-full  lg:fixed border-b lg:border-r border-border px-4 transition-all duration-300 z-10`}>
      <ul className="mt-2 lg:mt-10">
        {onlineUsersInfo.map(user => (
          <div key={user.username}>
            <li  className="flex items-center mb-2">
              <UserAvatar email={user.username || ""} image={user.image || ""} size="size-4" />
              <span className="ml-2 text-xs">{user.username}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
            </li>
            <li className="flex items-center mb-2">
              <UserAvatar email={user.username || ""} image={user.image || ""} size="size-4" />
              <span className="ml-2 text-xs">{user.username}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
            </li>
          </div>
        ))}
      </ul>
      <div className="w-full flex items-center justify-end cursor-pointer py-2">
        <ArrowRight className=" rotate-90 lg:rotate-0 text-primary" size={24} />
      </div>
    </div>
  )
}





