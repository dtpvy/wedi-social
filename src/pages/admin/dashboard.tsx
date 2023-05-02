import { Admin, Header } from "@/components/Admin/Dashboard";
import { trpc } from "@/utils/trpc";
import { Divider, Loader } from "@mantine/core";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Text,
} from "recharts";
import {
  TRACKING_EVENT,
  TRACKING_PAGE,
  TRACKING_TITLE,
} from "@/constants/tracking";

const Dashboard = () => {
  const { data, isLoading, refetch } = trpc.admin.adminList.useQuery();
  const user = trpc.admin.userList.useQuery();
  const { data: tracking } = trpc.admin.trackingPage.useQuery({});
  const bar_data1 = (tracking?.trackingEvent || [])
    .map((d) => {
      if (d.event == "signin" || d.event == "singup")
        return {
          name: TRACKING_TITLE[d.event],
          sum: d._sum.amount,
        };
    })
    .filter((d) => d !== undefined);
  const bar_data2 = (tracking?.trackingPage || []).map((d) => ({
    name: d.page,
    sum: d._sum.amount,
  }));

  const event_data = (tracking?.trackingEvent || []).map((d) => ({
    name: d.event,
    sum: d._sum.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#fba32b"];
  return (
    <div>
      <p className="px-4 ml-8 pt-1 font-semibold text-xl">Pending requests:</p>
      <Header />
      <Divider my="sm" />
      <p className="px-4 ml-8 pt-2 font-semibold text-xl">
        Thống kê qua biểu đồ:
      </p>
      <div className="flex flex-col justify-around items-center">
        <svg width={600} height={50}>
          <Text x={330} y={30} textAnchor="middle" fontSize={20}>
            Biểu đồ sự tương quan giữa người dùng và lượt truy cập
          </Text>
        </svg>
        <div className="chart-container">
          <BarChart width={600} height={300} data={bar_data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" fill="#66DC9C" />
          </BarChart>
        </div>
        <div>
          <svg width={600} height={50}>
            <Text x={300} y={30} textAnchor="middle" fontSize={20}>
              Biểu đồ so sánh lượt truy cập các trang
            </Text>
          </svg>
          <PieChart width={600} height={300}>
            <Pie
              data={event_data}
              dataKey="sum"
              nameKey="name"
              cx="40%"
              cy="40%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {event_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              wrapperStyle={{
                paddingRight: "10px",
              }}
            />
          </PieChart>
        </div>

        <div className="chart-container">
          <svg width={600} height={50}>
            <Text x={300} y={30} textAnchor="middle" fontSize={20}>
              Biểu đồ so sánh lượt truy cập các trang
            </Text>
          </svg>
          <BarChart width={600} height={400} data={bar_data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" fill="#69CBF5" />
          </BarChart>
        </div>
      </div>

      <p className="relative px-4 ml-8 pt-3 font-semibold text-xl">
        Danh sách Admin:
        {isLoading && <Loader className="absolute top-1/2 left-1/2 -tr" />}
      </p>
      <div className="px-4 mt-4 ml-8">
        {data?.result.map((d) => (
          <Admin key={d.id} admin={d} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
