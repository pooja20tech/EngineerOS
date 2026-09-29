import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Compass,
  ClipboardCheck,
  Map,
  Brain,
  MessageSquare,
  User,
  BriefcaseBusiness,
  TrendingUp,
  Sparkles,
  LogOut,
} from "lucide-react";

function MainLayout() {
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Career & Domain Exploration",
      path: "/careers",
      icon: Compass,
    },
    {
      name: "Domain Interest Test",
      path: "/domain-test",
      icon: ClipboardCheck,
    },
    {
      name: "Career Roadmap",
      path: "/roadmap",
      icon: Map,
    },
    {
      name: "Aptitude Test",
      path: "/aptitude",
      icon: Brain,
    },
    {
      name: "Soft Skills Assessment",
      path: "/soft-skills",
      icon: MessageSquare,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Placement Prediction",
      path: "/placement",
      icon: BriefcaseBusiness,
    },
    {
      name: "Progress Tracking",
      path: "/progress",
      icon: TrendingUp,
    },
    {
      name: "AI Tutor / Assistant",
      path: "/ai-tutor",
      icon: Sparkles,
    },
  ];

  const handleLogout = () => {
    // Remove login/session information
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("profileCompleted");

    // Go back to login page
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FF]">

      {/* SIDEBAR */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          overflow-y-auto
          border-r
          border-[#E2E5F2]
          bg-[#F0F3FF]
          px-4
          py-6
          text-[#172554]
        "
      >

        {/* LOGO */}
        <div className="mb-10 px-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#172554]">
            EngineerOS
          </h1>

          <div className="mt-2 h-1 w-8 rounded-full bg-[#6D4AFF]" />
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-3
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#6D4AFF] text-white shadow-md"
                      : "text-[#172554] hover:bg-[#6D4AFF] hover:text-white hover:shadow-md"
                  }
                  `
                }
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                />

                <span className="text-sm leading-5">
                  {item.name}
                </span>
              </NavLink>
            );
          })}

        </nav>

        {/* LOGOUT */}
        <div className="mt-6 border-t border-[#DDE1F0] pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-3
              text-left
              text-sm
              font-medium
              text-[#172554]
              transition-all
              duration-200
              hover:bg-[#6D4AFF]
              hover:text-white
              hover:shadow-md
            "
          >
            <LogOut
              size={20}
              strokeWidth={1.8}
            />

            <span>
              Logout
            </span>
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main
        className="
          ml-64
          min-h-screen
          bg-[#F7F8FF]
          p-8
        "
      >
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;