import { useMemo, useState } from "react";

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

type ItemRow = {
  id: number;
  name: string;
  sku: string;
  qty: number;
  unit: string;
  price: number;
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

const defaultItems: ItemRow[] = [
  { id: 1, name: "工业控制器", sku: "IC-AX19", qty: 20, unit: "台", price: 2800 },
  { id: 2, name: "电源模块", sku: "PS-M330", qty: 50, unit: "个", price: 360 }
];

function ListPage({ onCreate }: { onCreate: () => void }) {
  return (
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
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            onClick={onCreate}
            type="button"
          >
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
                      <button className="font-medium text-blue-600 hover:text-blue-700" type="button">
                        查看
                      </button>
                      <button className="font-medium text-slate-600 hover:text-slate-800" type="button">
                        编辑
                      </button>
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
          <button className="rounded border border-slate-200 px-3 py-1.5 hover:bg-slate-50" type="button">
            上一页
          </button>
          <span className="rounded bg-blue-600 px-3 py-1.5 font-semibold text-white">1</span>
          <button className="rounded border border-slate-200 px-3 py-1.5 hover:bg-slate-50" type="button">
            下一页
          </button>
        </div>
      </footer>
    </div>
  );
}

function CreatePage({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<ItemRow[]>(defaultItems);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items]
  );

  const handleItemChange = (id: number, field: keyof ItemRow, value: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "qty" || field === "price") {
          return { ...item, [field]: Number(value) || 0 };
        }
        return { ...item, [field]: value };
      })
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", sku: "", qty: 1, unit: "个", price: 0 }
    ]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            className="mb-2 text-sm font-medium text-slate-500 transition hover:text-slate-800"
            onClick={onBack}
            type="button"
          >
            ← 返回采购单列表
          </button>
          <h1 className="text-2xl font-bold text-slate-900">创建采购单</h1>
          <p className="mt-1 text-sm text-slate-500">填写基础信息与采购明细后提交审批</p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            保存草稿
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            提交审批
          </button>
        </div>
      </header>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-base font-semibold text-slate-900">基础信息</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="采购单号（自动生成）" />
          <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="供应商名称" />
          <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="申请人" />
          <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>选择仓库</option>
            <option>上海一号仓</option>
            <option>苏州中转仓</option>
            <option>深圳南山仓</option>
            <option>杭州二号仓</option>
          </select>
          <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="联系人" />
          <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="联系电话" />
          <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" type="date" />
          <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option>付款方式</option>
            <option>月结 30 天</option>
            <option>预付全款</option>
            <option>货到付款</option>
          </select>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">采购明细</h2>
          <button
            className="rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            onClick={addItem}
            type="button"
          >
            + 添加物料
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-semibold">物料名称</th>
                <th className="px-3 py-2 font-semibold">SKU</th>
                <th className="px-3 py-2 font-semibold">数量</th>
                <th className="px-3 py-2 font-semibold">单位</th>
                <th className="px-3 py-2 font-semibold">单价(元)</th>
                <th className="px-3 py-2 font-semibold">小计</th>
                <th className="px-3 py-2 font-semibold">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">
                    <input
                      className="w-44 rounded border border-slate-200 px-2 py-1.5 outline-none focus:border-blue-500"
                      onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                      value={item.name}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-28 rounded border border-slate-200 px-2 py-1.5 outline-none focus:border-blue-500"
                      onChange={(e) => handleItemChange(item.id, "sku", e.target.value)}
                      value={item.sku}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-20 rounded border border-slate-200 px-2 py-1.5 outline-none focus:border-blue-500"
                      min={0}
                      onChange={(e) => handleItemChange(item.id, "qty", e.target.value)}
                      type="number"
                      value={item.qty}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-16 rounded border border-slate-200 px-2 py-1.5 outline-none focus:border-blue-500"
                      onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                      value={item.unit}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      className="w-24 rounded border border-slate-200 px-2 py-1.5 outline-none focus:border-blue-500"
                      min={0}
                      onChange={(e) => handleItemChange(item.id, "price", e.target.value)}
                      type="number"
                      value={item.price}
                    />
                  </td>
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {formatAmount(item.qty * item.price)}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="text-sm font-medium text-rose-600 hover:text-rose-700"
                      onClick={() => removeItem(item.id)}
                      type="button"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h2 className="text-base font-semibold text-slate-900">备注信息</h2>
        <textarea
          className="mt-4 min-h-28 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          placeholder="填写补充说明，例如交付要求、质检标准等"
        />
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
        <div className="text-sm text-slate-600">
          明细行数: <span className="font-semibold text-slate-900">{items.length}</span>
        </div>
        <div className="text-lg font-bold text-slate-900">采购总金额: {formatAmount(totalAmount)}</div>
      </footer>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<"list" | "create">("list");

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-800 sm:p-6 lg:p-8">
      {page === "list" ? (
        <ListPage onCreate={() => setPage("create")} />
      ) : (
        <CreatePage onBack={() => setPage("list")} />
      )}
    </div>
  );
}

export default App;
