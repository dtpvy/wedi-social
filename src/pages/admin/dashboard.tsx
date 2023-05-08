import { Admin, Header } from '@/components/Admin/Dashboard';
import { trpc } from '@/utils/trpc';
import { Divider, Loader } from '@mantine/core';
import dayjs from 'dayjs';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  Text,
} from 'recharts';
import { TRACKING_EVENT, TRACKING_PAGE, TRACKING_TITLE } from '@/constants/tracking';

const Dashboard = () => {
  const { data, isLoading, refetch } = trpc.admin.adminList.useQuery();
  const { data: user } = trpc.admin.userList.useQuery();
  const { data: tracking } = trpc.admin.trackingPage.useQuery({});
  let bar_data1 = (tracking?.trackingEvent || [])
    .map((d) => {
      if (d.event == 'signin')
        return {
          name: TRACKING_TITLE[d.event],
          sum: d._sum.amount,
        };
    })
    .filter((d) => d !== undefined);
  bar_data1.push({ name: 'Người dùng', sum: user?.result.length || 0 });
  const bar_data2 = (tracking?.trackingPage || []).map((d) => ({
    name: d.page,
    sum: d._sum.amount,
  }));

  return (
    <div>
      <p className="px-4 ml-8 pt-1 font-semibold text-xl">Pending requests:</p>
      <Header />
      <Divider my="sm" />
      <p className="px-4 ml-8 pt-2 font-semibold text-xl">Thống kê qua biểu đồ:</p>
      <div className="flex justify-between items-start">
        <div className="chart-container flex flex-col items-center pt-2">
          <svg width={530} height={48}>
            <Text x={280} y={30} textAnchor="middle" fontSize={18} color="black">
              Biểu đồ sự tương quan giữa người dùng và lượt truy cập
            </Text>
          </svg>
          <BarChart width={530} height={400} data={bar_data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" fill="#66DC9C" />
          </BarChart>
        </div>

        <div className="chart-container mr-5">
          <svg width={600} height={48}>
            <Text x={300} y={30} textAnchor="middle" fontSize={20} color="black">
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
