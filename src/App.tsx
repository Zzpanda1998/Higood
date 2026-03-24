type PurchaseOrder = {
  id: string;
  supplier: string;
  creator: string;
  warehouse: string;
  amount: number;
  createdAt: string;
  expectAt: string;
  status: "草稿" | "待审批" | "已下单" | "已入库";
};

const orders: PurchaseOrder[] = [
  {
    id: "PO-20260324-001",
    supplier: "华东电子设备有限公司",
    creator: "张伟",
    warehouse: "上海一号仓",
    amount: 186500,
    createdAt: "2026-03-24 09:10",
    expectAt: "2026-03-29",
    status: "待审批"
  },
  {
    id: "PO-20260323-017",
    supplier: "江苏精工五金厂",
    creator: "李娜",
    warehouse: "苏州中转仓",
    amount: 52800,
    createdAt: "2026-03-23 16:35",
    expectAt: "2026-03-27",
    status: "已下单"
  },
  {
    id: "PO-20260322-011",
    supplier: "深圳智造科技有限公司",
    creator: "王强",
    warehouse: "深圳南山仓",
    amount: 312000,
    createdAt: "2026-03-22 11:02",
    expectAt: "2026-03-30",
    status: "草稿"
  },
  {
    id: "PO-20260320-028",
    supplier: "宁波包装材料有限公司",
    creator: "刘婷",
    warehouse: "杭州二号仓",
    amount: 24890,
    createdAt: "2026-03-20 14:18",
    expectAt: "2026-03-25",
    status: "已入库"
  }
];

const statusStyle: Record<PurchaseOrder["status"], string> = {
  草稿: "bg-slate-100 text-slate-700",
  待审批: "bg-amber-100 text-amber-700",
  已下单: "bg-blue-100 text-blue-700",
  已入库: "bg-emerald-100 text-emerald-700"
};

const formatAmount = (value: number) =>
  new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0
  }).format(value);

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">采购单列表</h1>
            <p className="mt-1 text-sm text-slate-500">用于创建、筛选与跟踪采购单状态</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
              导出数据
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              + 创建采购单
            </button>
          </div>
        </header>

        <section className="grid gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-4">
          <input
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
            placeholder="搜索采购单号/供应商"
            type="text"
          />
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>全部状态</option>
            <option>草稿</option>
            <option>待审批</option>
            <option>已下单</option>
            <option>已入库</option>
          </select>
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>全部仓库</option>
            <option>上海一号仓</option>
            <option>苏州中转仓</option>
            <option>深圳南山仓</option>
            <option>杭州二号仓</option>
          </select>
          <button className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900">
            查询
          </button>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">采购单号</th>
                  <th className="px-4 py-3 font-semibold">供应商</th>
                  <th className="px-4 py-3 font-semibold">创建人</th>
                  <th className="px-4 py-3 font-semibold">仓库</th>
                  <th className="px-4 py-3 font-semibold">采购金额</th>
                  <th className="px-4 py-3 font-semibold">创建时间</th>
                  <th className="px-4 py-3 font-semibold">预计到货</th>
                  <th className="px-4 py-3 font-semibold">状态</th>
                  <th className="px-4 py-3 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-medium text-slate-900">{order.id}</td>
                    <td className="px-4 py-3">{order.supplier}</td>
                    <td className="px-4 py-3">{order.creator}</td>
                    <td className="px-4 py-3">{order.warehouse}</td>
                    <td className="px-4 py-3 font-medium">{formatAmount(order.amount)}</td>
                    <td className="px-4 py-3 text-slate-500">{order.createdAt}</td>
                    <td className="px-4 py-3 text-slate-500">{order.expectAt}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3 text-sm">
                        <button className="font-medium text-blue-600 hover:text-blue-700">查看</button>
                        <button className="font-medium text-slate-600 hover:text-slate-800">编辑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <p>共 4 条采购单</p>
          <div className="flex items-center gap-2">
            <button className="rounded border border-slate-200 px-3 py-1.5 hover:bg-slate-50">上一页</button>
            <span className="rounded bg-blue-600 px-3 py-1.5 font-semibold text-white">1</span>
            <button className="rounded border border-slate-200 px-3 py-1.5 hover:bg-slate-50">下一页</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
