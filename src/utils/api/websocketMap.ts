import GlobalConfig from "../../config"
import {Client, StompConfig} from "@stomp/stompjs";
import getWebsocketHandler from "./websocketHandler";

const getConfig = (onConnectCallback: () => void): StompConfig => {
  return {
    brokerURL: GlobalConfig.websocketBaseUrl + "/ws",
    onConnect: onConnectCallback
  }
}


const websocketMap = {
  connectWebsocket: (callback: () => void) => {
    return getWebsocketHandler(getConfig(callback))
  },
  updateConfig: (client: Client ,callback: () => void) => {
    return client.configure(getConfig(callback))
  }
}

export default websocketMap;
