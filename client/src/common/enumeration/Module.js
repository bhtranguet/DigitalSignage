import AuthenService from "../../services/AuthenService";
import PresentationService from "../../services/PresentationService";
import ScreenService from "../../services/ScreenService";
import CanvasService from "../../services/CanvasService";
import PanelService from "../../services/PanelService";
import FrameService from "../../services/FrameService";
import MediaService from "../../services/MediaService";
import CaptionService from "../../services/CaptionService";

const Module = {
  Screen: {
    moduleCode: 'screen',
    moduleText: 'màn hình',
    service: ScreenService
  },
  Canvas: {
    moduleCode: 'canvas',
    moduleText: 'canvas',
    service: CanvasService
  },
  Panel: {
    moduleCode: 'panel',
    moduleText: 'panel',
    service: PanelService
  },
  Frame: {
    moduleCode: 'frame',
    moduleText: 'frame',
    service: FrameService
  },
  Caption: {
    moduleCode: 'caption',
    moduleText: 'caption',
    service: CaptionService
  },
  Media: {
    moduleCode: 'media',
    moduleText: 'Thư viện',
    service: MediaService
  },
  Authen: {
    moduleCode: 'authen',
    service: AuthenService
  },
  Presentation: {
    moduleCode: 'presentation',
    service: PresentationService
  }
}

export default Module;