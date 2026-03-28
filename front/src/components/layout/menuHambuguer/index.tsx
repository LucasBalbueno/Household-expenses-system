import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { sidebarItems } from '../sidebar/sidebarItems';

export const MenuHamburger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={toggleMenu}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
                aria-label="Menu"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 bg-opacity-50 z-40"
                    onClick={closeMenu}
                />
            )}

            <aside
                className={`lg:hidden fixed top-0 left-0 h-full w-56 bg-primary transform transition-transform duration-300 ease-in-out z-50 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="pl-7 pt-5 pb-8">
                        <h1 className="text-3xl text-light uppercase tracking-widest font-semibold">
                            FinHouse
                        </h1>
                        <p className="text-blue-neutral text-sm">Controle Residencial</p>
                    </div>

                    <nav className="pl-4 flex-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-l-lg transition text-blue-neutral font-medium ${
                                            isActive
                                                ? "bg-white text-primary"
                                                : "hover:bg-dark/50"
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
};