import { useState, useEffect } from 'react';
const useAuthenticate = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

 
//   const setAuth = (boolean) => {
//       setIsAuthenticated(boolean);
//   };
    
    return isAuthenticated;
}

export default useAuthenticate;