import Cavas from "../../components/management/Canvas/Canvas";
import Management from "../../components/management/Management";
import Screen from "../../components/management/Screen/Screen";
import Presentation from "../../components/presentation/Presentation";
import Login from "../component/Login";

const routerConfig = [
  {
    path: '/',
    redirect: '/presentation'
  },
  {
    path: '/management',
    component: Management,
    children: [
      {
        path: '/management',
        redirect: '/management/screen'
      },
      {
        path: '/management/screen',
        component: Screen
      },
      {
        path: '/management/canvas',
        component: Cavas
      }
    ]
  },
  {
    path: '/presentation',
    component: Presentation
  },
  {
    path: '/login',
    component: Login
  }
]

export default routerConfig;