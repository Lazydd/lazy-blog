# MQTT

## 本地启动一个 MQTT 服务

```bash
npm install aedes mqtt
```

```js
//index.js
const aedes = require('aedes')();
const mqttServer = require('net').createServer(aedes.handle);
const port = 1883;

mqttServer.listen(port, function () {
	console.log('mqtt server started and listening on port ', port);
});

// 身份验证
aedes.authenticate = function (_client, username, password, callback) {
	// with no error, successful be true
	// callback(error, successful)
	callback(null, username === 'user' && password.toString() === '123456');
};

// 客户端连接
aedes.on('client', function (client) {
	console.log(
		'Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m',
		'to broker',
		aedes.id
	);
});

// 客户端断开
aedes.on('clientDisconnect', function (client) {
	console.log(
		'Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m',
		'to broker',
		aedes.id
	);
});
```

```js
//pub.js
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://10.100.23.159:1883', {
	username: 'user',
	password: '123456',
});

client.on('connect', function () {
	console.log('服务器连接成功');
	console.log(client.options.clientId);
	client.subscribe('text', { qos: 1 }); // 订阅text消息
	client.publish('text', JSON.stringify({ id: 1 }), { qos: 0, retain: true }); // 发布主题text消息
});

client.on('message', function (top, message) {
	console.log('pub收到主题', top);
	console.log(message.toString());
});

client.on('error', function (error) {
	console.log(error);
});

client.on('disconnect', function (packet) {
	console.log(packet);
});
```

```js
//sub.js
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://10.100.23.159:1883', {
	username: 'user',
	password: '123456',
});

client.on('connect', function () {
	console.log('服务器连接成功');
	console.log(client.options.clientId);
	client.subscribe('text', { qos: 1 }); // 订阅text消息
});

client.on('message', function (top, message) {
	console.log('sub收到主题', top);
	console.log(message.toString('utf8'));
});

client.on('error', function (error) {
	console.log(error);
});

client.on('disconnect', function (packet) {
	console.log('连接断开');
});
```

:::tip 最后依次执行

-   启动服务`node index.js`

-   对消息进行发布`node pub.js`

-   对消息进行订阅`node sub.js`

:::
