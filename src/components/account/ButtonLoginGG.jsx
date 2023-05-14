import React from 'react'

function ButtonLoginGG({ onSuccess, onFailure }) {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  return (
    <GoogleLogin
    clientId={CLIENT_ID}
    buttonText="Sign in with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    redirectUri={`${import.meta.env.VITE_BACKEND_HOST}/auth/google`}
  />
  )
}

export default ButtonLoginGG