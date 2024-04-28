import { prisma } from "@/src/prisma";
import { SidebarClient } from "./SidebarClient";
import { env } from "@/src/env";


export const Sidebar = async () => {

  async function getOnlineUsers() {
    const url = env.TALKJS_URL;
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
    const users = await prisma.user.findMany({
      select: {
        username: true,
        image: true
      }
    });
    return {onlineUsers, users} ;
  }

  const onlineUsersInfo = await getOnlineUsersInfo();

  return (
    <SidebarClient usersInfo={onlineUsersInfo.onlineUsers} users={onlineUsersInfo.users} />
  )
}





