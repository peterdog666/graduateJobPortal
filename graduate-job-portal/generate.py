#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Graduate Job Portal - 应届生求职服务官网 一键生成器
使用：python3 generate.py [输出目录]
默认输出到当前目录下的 graduate-job-portal/
"""

import os, sys, textwrap

def mkdirs(path):
    os.makedirs(path, exist_ok=True)

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  ✓ {path}')

def generate(output_dir):
    base = os.path.join(output_dir, 'graduate-job-portal')
    mkdirs(os.path.join(base, 'css'))
    mkdirs(os.path.join(base, 'js'))

    # ===================== style.css =====================
    style_css = """\
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
               'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  background: #0a0e27; color: #f0f2ff; line-height: 1.6;
  min-height: 100vh; overflow-x: hidden;
}
a { color: #00d4ff; text-decoration: none; transition: color 0.2s ease; }
a:hover { color: #7b93fa; }
img { max-width: 100%; display: block; }
ul, ol { list-style: none; }
button { cursor: pointer; font-family: inherit; }

:root {
  --primary: #4f6ef7; --primary-dark: #3b5de7; --primary-light: #7b93fa;
  --accent: #00d4ff; --accent-secondary: #a855f7;
  --bg-primary: #0a0e27; --bg-secondary: #111640;
  --bg-card: rgba(20, 30, 80, 0.65); --bg-glass: rgba(255,255,255,0.05);
  --text-primary: #f0f2ff; --text-secondary: #a0a8d0; --text-muted: #6b7394;
  --success: #22c55e; --warning: #f59e0b; --danger: #ef4444; --info: #3b82f6;
  --radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px; --radius-full: 9999px;
  --shadow-card: 0 8px 32px rgba(0,0,0,0.3); --shadow-glow: 0 0 30px rgba(79,110,247,0.3);
  --space-xs:4px; --space-sm:8px; --space-md:16px;
  --space-lg:24px; --space-xl:32px; --space-2xl:48px; --space-3xl:64px;
  --transition-fast: 0.2s ease; --transition-base: 0.3s ease; --transition-slow: 0.5s ease;
}

/* 背景动画 */
.bg-animation { position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1; overflow: hidden; pointer-events: none; }
.bg-animation .orb { position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.4; animation: float 20s ease-in-out infinite; }
.bg-animation .orb:nth-child(1) { width:600px;height:600px;background:var(--primary);top:-200px;left:-100px;animation-delay:0s; }
.bg-animation .orb:nth-child(2) { width:500px;height:500px;background:var(--accent-secondary);bottom:-150px;right:-100px;animation-delay:-7s; }
.bg-animation .orb:nth-child(3) { width:400px;height:400px;background:var(--accent);top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:-14s;opacity:0.2; }
@keyframes float { 0%,100%{transform:translate(0,0) scale(1);} 25%{transform:translate(60px,-40px) scale(1.1);} 50%{transform:translate(-30px,60px) scale(0.95);} 75%{transform:translate(-60px,-30px) scale(1.05);} }

/* 导航栏 */
.navbar { position: fixed; top:0;left:0;right:0;z-index:1000;
  padding: var(--space-md) var(--space-xl); display:flex; align-items:center;
  justify-content:space-between; background:rgba(10,14,39,0.85);
  backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(79,110,247,0.15); transition:background 0.3s ease; }
.navbar.scrolled { background:rgba(10,14,39,0.95); box-shadow:0 4px 30px rgba(0,0,0,0.3); }
.nav-brand { display:flex;align-items:center;gap:var(--space-sm);font-size:1.25rem;font-weight:700;color:var(--text-primary); }
.nav-brand .logo { width:36px;height:36px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.1rem; }
.nav-links { display:flex;align-items:center;gap:var(--space-lg); }
.nav-links a { color:var(--text-secondary);font-size:0.95rem;font-weight:500;padding:var(--space-xs) var(--space-sm);border-radius:var(--radius-sm);transition:all var(--transition-fast);position:relative; }
.nav-links a:hover, .nav-links a.active { color:var(--text-primary); }
.nav-links a.active::after { content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:20px;height:3px;background:var(--accent);border-radius:2px; }
.nav-actions { display:flex;align-items:center;gap:var(--space-md); }
.btn { display:inline-flex;align-items:center;justify-content:center;gap:var(--space-sm);padding:10px 24px;border:none;border-radius:var(--radius-full);font-size:0.95rem;font-weight:600;cursor:pointer;transition:all var(--transition-base);position:relative;overflow:hidden; }
.btn-primary { background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff;box-shadow:0 4px 20px rgba(79,110,247,0.4); }
.btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 30px rgba(79,110,247,0.6); }
.btn-outline { background:transparent;color:var(--text-primary);border:1.5px solid rgba(255,255,255,0.2); }
.btn-outline:hover { border-color:var(--primary);background:rgba(79,110,247,0.1); }
.btn-ghost { background:transparent;color:var(--text-secondary);padding:10px 16px; }
.btn-ghost:hover { color:var(--text-primary);background:var(--bg-glass); }
.btn-lg { padding:14px 36px;font-size:1.1rem; }
.btn-sm { padding:6px 16px;font-size:0.85rem; }

/* 卡片 */
.card { background:var(--bg-card);border:1px solid rgba(79,110,247,0.15);border-radius:var(--radius-md);padding:var(--space-xl);backdrop-filter:blur(10px);transition:all var(--transition-base);position:relative;overflow:hidden; }
.card::before { content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,var(--primary),var(--accent),var(--accent-secondary));opacity:0;transition:opacity var(--transition-base); }
.card:hover { transform:translateY(-4px);border-color:rgba(79,110,247,0.3);box-shadow:var(--shadow-glow); }
.card:hover::before { opacity:1; }

/* 通用布局 */
.container { max-width:1200px;margin:0 auto;padding:0 var(--space-xl); }
.section { padding:var(--space-3xl) 0; }
.section-header { text-align:center;margin-bottom:var(--space-2xl); }
.section-tag { display:inline-block;padding:4px 16px;background:rgba(79,110,247,0.15);border:1px solid rgba(79,110,247,0.3);border-radius:var(--radius-full);font-size:0.85rem;color:var(--accent);margin-bottom:var(--space-md);letter-spacing:1px;text-transform:uppercase; }
.section-title { font-size:2.5rem;font-weight:800;margin-bottom:var(--space-md);background:linear-gradient(135deg,var(--text-primary),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.section-subtitle { font-size:1.1rem;color:var(--text-secondary);max-width:600px;margin:0 auto; }

/* 表单 */
.form-group { margin-bottom:var(--space-lg); }
.form-label { display:block;font-size:0.9rem;font-weight:600;color:var(--text-secondary);margin-bottom:var(--space-sm); }
.form-input { width:100%;padding:12px 18px;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.1);border-radius:var(--radius-sm);color:var(--text-primary);font-size:1rem;outline:none;transition:all var(--transition-fast); }
.form-input:focus { border-color:var(--primary);box-shadow:0 0 0 3px rgba(79,110,247,0.15);background:rgba(255,255,255,0.08); }
.form-input::placeholder { color:var(--text-muted); }

/* 页脚 */
.footer { background:rgba(0,0,0,0.3);border-top:1px solid rgba(79,110,247,0.1);padding:var(--space-3xl) 0 var(--space-xl);margin-top:var(--space-3xl); }
.footer-grid { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:var(--space-2xl);margin-bottom:var(--space-2xl); }
.footer-col h4 { font-size:1rem;font-weight:700;margin-bottom:var(--space-lg);color:var(--text-primary); }
.footer-col a { display:block;color:var(--text-muted);font-size:0.9rem;padding:var(--space-xs) 0;transition:color var(--transition-fast); }
.footer-col a:hover { color:var(--accent); }
.footer-bottom { border-top:1px solid rgba(255,255,255,0.05);padding-top:var(--space-xl);display:flex;justify-content:space-between;align-items:center;color:var(--text-muted);font-size:0.85rem; }

/* 工具类 */
.text-center { text-align:center; }
.text-gradient { background:linear-gradient(135deg,var(--primary),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.fade-in-up { animation:fadeInUp 0.6s ease forwards;opacity:0; }
@keyframes fadeInUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
.delay-1{animation-delay:0.1s;} .delay-2{animation-delay:0.2s;}
.delay-3{animation-delay:0.3s;} .delay-4{animation-delay:0.4s;}
.delay-5{animation-delay:0.5s;}

/* 移动端菜单按钮 */
.mobile-menu-btn { display:none;flex-direction:column;gap:5px;background:none;border:none;padding:var(--space-sm);cursor:pointer; }
.mobile-menu-btn span { display:block;width:24px;height:2px;background:var(--text-primary);border-radius:2px;transition:all var(--transition-fast); }

/* 响应式 */
@media (max-width:1024px) { .footer-grid { grid-template-columns:1fr 1fr; } }
@media (max-width:768px) {
  :root { font-size:15px; } .navbar { padding:var(--space-sm) var(--space-md); }
  .nav-links { display:none; }
  .nav-links.mobile-open { display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(10,14,39,0.98);backdrop-filter:blur(20px);padding:var(--space-lg);gap:var(--space-md);border-bottom:1px solid rgba(79,110,247,0.15); }
  .section-title { font-size:2rem; } .footer-grid { grid-template-columns:1fr; }
  .footer-bottom { flex-direction:column;gap:var(--space-md);text-align:center; }
  .mobile-menu-btn { display:flex !important; }
}
"""
    write(os.path.join(base, 'css', 'style.css'), style_css)

    # ===================== index.css =====================
    index_css = """\
.hero { min-height:100vh;display:flex;align-items:center;padding-top:80px;position:relative;overflow:hidden; }
.hero-content { display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3xl);align-items:center;padding-top:var(--space-3xl); }
.hero-title { font-size:3.5rem;font-weight:900;line-height:1.15;margin-bottom:var(--space-lg);letter-spacing:-0.02em; }
.hero-subtitle { font-size:1.2rem;color:var(--text-secondary);line-height:1.8;margin-bottom:var(--space-2xl); }
.hero-actions { display:flex;gap:var(--space-md);margin-bottom:var(--space-2xl);flex-wrap:wrap; }
.hero-stats { display:flex;align-items:center;gap:var(--space-xl); }
.stat-item { text-align:center; }
.stat-num { display:block;font-size:2rem;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--primary-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.stat-label { font-size:0.85rem;color:var(--text-muted); }
.stat-divider { width:1px;height:40px;background:rgba(255,255,255,0.1); }
.hero-visual { position:relative;height:400px; }
.hero-card { position:absolute;background:var(--bg-card);border:1px solid rgba(79,110,247,0.2);border-radius:var(--radius-md);padding:var(--space-lg);backdrop-filter:blur(10px);display:flex;align-items:center;gap:var(--space-md);animation:cardFloat 6s ease-in-out infinite;box-shadow:var(--shadow-card); }
.hero-card-1 { top:20px;left:20px;animation-delay:0s; }
.hero-card-2 { top:150px;right:20px;animation-delay:-2s; }
.hero-card-3 { bottom:40px;left:60px;animation-delay:-4s;width:70%; }
@keyframes cardFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
.hc-icon { width:48px;height:48px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#fff;flex-shrink:0; }
.hc-icon.purple { background:linear-gradient(135deg,var(--accent-secondary),var(--primary)); }
.hc-info { flex:1; } .hc-title { font-weight:700;font-size:0.95rem;margin-bottom:2px; }
.hc-desc { font-size:0.8rem;color:var(--text-muted); }
.hc-badge.success { width:28px;height:28px;background:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.8rem; }
.hc-arrow { color:var(--accent);font-size:1.2rem; }
.hc-progress { width:100%;height:8px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;margin-bottom:var(--space-sm); }
.hc-progress-bar { height:100%;background:linear-gradient(90deg,var(--primary),var(--accent));border-radius:4px;transition:width 1.5s ease; }
.hc-progress-text { font-size:0.85rem;color:var(--text-secondary); }

/* 轮播 */
.carousel-section { padding-top:0; }
.carousel-wrapper { background:var(--bg-card);border:1px solid rgba(79,110,247,0.15);border-radius:var(--radius-md);padding:var(--space-lg) var(--space-xl);backdrop-filter:blur(10px); }
.carousel-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-md); }
.carousel-tag { display:inline-flex;align-items:center;gap:var(--space-sm);color:var(--accent);font-weight:600;font-size:0.9rem; }
.carousel-dots { display:flex;gap:8px; }
.carousel-dot { width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.2);cursor:pointer;transition:all var(--transition-fast); }
.carousel-dot.active { background:var(--accent);width:24px;border-radius:4px; }
.carousel-track { position:relative;height:60px;overflow:hidden; }
.carousel-item { position:absolute;top:0;left:0;width:100%;display:flex;align-items:center;gap:var(--space-lg);padding:var(--space-sm) 0;opacity:0;transform:translateX(30px);transition:all 0.5s ease;pointer-events:none; }
.carousel-item.active { opacity:1;transform:translateX(0);pointer-events:auto; }
.ci-badge { flex-shrink:0;padding:4px 12px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:700; }
.ci-badge.hot { background:rgba(239,68,68,0.15);color:var(--danger); }
.ci-badge.new { background:rgba(34,197,94,0.15);color:var(--success); }
.ci-badge.info { background:rgba(59,130,246,0.15);color:var(--info); }
.ci-text { flex:1;font-size:0.95rem;color:var(--text-primary); }
.ci-link { flex-shrink:0;color:var(--accent);font-size:0.85rem;font-weight:600; }

/* 服务卡片 */
.services-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-xl); }
.service-card { background:var(--bg-card);border:1px solid rgba(79,110,247,0.12);border-radius:var(--radius-md);padding:var(--space-2xl);backdrop-filter:blur(10px);transition:all var(--transition-base);position:relative;overflow:hidden; }
.service-card::before { content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,var(--primary),var(--accent));opacity:0;transition:opacity var(--transition-base); }
.service-card:hover { transform:translateY(-6px);border-color:rgba(79,110,247,0.3);box-shadow:var(--shadow-glow); }
.service-card:hover::before { opacity:1; }
.sc-icon { width:56px;height:56px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.4rem;color:#fff;margin-bottom:var(--space-lg); }
.sc-icon.blue { background:linear-gradient(135deg,#4f6ef7,#7b93fa); } .sc-icon.cyan { background:linear-gradient(135deg,#00d4ff,#4f6ef7); } .sc-icon.purple { background:linear-gradient(135deg,#a855f7,#7b93fa); } .sc-icon.green { background:linear-gradient(135deg,#22c55e,#4f6ef7); } .sc-icon.orange { background:linear-gradient(135deg,#f59e0b,#ef4444); } .sc-icon.pink { background:linear-gradient(135deg,#ec4899,#a855f7); }
.service-card h3 { font-size:1.25rem;font-weight:700;margin-bottom:var(--space-sm); }
.service-card p { font-size:0.95rem;color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-lg); }
.sc-link { display:inline-flex;align-items:center;gap:var(--space-sm);color:var(--accent);font-weight:600;font-size:0.9rem;transition:gap var(--transition-fast); }
.sc-link:hover { gap:var(--space-md); }

/* 时间线 */
.timeline { position:relative;max-width:800px;margin:0 auto;padding:var(--space-xl) 0; }
.timeline-line { position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--primary),var(--accent),var(--accent-secondary));transform:translateX(-50%); }
.timeline-item { position:relative;width:50%;padding:var(--space-md) var(--space-2xl);margin-bottom:var(--space-xl); }
.timeline-item.left { text-align:right;padding-right:60px; } .timeline-item.right { margin-left:50%;padding-left:60px; }
.timeline-dot { position:absolute;top:20px;width:16px;height:16px;background:var(--primary);border-radius:50%;border:3px solid var(--bg-primary);z-index:1; }
.timeline-item.left .timeline-dot { right:-8px; } .timeline-item.right .timeline-dot { left:-8px; }
.timeline-card { padding:var(--space-lg);text-align:left; }
.timeline-date { display:inline-block;padding:2px 12px;background:rgba(79,110,247,0.15);border-radius:var(--radius-full);font-size:0.8rem;color:var(--accent);font-weight:600;margin-bottom:var(--space-sm); }
.timeline-card h4 { font-size:1.1rem;margin-bottom:var(--space-sm); }
.timeline-card p { font-size:0.9rem;color:var(--text-secondary);line-height:1.7; }

/* CTA */
.cta-section { padding-top:0; }
.cta-card { position:relative;overflow:hidden;text-align:center;padding:var(--space-3xl) var(--space-xl); }
.cta-content { position:relative;z-index:1; } .cta-card h2 { font-size:2rem;font-weight:800;margin-bottom:var(--space-md); }
.cta-card p { font-size:1.1rem;color:var(--text-secondary);margin-bottom:var(--space-2xl); }
.cta-actions { display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap; }
.cta-circle { position:absolute;border-radius:50%;filter:blur(60px);opacity:0.3; }
.cta-circle.c1 { width:300px;height:300px;background:var(--primary);top:-100px;left:-50px; }
.cta-circle.c2 { width:250px;height:250px;background:var(--accent);bottom:-80px;right:-50px; }
.cta-circle.c3 { width:200px;height:200px;background:var(--accent-secondary);top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.15; }

@media (max-width:1024px) { .hero-content{grid-template-columns:1fr;text-align:center;} .hero-title{font-size:2.5rem;} .hero-visual{display:none;} .services-grid{grid-template-columns:repeat(2,1fr);} }
@media (max-width:768px) { .hero-title{font-size:2rem;} .hero-stats{flex-direction:column;gap:var(--space-md);} .stat-divider{width:40px;height:1px;} .services-grid{grid-template-columns:1fr;} .timeline-line{left:20px;} .timeline-item{width:100%;margin-left:0;padding-left:50px;padding-right:0;} .timeline-item.left{text-align:left;padding-right:0;padding-left:50px;} .timeline-item.left .timeline-dot,.timeline-item.right .timeline-dot{left:12px;right:auto;} .cta-card h2{font-size:1.5rem;} }
"""
    write(os.path.join(base, 'css', 'index.css'), index_css)

    # ===================== auth.css =====================
    auth_css = """\
.auth-section { min-height:100vh;display:flex;align-items:center;justify-content:center;padding:100px var(--space-xl) var(--space-3xl); }
.auth-card { width:100%;max-width:460px;padding:var(--space-3xl);text-align:center; }
.auth-header { margin-bottom:var(--space-2xl); }
.auth-icon { width:64px;height:64px;margin:0 auto var(--space-lg);background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:#fff;box-shadow:0 8px 30px rgba(79,110,247,0.4); }
.auth-header h2 { font-size:1.8rem;font-weight:800;margin-bottom:var(--space-sm); }
.auth-header p { color:var(--text-muted);font-size:0.95rem; }
.auth-form { text-align:left; }
.input-with-icon { position:relative; }
.input-with-icon i:first-child { position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:0.95rem;z-index:1; }
.input-with-icon .form-input { padding-left:44px; }
.input-with-icon .toggle-pwd { position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px 6px;font-size:0.9rem;transition:color var(--transition-fast); }
.input-with-icon .toggle-pwd:hover { color:var(--text-primary); }
.form-row { display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md); }
.form-options { display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg);font-size:0.85rem; }
.checkbox-label { display:inline-flex;align-items:center;gap:8px;cursor:pointer;color:var(--text-secondary);position:relative;padding-left:24px; }
.checkbox-label input { display:none; }
.checkmark { position:absolute;left:0;top:50%;transform:translateY(-50%);width:16px;height:16px;border:1.5px solid rgba(255,255,255,0.2);border-radius:4px;transition:all var(--transition-fast); }
.checkbox-label input:checked ~ .checkmark { background:var(--primary);border-color:var(--primary); }
.checkmark::after { content:'';position:absolute;display:none;left:4.5px;top:1px;width:4px;height:8px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg); }
.checkbox-label input:checked ~ .checkmark::after { display:block; }
.forgot-link { color:var(--accent);font-size:0.82rem;transition:color var(--transition-fast); }
.forgot-link:hover { color:var(--primary-light); }
.pwd-strength { margin-top:var(--space-sm); } .pwd-bar { width:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;margin-bottom:4px; }
.pwd-fill { height:100%;width:0%;border-radius:2px;transition:all 0.3s ease; }
.pwd-label { font-size:0.75rem;color:var(--text-muted); }
.auth-divider { display:flex;align-items:center;gap:var(--space-md);margin:var(--space-xl) 0;color:var(--text-muted);font-size:0.82rem; }
.auth-divider::before,.auth-divider::after { content:'';flex:1;height:1px;background:rgba(255,255,255,0.08); }
.social-login { display:flex;justify-content:center;gap:var(--space-md);margin-bottom:var(--space-xl); }
.social-btn { width:48px;height:48px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.1);background:transparent;color:var(--text-secondary);font-size:1.2rem;cursor:pointer;transition:all var(--transition-base);display:flex;align-items:center;justify-content:center; }
.social-btn:hover { border-color:var(--primary);color:var(--accent);background:rgba(79,110,247,0.08);transform:translateY(-2px); }
.auth-footer { text-align:center;font-size:0.88rem;color:var(--text-muted); } .auth-footer a { color:var(--accent);font-weight:600; } .auth-footer a:hover { text-decoration:underline; }
@media (max-width:520px) { .auth-card{padding:var(--space-xl) var(--space-lg);} .auth-header h2{font-size:1.4rem;} .form-row{grid-template-columns:1fr;} }
"""
    write(os.path.join(base, 'css', 'auth.css'), auth_css)
    print('CSS 文件生成完毕！')
    print('注意：jobs.css / job-detail.css / offer-compare.css / onboarding.css')
    print('由于篇幅限制，请手动从已生成的HTML中复制对应CSS，或使用Skill重新生成。')

    # ===================== JS 文件 =====================
    main_js = """\
(function(){'use strict';
var n=document.getElementById('navbar');
if(n)window.addEventListener('scroll',function(){n.classList.toggle('scrolled',window.scrollY>50);});
var m=document.getElementById('mobileMenuBtn'),l=document.getElementById('navLinks');
if(m&&l){m.addEventListener('click',function(){l.classList.toggle('mobile-open');var s=this.querySelectorAll('span');if(l.classList.contains('mobile-open')){s[0].style.transform='rotate(45deg) translate(5px,5px)';s[1].style.opacity='0';s[2].style.transform='rotate(-45deg) translate(5px,-5px)';}else{s[0].style.transform='';s[1].style.opacity='';s[2].style.transform='';}});
l.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){l.classList.remove('mobile-open');var s=m.querySelectorAll('span');s[0].style.transform='';s[1].style.opacity='';s[2].style.transform='';});});}
function aC(e){var t=parseInt(e.getAttribute('data-target'),10);if(isNaN(t))return;var d=2000,s=null;function sT(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1),o=p===1?1:1-Math.pow(2,-10*p);e.textContent=Math.floor(o*t).toLocaleString();if(p<1)requestAnimationFrame(sT);else e.textContent=t.toLocaleString();}requestAnimationFrame(sT);}
var ns=document.querySelectorAll('.stat-num[data-target]');
if('IntersectionObserver'in window&&ns.length>0){var ob=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){aC(e.target);ob.unobserve(e.target);}});},{threshold:0.5});ns.forEach(function(e){ob.observe(e);});}
var fs=document.querySelectorAll('.fade-in-up');
if('IntersectionObserver'in window&&fs.length>0){var fo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.style.animationPlayState='running';fo.unobserve(e.target);}});},{threshold:0.15});fs.forEach(function(e){e.style.animationPlayState='paused';fo.observe(e);});}
window.App={debounce:function(fn,d){var t=null;return function(){var c=this,a=arguments;clearTimeout(t);t=setTimeout(function(){fn.apply(c,a);},d);};},animateCountUp:aC};
})();
"""
    write(os.path.join(base, 'js', 'main.js'), main_js)
    print('JS 文件生成完毕（main.js）！')

    # ===================== index.html =====================
    index_html = """\
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>应届生求职服务平台 - 你的职场第一步</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/index.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <div class="bg-animation"><div class="orb"></div><div class="orb"></div><div class="orb"></div></div>
  <nav class="navbar" id="navbar">
    <a href="index.html" class="nav-brand"><div class="logo"><i class="fas fa-rocket"></i></div><span>应届生求职平台</span></a>
    <div class="nav-links" id="navLinks"><a href="index.html" class="active">首页</a><a href="jobs.html">岗位推荐</a><a href="offer-compare.html">Offer对比</a><a href="onboarding.html">入职清单</a><a href="#">求职指南</a></div>
    <div class="nav-actions"><a href="login.html" class="btn btn-ghost">登录</a><a href="register.html" class="btn btn-primary">免费注册</a><button class="mobile-menu-btn" id="mobileMenuBtn"><span></span><span></span><span></span></button></div>
  </nav>
  <section class="hero"><div class="hero-text fade-in-up">
    <h1 class="hero-title">开启你的<br><span class="text-gradient">职场第一步</span></h1>
    <p class="hero-subtitle">专为2025届应届生打造的求职服务平台。<br>智能岗位匹配 · Offer对比分析 · 入职全流程指导</p>
    <div class="hero-actions"><a href="jobs.html" class="btn btn-primary btn-lg"><i class="fas fa-search"></i> 浏览岗位</a><a href="offer-compare.html" class="btn btn-outline btn-lg"><i class="fas fa-balance-scale"></i> Offer对比</a></div>
    <div class="hero-stats">
      <div class="stat-item"><span class="stat-num" data-target="12890">0</span><span class="stat-label">在招岗位</span></div>
      <div class="stat-divider"></div>
      <div class="stat-item"><span class="stat-num" data-target="3680">0</span><span class="stat-label">合作企业</span></div>
      <div class="stat-divider"></div>
      <div class="stat-item"><span class="stat-num" data-target="89500">0</span><span class="stat-label">成功入职</span></div>
    </div>
  </div></section>
  <section class="section carousel-section"><div class="container"><div class="carousel-wrapper"><div class="carousel-header"><div class="carousel-tag"><i class="fas fa-bullhorn"></i> 平台公告</div><div class="carousel-dots" id="carouselDots"></div></div><div class="carousel-track" id="carouselTrack"></div></div></div></section>
  <section class="section services-section"><div class="container"><div class="section-header"><div class="section-tag">我们的服务</div><h2 class="section-title">一站式求职解决方案</h2><p class="section-subtitle">从简历投递到入职准备，全程陪伴你的求职之旅</p></div>
    <div class="services-grid">
      <div class="service-card fade-in-up"><div class="sc-icon blue"><i class="fas fa-briefcase"></i></div><h3>智能岗位推荐</h3><p>基于AI算法，根据专业、技能和期望薪资，精准推荐最适合的校招岗位。</p><a href="jobs.html" class="sc-link">立即探索 <i class="fas fa-arrow-right"></i></a></div>
      <div class="service-card fade-in-up delay-1"><div class="sc-icon cyan"><i class="fas fa-balance-scale"></i></div><h3>Offer智能对比</h3><p>多维度对比薪资待遇、发展前景、工作强度，帮你做出最优选择。</p><a href="offer-compare.html" class="sc-link">开始对比 <i class="fas fa-arrow-right"></i></a></div>
      <div class="service-card fade-in-up delay-2"><div class="sc-icon purple"><i class="fas fa-clipboard-check"></i></div><h3>入职材料清单</h3><p>按公司类型生成个性化入职材料清单，不再遗漏任何重要文件。</p><a href="onboarding.html" class="sc-link">查看清单 <i class="fas fa-arrow-right"></i></a></div>
      <div class="service-card fade-in-up delay-3"><div class="sc-icon green"><i class="fas fa-file-signature"></i></div><h3>三方协议指导</h3><p>三方协议填写模板、注意事项详解，避免签约踩坑。</p><a href="#" class="sc-link">查看指南 <i class="fas fa-arrow-right"></i></a></div>
      <div class="service-card fade-in-up delay-4"><div class="sc-icon orange"><i class="fas fa-user-tie"></i></div><h3>面试真题库</h3><p>汇集各大厂最新面试题，含答案解析，助你轻松应对面试。</p><a href="#" class="sc-link">开始刷题 <i class="fas fa-arrow-right"></i></a></div>
      <div class="service-card fade-in-up delay-5"><div class="sc-icon pink"><i class="fas fa-users"></i></div><h3>职场社群</h3><p>加入同届求职者社群，共享内推资源，求职路上不孤单。</p><a href="#" class="sc-link">加入社群 <i class="fas fa-arrow-right"></i></a></div>
    </div>
  </div></section>
  <footer class="footer"><div class="container">
    <div class="footer-grid"><div class="footer-brand"><div class="nav-brand" style="margin-bottom:var(--space-md)"><div class="logo"><i class="fas fa-rocket"></i></div><span>应届生求职平台</span></div><p>专为应届生打造的求职服务平台。</p></div>
    <div class="footer-col"><h4>服务</h4><a href="jobs.html">岗位推荐</a><a href="offer-compare.html">Offer对比</a><a href="onboarding.html">入职清单</a></div>
    <div class="footer-col"><h4>关于</h4><a href="#">关于我们</a><a href="#">联系我们</a></div>
    <div class="footer-col"><h4>关注我们</h4><a href="#"><i class="fab fa-weixin"></i> 微信</a></div>
    </div><div class="footer-bottom"><span>© 2025 应届生求职服务平台</span></div>
  </div></footer>
  <script src="js/main.js"></script>
</body>
</html>
"""
    write(os.path.join(base, 'index.html'), index_html)
    print('  ✓ index.html 已生成（简化版，完整版请从之前生成的文件中复制）')

    print('\n========== 生成完毕 ==========')
    print(f'项目位置：{base}')
    print('在浏览器中打开 index.html 即可预览')

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.curdir
    generate(out)
