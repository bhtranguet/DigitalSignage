import Canvas from "../../components/management/Canvas/Canvas";
import CanvasDetail from "../../components/management/Canvas/CanvasDetail";
import CanvasList from "../../components/management/Canvas/CanvasList";
import Caption from "../../components/management/Caption/Caption";
import CaptionDetail from "../../components/management/Caption/CaptionDetail";
import CaptionList from "../../components/management/Caption/CaptionList";
import Frame from "../../components/management/Frame/Frame";
import FrameDetail from "../../components/management/Frame/FrameDetail";
import FrameList from "../../components/management/Frame/FrameList";
import Management from "../../components/management/Management";
import Media from "../../components/management/Media/Media";
import MediaList from "../../components/management/Media/MediaList";
import Panel from "../../components/management/Panel/Panel";
import PanelDetail from "../../components/management/Panel/PanelDetail";
import PanelList from "../../components/management/Panel/PanelList";
import Screen from "../../components/management/Screen/Screen";
import ScreenDetail from "../../components/management/Screen/ScreenDetail";
import ScreenList from "../../components/management/Screen/ScreenList";
import Presentation from "../../components/presentation/Presentation";
import PresentationLogin from "../../components/presentation/PresentationLogin";
import ScreenShow from "../../components/presentation/ScreenShow";
import Login from "../component/Login";

const routerConfig = [
  {
    path: '/',
    redirect: '/management'
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
        component: Screen,
        children: [
          {
            path: '/management/screen',
            redirect: '/management/screen/list'
          },
          {
            path: '/management/screen/list',
            component: ScreenList
          },
          {
            path: '/management/screen/detail',
            component: ScreenDetail 
          }
        ]
      },
      {
        path: '/management/canvas',
        component: Canvas,
        children: [
          {
            path: '/management/canvas',
            redirect: '/management/canvas/list'
          },
          {
            path: '/management/canvas/list',
            component: CanvasList
          },
          {
            path: '/management/canvas/detail',
            component: CanvasDetail 
          }
        ]
      },
      {
        path: '/management/panel',
        component: Panel,
        children: [
          {
            path: '/management/panel',
            redirect: '/management/panel/list'
          },
          {
            path: '/management/panel/list',
            component: PanelList
          },
          {
            path: '/management/panel/detail',
            component: PanelDetail 
          }
        ]
      },
      {
        path: '/management/frame',
        component: Frame,
        children: [
          {
            path: '/management/frame',
            redirect: '/management/frame/list'
          },
          {
            path: '/management/frame/list',
            component: FrameList
          },
          {
            path: '/management/frame/detail',
            component: FrameDetail 
          }
        ]
      },
      {
        path: '/management/media',
        component: Media,
        children: [
          {
            path: '/management/media',
            redirect: '/management/media/list'
          },
          {
            path: '/management/media/list',
            component: MediaList
          }
        ]
      },
      {
        path: '/management/caption',
        component: Caption,
        children: [
          {
            path: '/management/caption',
            redirect: '/management/caption/list'
          },
          {
            path: '/management/caption/list',
            component: CaptionList
          },
          {
            path: '/management/caption/detail',
            component: CaptionDetail 
          }
        ]
      }
    ]
  },
  {
    path: '/presentation',
    component: Presentation,
    children: [
      {
        path: '/presentation',
        redirect: '/presentation/screen-show'
      },
      {
        path: '/presentation/login',
        component: PresentationLogin
      },
      {
        path: '/presentation/screen-show',
        component: ScreenShow
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

export default routerConfig;