import React from 'react';
import { Moon, Sun } from 'react-feather';
import { useDarkMode } from '../context/Dark';
import { useLocation, Link } from 'react-router-dom';

const Header: React.FC = () => {
    const {isDarkMode, toggleMode} = useDarkMode();
    const location = useLocation();

    const activeClass = 'bg-primary text-text-dark';
    const inactiveClass = 'bg-white dark:bg-dark-lighter';

    const routes = [
        {path: '/', title: 'Editor'},
        {path: '/templates', title: 'Templates'},
    ];

    const getClass = (index: number, desiredPath: string) => {
        let cl = "px-6 py-2 rounded ";

        if (index === 0)
            cl += "rounded-tr-none rounded-br-none ";
        else
            cl += "rounded-tl-none rounded-bl-none ";

        if (location.pathname === desiredPath)
            cl += activeClass;
        else
            cl += inactiveClass;

        return cl;
    }

    return (
        <header className="flex justify-between mb-12">
            <h1 className='text-3xl font-bold'>Markdown Generator</h1>
            <div className="flex items-center">
              <div className="mr-8 group">
                {routes.map((route, index) => (
                    <Link key={index} to={route.path} className={getClass(index, route.path)}>
                        {route.title}
                    </Link>
                ))}
              </div>
              <button className="p-2 px-3 bg-white rounded dark:bg-primary" onClick={toggleMode}>
                {isDarkMode ? <Sun width="1rem" /> : <Moon width="1rem" />}
              </button>
            </div>
          </header>
    );
}

export default Header;