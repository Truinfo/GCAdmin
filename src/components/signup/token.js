import React, { useState, useEffect } from 'react';

const Token = () => {
  const [logoutTimer, setLogoutTimer] = useState(null);

  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  const handleUserActivity = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    setLogoutTimer(setTimeout(logoutUser, 600000)); // 10 minutes (600,000 milliseconds)
  };

  const logoutUser = () => {
    // Perform your logout logic here
    // For example, redirect to the login page or dispatch a logout action

    // Clear local storage on logout
    localStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('mousemove', handleUserActivity);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('mousemove', handleUserActivity);

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [logoutTimer]);

  return (
    <div>
      {/* Your route component content */}
    </div>
  );
};

export default Token;
