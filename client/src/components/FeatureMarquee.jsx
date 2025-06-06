import React from "react";
import {
  Rocket,
  Users,
  Bell,
  Moon,
  Move3D,
  ClipboardCheck,
  StickyNote,
  Video,
  Calendar,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Group Management",
    description: "Manage members, roles, and announcements.",
    icon: Users,
  },
  {
    title: "Task Tracking",
    description: "Assign, update, and prioritize tasks easily.",
    icon: ClipboardCheck,
  },
  {
    title: "Collaborative Notes",
    description: "Create and share rich text notes with versioning.",
    icon: StickyNote,
  },
  {
    title: "Virtual Meetings",
    description: "Join video calls, share screens, and take notes.",
    icon: Video,
  },
  {
    title: "Calendar & Timeline",
    description: "View all activities, events, and progress visually.",
    icon: Calendar,
  },
  {
    title: "Secure Access",
    description: "JWT auth, role-based access, and safe file storage.",
    icon: ShieldCheck,
  },
  {
    title: "Real-time Sync",
    description: "See updates instantly.",
    icon: Move3D,
  },
  {
    title: "Drag & Drop",
    description: "Easy board interaction.",
    icon: Rocket,
  },
  {
    title: "Collaboration",
    description: "Work together smoothly.",
    icon: Users,
  },
  {
    title: "Reminders",
    description: "Never miss a deadline.",
    icon: Bell,
  },
  {
    title: "Dark Mode",
    description: "Comfortable night view.",
    icon: Moon,
  },
];

export default function FeatureMarquee() {
  return (
    <div className="relative w-[70vw] h-[100px] overflow-hidden mt-10 flex items-center">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-background-dark/80 to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-background-dark/80 to-transparent" />

      {/* Marquee Content */}
      <div className="flex whitespace-nowrap animate-marquee gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-6">
            {features.map((feature, idx) => (
              <div
                key={`${i}-${idx}`}
                className="min-w-[200px] bg-transparent border border-white/20 rounded-xl p-4 shadow-md backdrop-blur-sm text-white font-mono flex flex-col items-start gap-2 hover:scale-[1.03] transition-transform"
              >
                <span className="flex items-center gap-2">
                  <feature.icon className="w-6 h-6 text-primary-dark" />
                  <h3 className="text-md font-semibold">{feature.title}</h3>
                </span>
                <p className="text-sm opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
