import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
// import Home from "./pages/Home.js";
// import Room from "./pages/Room.js";
import ChatRoom from "./pages/chatRoom.jsx";
import Home from "./pages/Home.jsx";
import Chat from './components/chat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      // {
      //   path: "/chat",
      //   element: <Chat/>
      // },

      {
        path: "/room/:roomId",
        element:<ChatRoom />,
      },
    ],
  },
]);

export default router;