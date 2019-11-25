import { StompConfig, StompService } from '@stomp/ng2-stompjs';

export class WebSocketConfig {
  public static uri = 'ws://localhost:8080/notifications';
  public static topic = '/user/queue/reply';
}
export const stompConfig: StompConfig = {
  url: WebSocketConfig.uri,
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: false
};
