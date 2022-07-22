let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  // 4000端口为测试服务器，但功能较全
  // BASE_URL = "http://152.136.185.210:4000";
  BASE_URL = "/api";
} else {
  BASE_URL = "http://coderwhy.org/test";
}

export { BASE_URL, TIME_OUT };
