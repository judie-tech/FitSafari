import { Bell, Search, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header({
  sidebarOpen,
  setSidebarOpen,
  userName = "Alex",
  userFullName = "Alex Johnson",
  onLogout = () => console.log("Logout clicked"),
  notifications = [
    {
      id: 1,
      message: "🎉 New personal record! You've hit your weekly workout goal",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "🏃‍♂️ Congratulations! You've completed 10 workouts this month",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      message: "💪 Achievement unlocked: 30-day streak completed!",
      time: "2 days ago",
      read: true,
    },
  ],
}) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2 hover:bg-emerald-50 dark:hover:bg-emerald-900"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </Button>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Welcome back,{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            {userName}
          </span>
          !
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 border-emerald-200 dark:border-emerald-800"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500"
            size={18}
          />
        </div>

        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900"
              >
                <Bell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">Notifications</h4>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                        !notification.read
                          ? "bg-emerald-50 dark:bg-emerald-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900"
            >
              <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <div className="p-4 border-b">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {userFullName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userName}
                </p>
              </div>
            </div>
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

export default Header;
