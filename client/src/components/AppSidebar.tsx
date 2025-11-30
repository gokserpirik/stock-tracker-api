import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { Home, TrendingUp, LogOut, KeyRound, User, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/useAuth";

export function AppSidebar() {
  const { logout, userEmail } = useAuth();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  // Extract username from email (part before @)
  const username = userEmail ? userEmail.split('@')[0] : 'User';

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <Home className="text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Stocks",
      href: "/stocks",
      icon: (
        <TrendingUp className="text-neutral-200 h-5 w-5 shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        
        {/* User Section - Claude Style */}
        <div className="border-t border-neutral-700 pt-3">
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                className="mb-2 flex flex-col gap-2"
              >
                <SidebarLink
                  link={{
                    label: "Change Password",
                    href: "/auth/change-password",
                    icon: <KeyRound className="text-neutral-200 h-5 w-5 shrink-0" />,
                  }}
                />
                <div
                  onClick={handleLogout}
                  className="flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer"
                >
                  <LogOut className="text-neutral-200 h-5 w-5 shrink-0" />
                  <motion.span
                    animate={{ 
                      display: open ? "inline-block" : "none",
                      opacity: open ? 1 : 0 
                    }}
                    className="text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                  >
                    Logout
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* User Button */}
          <div
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer"
          >
            <div className="h-5 w-5 shrink-0 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            <motion.div 
              animate={{ 
                display: open ? "flex" : "none",
                opacity: open ? 1 : 0 
              }}
              className="flex items-center justify-between flex-1"
            >
              <span className="text-neutral-100 text-sm font-medium whitespace-pre inline-block !p-0 !m-0">
                {username}
              </span>
              <motion.div
                animate={{ 
                  rotate: userMenuOpen ? 180 : 0 
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="h-4 w-4 text-neutral-200" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
