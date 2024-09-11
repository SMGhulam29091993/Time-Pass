import {Suspense, lazy, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from './components/Auth/PrivateRoute';
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, userNotExists } from './redux/reducers/auth';
import { Toaster } from "react-hot-toast";



const Home = lazy(()=>import("./pages/Home"));
const Login = lazy(()=>import("./pages/Login"));
const Chat = lazy(()=>import("./pages/Chat"));
const Groups = lazy(()=>import("./pages/Groups"));
const NotFound = lazy(()=>import("./pages/NotFound"));
const LayoutLoaders = lazy(()=>import("./components/Layout/Loaders"));

const AdminLogin = lazy(()=>import("./pages/Admin/AdminLogin"));
const AdminDashboard = lazy(()=>import("./pages/Admin/AdminDashboard"));
const UserManagement = lazy(()=>import("./pages/Admin/UserManagement"));
const ChatManagement = lazy(()=>import("./pages/Admin/ChatManagement"));
const MessageManagement = lazy(()=>import("./pages/Admin/MessageManagement"));
const VerificationPage = lazy(()=>import("./pages/VerificationPage"));


// const user = true;

const App = () => {

  const {user, loader} = useSelector(authSelector);
  console.log(`User in from auth : ${user}`)
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const response = await axios.get(`${server}/user/getProfile/${_id}`);
        console.log(response);
      } catch (error) {
        dispatch(userNotExists())
      }
      
    } 
    fetchUser();
  },[])

  return loader?(<LayoutLoaders/>) : (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoaders/>}>
          <Routes>
            <Route element={<PrivateRoute user={user} redirect={"/login"} />} >
              <Route path="/" element={<Home/>} />
              <Route path="/chat/:chatID" element={<Chat/>} />
              <Route path="/groups" element={<Groups/>} />
            </Route>
            <Route path="/verification-page/:userID" element={<PrivateRoute user={!user} redirect={"/"}>
                                                                        <VerificationPage />
                                                                  </PrivateRoute>} />
            <Route path="/login" element={<PrivateRoute user={!user} redirect={"/"}><Login/></PrivateRoute>} />

            <Route path='/admin' element={<AdminLogin/>} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/users-management' element={<UserManagement />} />
            <Route path='/admin/chats-management' element={<ChatManagement />} />
            <Route path='/admin/messages' element={<MessageManagement />} />

            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Suspense>
        <Toaster position='bottom-center' />
      </BrowserRouter>
    </>
  )
}

export default App