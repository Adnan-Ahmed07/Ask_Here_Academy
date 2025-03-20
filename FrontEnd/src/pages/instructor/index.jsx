import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";


const InstructorDashboardpage=()=> {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const {toast}=useToast();
  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard/>,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];
  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    toast("Logged out successfully!"); // Add toast notification
  }
  return(
<div className="flex h-full min-h-screen bg-gray-100">
<aside className="w-64 bg-white shadow-md hidden md:block">
<h2 className="text-2xl font-bold mb-4">Instructor View</h2>
<nav>
            {menuItems.map((menuItem) => (
           <Button
  className={`w-full justify-start mb-2 rounded-none transition-all duration-200 ${
    activeTab === menuItem.value
      ? "bg-green-50 border-l-4 border-green-500 text-green-700 font-semibold" // Active state styling
      : "hover:bg-green-50/50 active:bg-green-100 text-gray-600" // Hover/click states
  } ${
    menuItem.value === "logout" 
      ? "hover:bg-red-50 active:bg-red-100 text-red-600 hover:text-red-700"
      : ""
  }`}
  key={menuItem.value}
  variant="ghost"
  onClick={menuItem.value === "logout" ? handleLogout : () => setActiveTab(menuItem.value)}
>
  <menuItem.icon className="mr-2 h-4 w-4" />
  {menuItem.label}
</Button>
            ))}
          </nav>
</aside>
<main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
</div>
);
}

export default InstructorDashboardpage;