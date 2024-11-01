# RTM

## 准备工作

```yaml
flutter: 3.24.4
agora_rtm: 1.5.9
```

首先在[声网](https://console.shengwang.cn/overview)创建项目，获取到 3 个参数`APP ID`，`token`（临时`token`也可以），`id`（如果是一对一就是用户 id，多人模式就是通道 id）

我们可以创建两个`token`，那么就会有两个`userId`，一个`token` 对应一个`userId`，使用其中`token`当发送人，一个当接收人，发送人的 id 为`userId`，接收人的 id 为`peerId`

## 开始

```dart
///rtm.dart
import 'package:agora_rtm/agora_rtm.dart';

class RTMClient {
  AgoraRtmClient? _client;
  String? _userId;
  Function(RtmMessage message, String peerId)? onMessage;

  Function(String message, String peerId)? onMessageError;
  // 初始化RTM客户端
  Future<void> init(String appId) async {
    _client = await AgoraRtmClient.createInstance(appId);

    // 设置回调
    _client?.onMessageReceived = (RtmMessage message, String peerId) {
      onMessage?.call(message, peerId);
    };

    _client?.onConnectionStateChanged2 =
        (RtmConnectionState state, RtmConnectionChangeReason reason) {
      print("连接状态改变: state = $state, reason = $reason");
    };
  }

  // 登录
  Future<void> login(String token, String userId) async {
    await _client?.login(token, userId);
    print('$userId登录成功');
    _userId = userId;
  }

  // 发送点对点消息
  Future<void> sendPeerMessage(String peerId, String message) async {
    try {
      await _client?.sendMessageToPeer2(peerId, RtmMessage.fromText(message));
    } catch (e) {
      onMessageError?.call(message, peerId);
    }
  }

  // 加入频道
  Future<AgoraRtmChannel?> joinChannel(String channelName) async {
    AgoraRtmChannel? channel = await _client?.createChannel(channelName);
    await channel?.join();

    // 设置频道消息回调
    channel?.onMessageReceived = (RtmMessage message, RtmChannelMember member) {
      print("收到频道消息: ${message.text} 从用户: ${member.userId}");
    };

    return channel;
  }

  // 登出
  Future<void> logout() async {
    await _client?.logout();
    _userId = null;
  }
}

```

一对一聊天

```dart
  static const appid = ''; //申请的appid
  static const token = ''; //申请的token
  static const userId = ''; //申请的token时填入的用户id

  late RTMClient rtmClient;

  _initRTM() async {
    rtmClient = RTMClient();
    rtmClient.onMessage = (message, peerId) {
      //此处message.text可以获取到收到的消息，peerId为发送人id
      setState(() {});
    };

    ///消息发送失败执行
    rtmClient.onMessageError = (message, peerId) {};

    await rtmClient.init(appid);

    // 登录
    await rtmClient.login(token, userId);

    //发送消息
    String peerId = '';//发送给谁
    rtmClient.sendPeerMessage(peerId, 'hello world');
  }
```

## 多人聊天

```dart
  static const appid = ''; //申请的appid
  static const token = ''; //申请的token
  static const userId = ''; //申请的token时填入的用户id

  late RTMClient rtmClient;

  _initRTM() async {
    rtmClient = RTMClient();
    rtmClient.onMessage = (message, peerId) {
      //此处message.text可以获取到收到的消息，peerId为发送人id
      setState(() {});
    };

    ///消息发送失败执行
    rtmClient.onMessageError = (message, peerId) {};

    await rtmClient.init(appid);

    // 登录
    await rtmClient.login(token, userId);
     // 加入频道
    final channel = await rtmClient.joinChannel('频道名');

    // 接收消息
    channel?.onMessageReceived = (message, member) {
      print("收到频道消息: ${message.text} 从用户: ${member.userId}");
    };
    // 发送频道消息
    await channel?.sendMessage(AgoraRtmMessage.fromText('大家好!'));
  }
```
