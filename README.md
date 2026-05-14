# 🎓 应届生求职服务官网生成器Skill

> 一键生成现代科技风校园招聘平台，包含首页、登录注册、岗位列表、Offer 对比、入职清单等完整模块。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/WorkBuddy-Skill-green.svg)](https://www.codebuddy.cn)
[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](https://github.com)

---

## ✨ 功能特色

| 页面 | 核心功能 |
|------|---------|
| 🏠 首页 | Hero 区动态数字、服务卡片、求职时间线、轮播公告 |
| 🔐 登录/注册 | 表单验证、密码强度检测、社交登录入口 |
| 💼 岗位列表 | 多维度筛选（城市/类型/标签）、排序、分页加载 |
| 📋 岗位详情 | 公司信息、职位描述、侧边栏推荐 |
| ⚖️ Offer 对比 | 多维打分算法、智能推荐、对比表格 |
| 📝 入职清单 | 按公司类型分类、进度跟踪、打印导出 |

### 设计亮点

- 🎨 **现代科技风 UI** — 深蓝渐变 + 青蓝强调色 + 玻璃态卡片
- ✨ **丰富动效** — 浮动光球背景、卡片悬浮动效、数字递增动画、滚动入场
- 📱 **全响应式** — 完美适配桌面端、平板、手机
- 🎯 **CSS 变量体系** — 修改 `:root` 变量即可一键换主题
- 🚀 **零依赖** — 纯原生 HTML/CSS/JS，无需构建工具，直接打开即用

---

## 📦 安装使用

### 方式一：作为 WorkBuddy Skill 使用（推荐）

1. 下载本仓库到本地
2. 将 `graduate-job-portal/` 文件夹复制到：
   ```
   C:\Users\你的用户名\.workbuddy\skills\
   ```
3. 重启 WorkBuddy
4. 对话中输入「生成应届生求职网站」，即可一键生成！

### 方式二：直接使用静态文件

1. Clone 本仓库
   ```bash
   git clone https://github.com/你的用户名/graduate-job-portal.git
   ```
2. 打开 `template/` 目录
3. 双击 `index.html` 即可在浏览器中预览
4. 可部署到 GitHub Pages / Vercel / Netlify 免费托管

---

## 📁 项目结构

```
graduate-job-portal/
├── template/                  # 网站模板文件
│   ├── index.html             # 首页
│   ├── login.html             # 登录页
│   ├── register.html          # 注册页
│   ├── jobs.html              # 岗位列表
│   ├── job-detail.html        # 岗位详情
│   ├── offer-compare.html     # Offer 对比
│   ├── onboarding.html        # 入职清单
│   ├── css/
│   │   ├── style.css         # 全局样式 + CSS变量
│   │   ├── index.css         # 首页专用
│   │   ├── auth.css          # 登录注册页
│   │   ├── jobs.css          # 岗位列表页
│   │   ├── job-detail.css    # 岗位详情页
│   │   ├── offer-compare.css # Offer对比页
│   │   └── onboarding.css    # 入职清单页
│   └── js/
│       ├── main.js           # 全局JS（导航、动画）
│       ├── index.js          # 首页逻辑
│       ├── jobs.js           # 岗位列表逻辑
│       ├── offer-compare.js  # Offer对比算法
│       └── onboarding.js     # 入职清单逻辑
├── SKILL.md                  # WorkBuddy Skill 定义文件
└── README.md                 # 本文件
```

---

## 🎨 主题定制

所有颜色、圆角、阴影均通过 CSS 变量集中管理，在 `css/style.css` 的 `:root` 中修改即可全局生效：

```css
:root {
    --primary: #4f6ef7;           /* 主色调（科技蓝）*/
    --accent: #00d4ff;            /* 强调色（青蓝）*/
    --accent-secondary: #a855f7;  /* 辅助色（紫色）*/
    --bg-primary: #0a0e27;        /* 主背景 */
    --bg-card: rgba(20,30,80,0.65); /* 卡片背景 */
    --radius-md: 16px;            /* 卡片圆角 */
}
```

---

## 🖥️ 本地预览

无需任何服务器，直接用浏览器打开 `template/index.html` 即可：

```bash
# Windows
start template\index.html

# macOS / Linux
open template/index.html
```

如需本地服务器（可选）：

```bash
# 使用 Python
cd template && python -m http.server 8080

# 使用 Node.js
npx serve template
```

然后访问 `http://localhost:8080`

---


## 🛠️ 技术栈

- **HTML5** — 语义化标签
- **CSS3** — CSS 变量、Flexbox、Grid、动画、`backdrop-filter` 玻璃态
- **JavaScript (ES6+)** — 原生 JS，无框架依赖
- **Google Fonts** — 引入 `Noto Sans SC` 中文字体

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

---

## 📄 License

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- [WorkBuddy](https://www.codebuddy.cn) — 提供 Skill 生态支持
- [Google Fonts](https://fonts.google.com/) — 提供 Noto Sans SC 字体

---

## 📮 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [GitHub Issue](https://github.com/你的用户名/graduate-job-portal/issues)
- WorkBuddy Skill 市场搜索「应届生求职网站」

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给它一个 Star！⭐**

Made with ❤️ by WorkBuddy User

</div>
