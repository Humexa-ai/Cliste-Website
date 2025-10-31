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
  ShoppingBag,
  CreditCard,
  Bell,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  PhoneIncoming,
  PhoneOutgoing
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  
  const links = [
    {
      label: "Overview",
      href: "#overview",
      icon: <LayoutDashboard className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("overview")
    },
    {
      label: "Chats",
      href: "#chats",
      icon: <MessageSquare className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("chats")
    },
    {
      label: "Voice Calls",
      href: "#voice",
      icon: <Phone className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("voice")
    },
    {
      label: "Calendar",
      href: "#calendar",
      icon: <Calendar className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("calendar")
    },
    {
      label: "Bookings",
      href: "#bookings",
      icon: <CheckCircle2 className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("bookings")
    },
    {
      label: "Products/Services",
      href: "#products",
      icon: <ShoppingBag className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("products")
    },
    {
      label: "Payments",
      href: "#payments",
      icon: <CreditCard className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("payments")
    },
    {
      label: "Notifications",
      href: "#notifications",
      icon: <Bell className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("notifications")
    },
    {
      label: "Settings",
      href: "#settings",
      icon: <Settings className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
      action: () => setActiveSection("settings")
    },
    {
      label: "Logout",
      href: "/",
      icon: <LogOut className="text-neutral-700 h-5 w-5 flex-shrink-0" />
    },
  ]
  const [open, setOpen] = useState(true)

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-white w-full flex-1 border border-neutral-200 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.action}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Business Owner",
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
      <Dashboard activeSection={activeSection} />
    </div>
  )
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-3 items-center text-sm text-black py-1 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre"
      >
        Clutch Dashboard
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
      <div className="w-8 h-8 flex-shrink-0 bg-slate-800 rounded flex items-center justify-center">
        <span className="text-white font-bold text-xs">CD</span>
      </div>
    </Link>
  )
}

// Dashboard component with all sections
const Dashboard = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="flex flex-1 overflow-auto bg-slate-50">
      <div className="p-4 md:p-8 flex flex-col flex-1 w-full">
        {activeSection === "overview" && <OverviewSection />}
        {activeSection === "chats" && <ChatsSection />}
        {activeSection === "voice" && <VoiceCallsSection />}
        {activeSection === "calendar" && <CalendarSection />}
        {activeSection === "bookings" && <BookingsSection />}
        {activeSection === "products" && <ProductsSection />}
        {activeSection === "payments" && <PaymentsSection />}
        {activeSection === "notifications" && <NotificationsSection />}
        {activeSection === "settings" && <SettingsSection />}
      </div>
    </div>
  )
}

// Overview Section
const OverviewSection = () => {
  const metrics = [
    { label: "Total Bookings", value: "143", icon: <Calendar className="h-5 w-5" />, color: "bg-blue-500" },
    { label: "Calls Today", value: "29", icon: <Phone className="h-5 w-5" />, color: "bg-green-500" },
    { label: "Messages", value: "156", icon: <MessageSquare className="h-5 w-5" />, color: "bg-purple-500" },
    { label: "New Leads", value: "12", icon: <Users className="h-5 w-5" />, color: "bg-orange-500" },
    { label: "Completed Appointments", value: "98", icon: <CheckCircle2 className="h-5 w-5" />, color: "bg-emerald-500" },
    { label: "Staff Activity", value: "85%", icon: <TrendingUp className="h-5 w-5" />, color: "bg-indigo-500" },
  ]

  const channels = [
    { name: "WhatsApp", messages: 89, color: "bg-green-100 text-green-700" },
    { name: "Messenger", messages: 34, color: "bg-blue-100 text-blue-700" },
    { name: "Instagram", messages: 21, color: "bg-pink-100 text-pink-700" },
    { name: "Website Widget", messages: 12, color: "bg-slate-100 text-slate-700" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard Overview</h1>
        <p className="text-neutral-600">Your business performance at a glance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${metric.color} text-white p-3 rounded-lg`}>
                {metric.icon}
              </div>
            </div>
            <div className="text-3xl font-bold text-black mb-1">{metric.value}</div>
            <div className="text-sm text-neutral-600">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Channel Breakdown */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-xl font-semibold text-black mb-4">Messages by Channel</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {channels.map((channel, idx) => (
            <div key={idx} className="text-center">
              <div className={`${channel.color} px-4 py-2 rounded-lg mb-2 font-semibold`}>
                {channel.name}
              </div>
              <div className="text-2xl font-bold text-black">{channel.messages}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {[
              { time: "10:30 AM", client: "Sarah Murphy", service: "Haircut", status: "Upcoming" },
              { time: "2:15 PM", client: "John Doe", service: "Beard Trim", status: "Confirmed" },
              { time: "4:00 PM", client: "Emma Walsh", service: "Color Treatment", status: "Upcoming" },
            ].map((booking, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-black">{booking.client}</div>
                  <div className="text-sm text-neutral-600">{booking.service}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-black">{booking.time}</div>
                  <div className="text-xs text-green-600">{booking.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-xl font-semibold text-black mb-4">New Leads</h2>
          <div className="space-y-3">
            {[
              { name: "Michael O'Connor", source: "Instagram", time: "5 min ago" },
              { name: "Lisa Ryan", source: "WhatsApp", time: "12 min ago" },
              { name: "David Byrne", source: "Website", time: "23 min ago" },
            ].map((lead, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-black">{lead.name}</div>
                  <div className="text-sm text-neutral-600">{lead.source}</div>
                </div>
                <div className="text-sm text-neutral-500">{lead.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Chats Section
const ChatsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Unified Chats</h1>
        <p className="text-neutral-600">All customer conversations in one inbox</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
          <p className="text-neutral-600">Chat interface coming soon</p>
        </div>
      </div>
    </div>
  )
}

// Voice Calls Section
const VoiceCallsSection = () => {
  const calls = [
    { type: "incoming", name: "Sarah Murphy", phone: "+353 85 123 4567", duration: "2:34", time: "10:15 AM" },
    { type: "outgoing", name: "John Doe", phone: "+353 87 765 4321", duration: "1:45", time: "9:45 AM" },
    { type: "incoming", name: "Emma Walsh", phone: "+353 83 111 2222", duration: "0:00", time: "8:30 AM" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Voice Calls</h1>
        <p className="text-neutral-600">Track all incoming and outgoing calls</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="space-y-3">
          {calls.map((call, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                {call.type === "incoming" ? (
                  <PhoneIncoming className="h-5 w-5 text-green-600" />
                ) : (
                  <PhoneOutgoing className="h-5 w-5 text-blue-600" />
                )}
                <div>
                  <div className="font-semibold text-black">{call.name}</div>
                  <div className="text-sm text-neutral-600">{call.phone}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-black">{call.duration}</div>
                <div className="text-xs text-neutral-500">{call.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Calendar Section
const CalendarSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Calendar</h1>
        <p className="text-neutral-600">View and manage all upcoming bookings</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
          <p className="text-neutral-600">Calendar view coming soon</p>
        </div>
      </div>
    </div>
  )
}

// Bookings Section
const BookingsSection = () => {
  const bookings = [
    { id: "BK001", client: "Sarah Murphy", service: "Haircut & Styling", staff: "Emma", time: "10:30 AM", status: "Confirmed" },
    { id: "BK002", client: "John Doe", service: "Beard Trim", staff: "David", time: "2:15 PM", status: "Confirmed" },
    { id: "BK003", client: "Lisa Ryan", service: "Color Treatment", staff: "Emma", time: "4:00 PM", status: "Pending" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">All Bookings</h1>
        <p className="text-neutral-600">Manage appointments and booking details</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {bookings.map((booking, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{booking.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{booking.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{booking.staff}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">{booking.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Products/Services Section
const ProductsSection = () => {
  const products = [
    { name: "Standard Haircut", price: "€45", category: "Hair Services" },
    { name: "Beard Trim", price: "€25", category: "Grooming" },
    { name: "Color Treatment", price: "€120", category: "Hair Services" },
    { name: "Highlights", price: "€150", category: "Hair Services" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Products & Services</h1>
        <p className="text-neutral-600">Manage your business offerings</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="space-y-4">
          {products.map((product, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <div className="font-semibold text-black">{product.name}</div>
                <div className="text-sm text-neutral-600">{product.category}</div>
              </div>
              <div className="text-xl font-bold text-black">{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Payments Section
const PaymentsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Payments</h1>
        <p className="text-neutral-600">Track billing and payment status</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="text-center py-12">
          <CreditCard className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
          <p className="text-neutral-600">Payment information coming soon</p>
        </div>
      </div>
    </div>
  )
}

// Notifications Section
const NotificationsSection = () => {
  const notifications = [
    { type: "success", message: "New Booking Confirmed - Sarah Murphy at 10:30 AM", time: "5 min ago" },
    { type: "info", message: "Payment Received - Invoice #1234", time: "12 min ago" },
    { type: "warning", message: "AI failed to send WhatsApp message", time: "23 min ago" },
    { type: "error", message: "Workflow Disconnected", time: "1 hour ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Notifications Center</h1>
        <p className="text-neutral-600">Real-time updates and alerts</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="space-y-3">
          {notifications.map((notification, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-l-4 ${
              notification.type === "success" ? "bg-green-50 border-green-500" :
              notification.type === "info" ? "bg-blue-50 border-blue-500" :
              notification.type === "warning" ? "bg-yellow-50 border-yellow-500" :
              "bg-red-50 border-red-500"
            }`}>
              <div className="flex items-start justify-between">
                <p className="text-black">{notification.message}</p>
                <span className="text-xs text-neutral-500 whitespace-nowrap ml-4">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Settings Section
const SettingsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Settings</h1>
        <p className="text-neutral-600">Manage your dashboard preferences</p>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="text-center py-12">
          <Settings className="h-16 w-16 mx-auto mb-4 text-neutral-400" />
          <p className="text-neutral-600">Settings panel coming soon</p>
        </div>
      </div>
    </div>
  )
}
