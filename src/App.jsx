import React,{Suspense, lazy} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from './components/Auth/PrivateRoute';


const Home = lazy(()=>import("./pages/Home"));
const Login = lazy(()=>import("./pages/Login"));
const Chat = lazy(()=>import("./pages/Chat"));
const Groups = lazy(()=>import("./pages/Groups"));
const NotFound = lazy(()=>import("./pages/NotFound"));
const LayoutLoaders = lazy(()=>import("./components/Layout/Loaders"));

const AdminLogin = lazy(()=>import("./pages/Admin/AdminLogin"));
const AdminDashboard = lazy(()=>import("./pages/Admin/AdminDashboard"));


const user = true;

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoaders/>}>
          <Routes>
            <Route element={<PrivateRoute user={user} redirect={"/login"}/>} >
              <Route path="/" element={<Home/>} />
              <Route path="/chat/:chatID" element={<Chat/>} />
              <Route path="/groups" element={<Groups/>} />
            </Route>
            <Route path="/login" element={<PrivateRoute user={!user} redirect={"/"}><Login/></PrivateRoute>} />

            <Route path='/admin' element={<AdminLogin/>} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />

            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App