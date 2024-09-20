
import React from 'react';
import Link from 'next/link';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const router = useRouter();

  const handleLinkClick = (e) => {
    if (!loggedIn && !checkingStatus) {
      e.preventDefault();
      router.push('/Login'); 
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-title">Welcome to Span Meals Admin</h1>
      <p className="welcome-message">Manage your meal orders and preferences efficiently.</p>
      <Link href="/dashboard" className="dashboard-link" onClick={handleLinkClick}>
        Go to Placed Orders
      </Link>
    </div>
  );
};

export default Dashboard;
