"use client"

import React, { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  UserCog, 
  Settings, 
  LogOut, 
  MessageSquare, 
  Phone, 
  Calendar,
  TrendingUp,
  Users,
  Clock,
  Filter,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard",
      icon: <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/dashboard",
      icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "/",
      icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User Name",
                href: "/dashboard",
                icon: (
                  <Image
                    src="/placeholder-user.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  )
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-3 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="w-8 h-8 flex-shrink-0">
        <Image
          src="/images/cliste-logo.png"
          alt="Cliste Logo"
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        ClisteOS 1.0
      </motion.span>
    </Link>
  )
}

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex items-center justify-center text-sm text-black py-1 relative z-20"
    >
      <div className="w-8 h-8 flex-shrink-0">
        <Image
          src="/images/cliste-logo.png"
          alt="Cliste Logo"
          width={32}
          height={32}
          className="w-full h-full object-contain"
        />
      </div>
    </Link>
  )
}

// Dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1 overflow-auto">
      <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Conversations"
            value="12"
            change="+3"
            trend="up"
            icon={<MessageSquare className="w-5 h-5" />}
          />
          <StatCard
            title="Leads Captured"
            value="47"
            change="+12"
            trend="up"
            icon={<Users className="w-5 h-5" />}
          />
          <StatCard
            title="Appointments Booked"
            value="23"
            change="+5"
            trend="up"
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatCard
            title="Avg Response Time"
            value="1.2s"
            change="-0.3s"
            trend="up"
            icon={<Clock className="w-5 h-5" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Channel Performance */}
          <div className="lg:col-span-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Channel Performance</h2>
            <div className="space-y-4">
              <ChannelBar label="Phone Calls" value={145} max={200} color="blue" />
              <ChannelBar label="WhatsApp" value={98} max={200} color="green" />
              <ChannelBar label="Messenger" value={76} max={200} color="purple" />
              <ChannelBar label="Instagram DMs" value={54} max={200} color="pink" />
              <ChannelBar label="Website Chat" value={112} max={200} color="slate" />
            </div>
          </div>

          {/* Smart Filtering Stats */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Smart Filtering</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-900 dark:text-green-100">High-Intent Buyers</span>
                </div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">32</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Identified today</p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-1">
                  <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-amber-900 dark:text-amber-100">Filtered Out</span>
                </div>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">18</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Tire kickers blocked</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Time Saved</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.5hrs</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Staff hours saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem 
              type="lead"
              message="New qualified lead: Sarah Johnson interested in BMW X5"
              time="2 min ago"
            />
            <ActivityItem 
              type="appointment"
              message="Test drive booked: Michael Brown - Mercedes GLE"
              time="15 min ago"
            />
            <ActivityItem 
              type="call"
              message="Missed call handled: Inquiry about financing options"
              time="23 min ago"
            />
            <ActivityItem 
              type="message"
              message="WhatsApp conversation: Parts availability inquiry"
              time="45 min ago"
            />
            <ActivityItem 
              type="filter"
              message="Filtered spam: 3 non-genuine inquiries blocked"
              time="1 hour ago"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, change, trend, icon }: { 
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{title}</span>
        <div className="text-neutral-600 dark:text-neutral-400">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}>
          {trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span>{change}</span>
        </div>
      </div>
    </div>
  )
}

// Channel Bar Component
const ChannelBar = ({ label, value, max, color }: {
  label: string
  value: number
  max: number
  color: string
}) => {
  const percentage = (value / max) * 100
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    slate: "bg-slate-500"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
        <span className="text-sm font-semibold text-neutral-900 dark:text-white">{value}</span>
      </div>
      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", colorClasses[color as keyof typeof colorClasses])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Activity Item Component
const ActivityItem = ({ type, message, time }: {
  type: "lead" | "appointment" | "call" | "message" | "filter"
  message: string
  time: string
}) => {
  const iconMap = {
    lead: <Users className="w-4 h-4 text-green-600 dark:text-green-400" />,
    appointment: <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    call: <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    message: <MessageSquare className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
    filter: <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
  }

  return (
    <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="mt-0.5">{iconMap[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-neutral-900 dark:text-white">{message}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{time}</p>
      </div>
    </div>
  )
}

