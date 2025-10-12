# Flutter

## 防止键盘遮挡

```dart
Scaffold(
    resizeToAvoidBottomInset: true,
),
```

## AbsorbPointer 和 IgnorePointer

`AbsorbPointer` 和 `IgnorePointer` 都是阻止点击事件，主要区别在于，`AbsorbPointer`事件，消耗掉事件，但是会阻止事件传递到子树
而`IgnorePointer`不行，自身和子树都会忽略事件，下层的控件可以接收到（不是子树，就是视觉层级的上下）

## 监听应用生命周期和系统事件 WidgetsBindingObserver

```dart
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  // 应用状态
  String _status = "App is running";

  @override
  void initState() {
    super.initState();
    // 添加观察者
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    // 移除观察者
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // 监听应用生命周期状态变化
    if (state == AppLifecycleState.paused) {
      setState(() {
        _status = "App is paused";
      });
    } else if (state == AppLifecycleState.resumed) {
      setState(() {
        _status = "App is resumed";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('WidgetsBindingObserver Example')),
        body: Center(
          child: Text(_status),
        ),
      ),
    );
  }
}
```

## 基于数据流的订阅管理 StreamBuild

```dart{11,16,21,28,38-43}
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late StreamController _streamController;

  @override
  void initState() {
    super.initState();
    _streamController = StreamController.broadcast();
  }

  @override
  void dispose() {
    _streamController.close();
    super.dispose();
  }

  int _counter = 0;

  void _increment() {
    _streamController.sink.add(_counter++); //通过该方法来通知StreamBuilder更新
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("StreamBuilder"),
      ),
      body: StreamBuilder(
        stream: _streamController.stream,
        initialData: _counter,
        builder: (context, snapshot) {
          return Text("当前计数：${snapshot.data}");
        },
      ),
      floatingActionButton: Column(
        children: [
          FloatingActionButton(onPressed: _increment),
        ],
      ),
    );
  }
}
```

## 数据跨节点共享 InheritedWidget

::: details 使用方法

-   `Abc` 继承 `InheritedWidget`，将公共的数据放在其中，也可以传递修改方法，通过子组件来更新数据集，也可以直接父组件来修改

-   提供 `of` 静态方法，通过上下文寻找上层的 `InheritedCounter` 并建立依赖关系

-   重写 `updateShouldNotify` 方法确定更新通知的条件。

:::

```dart{55-62}
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++;
    });
  }

  void updateCounter(int num) {
    setState(() {
      _counter += num;
    });
  }

  Map<String, dynamic> initialValue = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('InheritedWidget'),
      ),
      body: Abc(
        count: _counter,
        updateCounter: updateCounter,
        child: const CountText(),
      ),
      floatingActionButton: Column(
        children: [
          FloatingActionButton(onPressed: _increment), // 此处通过父组件修改数据集
        ],
      ),
    );
  }
}

class Abc extends InheritedWidget {
  final int count;
  final ValueChanged<int> updateCounter;
  const Abc({
    super.key,
    required super.child,
    required this.count,
    required this.updateCounter,
  });

  @override
  bool updateShouldNotify(Abc oldWidget) {
    return count != oldWidget.count;
  }

  static Abc? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<Abc>();
  }
}

class CountText extends StatelessWidget {
  const CountText({super.key});

  @override
  Widget build(BuildContext context) {
    final abc = Abc.of(context);
    return Column(
      children: [
        Text("当前计数：${abc?.count}"),
        ElevatedButton(
            onPressed: () {
              abc?.updateCounter(10); //此处可以通过子组件来修改数据集
            },
            child: const Text('+10'))
      ],
    );
  }
}
```

## Provider

数据发生变更都要调用 `notifyListeners` 来进行通知，取值通过 `Provider.of`获取

```dart{8}
class CounterModel extends ChangeNotifier {
  int _count = 0;

  int get count => _count;

  void increment() {
    _count++;
    notifyListeners(); // 状态改变时通知监听器
  }

  void decrement() {
    _count--;
    notifyListeners();
  }
}


void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: const MyHomePage());
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<CounterModel>(context);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text('Provider'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[Text('${provider.count}')],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: provider.increment,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 并发 Isolate

`SendPort` 和 `ReceivePort` 来进行消息传递

### 通信

```dart
void main(){
  ReceivePort receivePort = ReceivePort();
  Isolate.spawn(entryPoint, receivePort.sendPort);
  receivePort.listen((message) {
    print(message);
  });
}

// 耗时操作都在这个函数里面，运算完成后将数据通过`sendPort`返回给主进程
void entryPoint(SendPort sendPort){
  // 模拟耗时操作
  Future.delayed(Duration(seconds: 2),(){
    sendPort.send("子isolate里面给你发的消息");
  });
}
```

### 双向通信

```dart
void main(){
  ReceivePort receivePort = ReceivePort();
  Isolate.spawn(entryPoint, receivePort.sendPort);
  receivePort.listen((message) {
    if(message is SendPort){
      print("main接收到子isolate的发送器了");
      Future.delayed(Duration(seconds: 1),(){
        message.send("main给子isolate发送的消息");
      });
    }else{
      print("接收到子isolate的消息了：$message");
    }
  });
}

void entryPoint(SendPort sendPort){
  ReceivePort receivePort = ReceivePort();
  receivePort.listen((message) {
    print("子isolate接收到main的消息了：$message");
  });
  sendPort.send(receivePort.sendPort);
  // 模拟耗时操作
  Future.delayed(Duration(seconds: 2),(){
    sendPort.send("子isolate里面给main发的消息");
  });
}
```
