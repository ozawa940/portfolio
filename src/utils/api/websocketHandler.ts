import {Client, StompConfig} from "@stomp/stompjs";

const getWebsocketHandler = (config: StompConfig) => {
  return new Client(config)
}

export default getWebsocketHandler;
