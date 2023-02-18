import {
  definePlugin,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  staticClasses,
  ToggleField
} from "decky-frontend-lib";
import { VFC,useState } from "react";
import { FaShip } from "react-icons/fa";

var ledon=true
var intervalId: any;
const Content: VFC<{ serverAPI: ServerAPI }> = ({serverAPI}) => {
  const [ledOn, setledOn] = useState<boolean>(ledon);
  return (
    <PanelSection title="设置">
      <PanelSectionRow>
        <ToggleField
          label={"开启灯效"}
          checked={ledOn}
          onChange={(value: any) => {
            setledOn(value);
            ledon=value;
            serverAPI!.callPluginMethod("set_ledOn", {"value":value});
          }}
        />
      </PanelSectionRow>
    </PanelSection>
  );
};



export default definePlugin((serverApi: ServerAPI) => {
  SteamClient.System.RegisterForOnSuspendRequest(async () => {
    console.log("准备休眠");
    if(intervalId == null){
      intervalId = setInterval(() => {
        serverApi!.callPluginMethod("set_ledOn", {"value":ledon});
      }, 100);
    }
  });
  SteamClient.System.RegisterForOnResumeFromSuspend(async () => {
    console.log("结束休眠");
    if(intervalId != null){
      clearInterval(intervalId);
    }
    serverApi!.callPluginMethod("set_ledOn", {"value":ledon});
  });
  return {
    title: <div className={staticClasses.Title}>ayaled</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaShip />,
    onDismount() {
      
    },
  };
});
