---
name: check-weather
description: 查询指定城市的天气信息，包括温度、湿度、天气状况和风力风向
disable-model-invocation: false
argument-hint: city: 要查询天气的城市名称（必填，支持中英文城市名，如：北京、Shanghai、Tokyo）
---

请调用以下 Node.js 脚本来查询天气：

```bash
node plugins/weather-plugin/skills/check-weather/index.js "{{city}}"
```

该脚本会返回以下信息：
- 当前天气状况（晴天、多云、阴天、雨天、雪天等）
- 当前温度和体感温度
- 空气湿度
- 风向和风速

如果城市名称无效或查询失败，脚本会返回错误信息。
