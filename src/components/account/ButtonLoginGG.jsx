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
    redirectUri={'http://localhost:8888/auth/google'}
  />
  )
}

export default ButtonLoginGG