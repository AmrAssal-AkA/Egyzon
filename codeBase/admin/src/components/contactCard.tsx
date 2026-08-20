import React from "react";
import { Link } from "react-router-dom";
import {
  MessageSquareWarning,
  ChevronRight,
  ClipboardList,
  History,
  UserPlus,
  BarChart3,
  LucideIcon,
} from "lucide-react";

interface ContactSection {
  id: number;
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

interface ContactCardProps {
  className?: string;
}

export default function ContactCard({
  className = "",
}: ContactCardProps): React.ReactElement {
  const contactSections: ContactSection[] = [
    {
      id: 1,
      name: "Track complaint status",
      href: "/Track-compliants",
      icon: ClipboardList,
      description: "Monitor open cases in real time",
    },
    {
      id: 2,
      name: "View complaint history",
      href: "/View-compliants",
      icon: History,
      description: "Browse resolved and archived tickets",
    },
    {
      id: 3,
      name: "Assign complaints to team members",
      href: "/Assign-compliants",
      icon: UserPlus,
      description: "Route cases to the right owner",
    },
    {
      id: 4,
      name: "Generate reports on complaint trends",
      href: "/Generate-reports",
      icon: BarChart3,
      description: "Analyze patterns and resolution rates",
    },
  ];

  return (
    <div
      className={`bg-white border border-gray-200/80 shadow-sm rounded-xl p-5 flex flex-col ${className}`}
      role="region"
      aria-label="Customer complaints management"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Customer/user Compliants
          </h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-2xl">
            Overview of customer and user complaints across channels. Track,
            manage, and resolve issues to improve satisfaction.
          </p>
        </div>

        <div
          className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100/80 shrink-0"
          aria-hidden="true"
        >
          <MessageSquareWarning className="w-5 h-5" />
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {contactSections.map((section) => {
          const Icon = section.icon;

          return (
            <li key={section.id}>
              <Link
                to={section.href}
                className="group flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-blue-50/60 hover:border-blue-200/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <div className="p-2 rounded-md bg-white border border-gray-200/80 text-gray-500 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {section.name}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5 truncate">
                    {section.description}
                  </span>
                </div>

                <ChevronRight
                  className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <span className="text-xs text-gray-400">
          Quick access to complaint workflows
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-amber-50 text-amber-700 border-amber-200 shrink-0">
          {contactSections.length} Actions
        </span>
      </div>
    </div>
  );
}
