import React, { useEffect }from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { veryEmailRoute } from '../../utils/APIRoutes';

function VeryEmail() {

    const location = useLocation();
    const { email, token } = queryString.parse(location.search);
  
    useEffect(() => {
      const confirmEmail = async () => {
        try {
        const response = await axios.get(veryEmailRoute, { params: { email, token } });
  
          const data = await response.json();
          console.log('verify email: ',data);
        } catch (error) {
          console.error(error);
        }
      };
  
      confirmEmail();
    }, []);
  
  return (
    <div>VeryEmail</div>
  )
}

export default VeryEmail