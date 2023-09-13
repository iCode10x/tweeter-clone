'use client'
import { NotificationsType } from '@/Types'
import SingleNotification from './SingleNotification'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { resetNotificationNumber } from '@/lib/actions/UserActions'
const Notifications = ({
  notifications,
  notificationsNumber,
  LoggedInUserId,
}: {
  notifications: string
  notificationsNumber: number
  LoggedInUserId: string
}) => {
  const notificationsList: NotificationsType[] = JSON.parse(notifications)
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  async function handleClick() {
    setShowNotifications(true)
    await resetNotificationNumber(LoggedInUserId, pathname)
  }
  return (
    <div className="mt-6 p-2 rounded-[6px] dark:bg-[#121212]   w-fit font-SamsungSharpSans">
      <button
        onClick={handleClick}
        className="bg-[#060606]  rounded-[6px] text-white p-2 px-3"
      >
        Notifications{' '}
        <span>
          {notificationsNumber > 0 ? `( ${notificationsNumber} )` : null}
        </span>
      </button>
      {showNotifications && (
        <div
          onClick={() => setShowNotifications(false)}
          className="fixed h-screen w-screen z-20 top-0 left-0 flex"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F6F6F6] dark:bg-[#121212] absolute left-5 top-[33%] p-2   rounded-[10px]"
          >
            {notificationsList.length > 0 ? (
              <ScrollArea className="h-[200px]">
                {notificationsList.reverse().map((item) => (
                  <SingleNotification
                    key={item._id}
                    activity={item.activity}
                    profileImage={item.visitorId.profileImage}
                    name={item.visitorId.name}
                  />
                ))}
              </ScrollArea>
            ) : (
              <p className="text-[14px] ">You have no notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Notifications
