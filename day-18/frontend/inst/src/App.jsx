import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import "./Features/Shared/Global.scss"
import { AuthProvider } from './Features/Auth/Auth.context'
import { PostProvider } from './Features/Post/post.context'


const App = () => {
  return (
    <div>
      <AuthProvider>
        <PostProvider>
      <AppRoutes/>
        </PostProvider>
        
      </AuthProvider>
    </div>
  )
}

export default App