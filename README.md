# My Plugins

Claude Code 插件集合，提供天气查询和代码审查功能。

## 插件列表

### weather-plugin

查询指定城市的当前天气信息。

**功能**：
- 当前天气状况（晴天、多云、阴天、雨天、雪天等）
- 当前温度和体感温度
- 空气湿度
- 风向和风速
- 能见度、气压、紫外线指数

**使用方法**：
```
/weather-plugin:check-weather <城市名>
```

**示例**：
```
/weather-plugin:check-weather 上海
/weather-plugin:check-weather Tokyo
```

---

### quality-review-plugin

对代码进行快速审查，发现潜在问题。

**审查内容**：
- 潜在 bug 和边界情况
- 安全问题
- 性能问题
- 可读性改进建议

**使用方法**：
```
/quality-review-plugin:quality-review
```

**提示**：先在编辑器中选中要审查的代码，再执行命令。

## 安装

1. 将项目克隆到本地：
```bash
git clone <repository-url>
```

2. 在 Claude Code 设置中添加插件市场路径：
```
settings.json:
{
  "pluginMarketplaces": ["path/to/my-marketplace"]
}
```

3. 重启 Claude Code，插件将自动加载。

## 作者

Jeyjey

## 许可

MIT
