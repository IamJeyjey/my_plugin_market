const https = require('https');

/**
 * 天气查询 Skill
 * 使用 wttr.in 免费天气 API 查询城市天气信息
 *
 * 使用方法：
 * node index.js "北京"
 * node index.js "Shanghai"
 */

const city = process.argv[2];

if (!city) {
  console.error('错误: 请提供城市名称作为参数');
  console.error('用法: node index.js "<城市名>"');
  process.exit(1);
}

/**
 * 调用 wttr.in API 获取天气数据
 * @param {string} city - 城市名称
 * @returns {Promise<Object>} 天气数据对象
 */
function getWeather(city) {
  return new Promise((resolve, reject) => {
    // wttr.in API 支持 JSON 格式返回
    // format=j1 返回详细的天气数据
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=zh`;

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('解析天气数据失败'));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`网络请求失败: ${error.message}`));
    });
  });
}

/**
 * 格式化天气数据并输出
 * @param {Object} data - wttr.in 返回的原始数据
 */
function formatWeatherOutput(data) {
  const current = data.current_condition[0];
  const location = data.nearest_area[0];

  // 获取城市名称（优先使用中文名称）
  const cityName = location.areaName[0].value;
  const country = location.country[0].value;

  // 天气状况
  const weatherDesc = current.lang_zh[0]?.value || current.weatherDesc[0].value;
  const weatherIcon = getWeatherIcon(current.weatherCode);

  // 温度信息
  const temp = current.temp_C;
  const feelsLike = current.FeelsLikeC;
  const tempUnit = '°C';

  // 湿度信息
  const humidity = current.humidity;

  // 风力风向
  const windDir = current.winddir16Point;
  const windSpeed = current.windspeedKmph;
  const windUnit = 'km/h';

  // 其他信息
  const uvIndex = current.uvIndex;
  const visibility = current.visibility;
  const pressure = current.pressure;

  // 格式化输出
  const output = `
🌍 位置: ${cityName}, ${country}
${weatherIcon} 天气: ${weatherDesc}
🌡️  温度: ${temp}${tempUnit} (体感 ${feelsLike}${tempUnit})
💧 湿度: ${humidity}%
🌬️  风力: ${windSpeed} ${windUnit} ${windDir}
👁️  能见度: ${visibility} km
🔽 气压: ${pressure} hPa
☀️  紫外线指数: ${uvIndex}
`.trim();

  console.log(output);
}

/**
 * 根据天气代码返回对应的 emoji 图标
 * @param {number} code - wttr.in 天气代码
 * @returns {string} emoji 图标
 */
function getWeatherIcon(code) {
  const iconMap = {
    113: '☀️',  // 晴天
    116: '🌤️',  // 部分多云
    119: '☁️',  // 多云
    122: '☁️',  // 阴天
    176: '🌦️',  // 阵雨
    263: '🌧️',  // 小雨
    266: '🌧️',  // 小雨
    281: '🌨️',  // 小雪
    293: '🌧️',  // 阵雨
    296: '🌧️',  // 中雨
    299: '🌧️',  // 中雨
    302: '🌧️',  // 大雨
    305: '⛈️',  // 雷阵雨
    308: '⛈️',  // 雷暴
    311: '🌨️',  // 雨夹雪
    314: '🌨️',  // 雨夹雪
    317: '🌨️',  // 小雪
    320: '🌨️',  // 小雪
    323: '🌨️',  // 雪天
    326: '🌨️',  // 雪天
    329: '❄️',  // 大雪
    332: '❄️',  // 大雪
    335: '❄️',  // 暴雪
    338: '❄️',  // 暴雪
    350: '🌨️',  // 冰雹
    353: '🌦️',  // 小雨
    356: '🌧️',  // 中雨
    359: '🌧️',  // 暴雨
    362: '🌨️',  // 小雪
    365: '🌨️',  // 中雪
    368: '🌨️',  // 大雪
    371: '❄️',  // 暴雪
    374: '🌨️',  // 冰雹
    377: '🌨️',  // 冰雹
    386: '⛈️',  // 雷阵雨
    389: '⛈️',  // 雷暴
    392: '🌨️',  // 雨夹雪
    395: '🌨️',  // 雨夹雪
  };
  return iconMap[code] || '🌡️';
}

// 主执行逻辑
(async () => {
  try {
    console.log(`正在查询 ${city} 的天气信息...`);
    const weatherData = await getWeather(city);
    formatWeatherOutput(weatherData);
  } catch (error) {
    console.error(`❌ 查询失败: ${error.message}`);
    console.error('请检查城市名称是否正确，或稍后重试。');
    process.exit(1);
  }
})();
