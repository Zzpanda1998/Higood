const featuredPosts = [
  {
    title: "Vite + TypeScript 项目优化：从 2 秒热更新到 300ms",
    summary:
      "记录一次中型前端项目性能治理实践，包括依赖拆分、插件裁剪和代码分包策略。",
    category: "前端工程化",
    date: "2026-03-18",
    readTime: "8 分钟"
  },
  {
    title: "TailwindCSS 设计系统落地：如何让团队写样式更稳",
    summary:
      "用原子类构建可维护的 UI 体系，统一色彩、间距与组件规范，减少视觉返工。",
    category: "UI 设计",
    date: "2026-03-12",
    readTime: "6 分钟"
  },
  {
    title: "写给新人的 TypeScript 心法：类型不是负担，是护栏",
    summary:
      "从常见报错切入，讲清楚泛型、联合类型与类型守卫在真实业务里的用法。",
    category: "TypeScript",
    date: "2026-03-05",
    readTime: "10 分钟"
  }
];

const trendingTopics = ["React", "Vite", "TypeScript", "TailwindCSS", "性能优化"];

function App() {
  return (
    <div className="text-slate-800">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-600">Read Tide</p>
          <h1 className="text-xl font-bold">读潮志</h1>
        </div>
        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-accent-600" href="#">
            首页
          </a>
          <a className="transition hover:text-accent-600" href="#">
            文章
          </a>
          <a className="transition hover:text-accent-600" href="#">
            分类
          </a>
          <a className="transition hover:text-accent-600" href="#">
            关于
          </a>
        </nav>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-[1fr_300px] lg:px-8">
        <section>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-card backdrop-blur sm:p-10">
            <p className="inline-flex rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
              本周专题
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
              技术会变，但持续创作的习惯不会过时
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              一个专注于前端开发、工程化实践和效率工具的博客前端模板，支持快速替换为你的真实内容。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {trendingTopics.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {featuredPosts.map((post) => (
              <article
                key={post.title}
                className="group rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-card transition hover:-translate-y-0.5 hover:border-accent-100"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900 transition group-hover:text-accent-700">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.summary}</p>
                <button className="mt-5 text-sm font-semibold text-accent-600 transition hover:text-accent-700">
                  阅读全文 →
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-card">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">关于作者</h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              我是 K，关注前端架构和工程效率。这里分享实践总结、工具清单和踩坑记录。
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-card">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">订阅更新</h4>
            <input
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none ring-accent-100 transition placeholder:text-slate-400 focus:border-accent-400 focus:ring-4"
              placeholder="输入你的邮箱"
              type="email"
            />
            <button className="mt-3 w-full rounded-xl bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700">
              免费订阅
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-card">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">热门分类</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>工程化实践 (14)</li>
              <li>React 组件设计 (9)</li>
              <li>TypeScript 指南 (11)</li>
              <li>效率工具分享 (7)</li>
            </ul>
          </section>
        </aside>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 读潮志. All rights reserved.</p>
          <p>由 Vite + TypeScript + TailwindCSS 构建</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
