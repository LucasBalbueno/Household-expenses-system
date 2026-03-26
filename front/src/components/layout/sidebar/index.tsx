import { NavLink } from "react-router-dom";
import { sidebarItems } from "./sidebarItems";

export const Sidebar = () => {
    return(
        <aside className="bg-primary h-screen w-64 flex flex-col gap-15 pt-5">
            <div className="pl-7">
                <h1 className="text-3xl text-light uppercase tracking-widest font-semibold">FinHouse</h1>
                <p className="text-blue-neutral text-sm">Controle Residencial</p>
            </div>
            <nav className="pl-4">
                {sidebarItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-l-lg transition text-blue-neutral font-medium ${
                            isActive
                                ? "bg-white text-primary"
                                : "hover:bg-gray-800"
                            }`
                        }
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    )
}