import React, { useState } from 'react';
import AdminLoginPage from './components/AdminLoginPage';
import AdminLayout from './components/AdminLayout';

function AdminApp() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [adminRole, setAdminRole] = useState<string | null>(null);

    const handleLoginSuccess = (role: string) => {
        setAdminRole(role);
        setIsAdminLoggedIn(true);
    };

    const handleLogout = () => {
        setAdminRole(null);
        setIsAdminLoggedIn(false);
    };

    if (!isAdminLoggedIn) {
        return (
             <div className="w-full max-w-md mx-auto px-4">
                <AdminLoginPage onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }

    return <AdminLayout role={adminRole!} onLogout={handleLogout} />;
}

export default AdminApp;