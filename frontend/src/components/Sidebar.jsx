import { ClipboardList, Gauge, ListChecks, PackagePlus } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const icons = {
  dashboard: Gauge,
  layanan: PackagePlus,
  pemesanan: ClipboardList,
  riwayat: ListChecks,
};

export default function Sidebar({ items }) {
  return (
    <aside className="border-b border-slate-200 bg-white md:min-h-[calc(100vh-4rem)] md:w-64 md:border-b-0 md:border-r">
      <nav className="flex gap-2 overflow-x-auto p-4 md:flex-col">
        {items.map((item) => {
          const Icon = icons[item.icon] || Gauge;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex min-w-fit items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-brand-100 text-brand-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
