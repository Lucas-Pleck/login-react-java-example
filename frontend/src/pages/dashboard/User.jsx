import { useEffect, useState } from 'react';
import AllowAccess from '../../components/AllowAccess';
import ForbiddenAccess from '../../components/ForbiddenAccess';

const User = () => {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const result = await fetch('http://localhost:8443/api/test/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (result.status == 200) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    };
    checkUser();
  }, []);
  return (
    <div>{isUser ? <AllowAccess type="user" /> : <ForbiddenAccess type="user" />}</div>
  );
};

export default User;
