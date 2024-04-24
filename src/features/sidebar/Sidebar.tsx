import { prisma } from "@/src/prisma";


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
    <div className="w-full md:w-[10vw] h-[10vh] md:h-full  md:fixed border-r border-border px-4"> 
      {
        
      }



    </div>
  )
}
