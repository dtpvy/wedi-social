import { Admin, Header } from "@/components/Admin/Dashboard";
import { trpc } from "@/utils/trpc";
import { Divider, Loader, Text } from "@mantine/core";
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
  Line,
  LineChart,
} from "recharts";
import {
  TRACKING_EVENT,
  TRACKING_PAGE,
  TRACKING_TITLE,
} from "@/constants/tracking";

const Dashboard = () => {
  const { data, isLoading, refetch } = trpc.admin.adminList.useQuery();
  const user = trpc.admin.userList.useQuery();
  // const {data:recentPostData} = trpc.admin.Recent7DaysPosts.useQuery();
  // const postData = recentPostData?.map((day)=>({
  //   day:dayjs(day.createdAt)

  // }))
  const { data: tracking } = trpc.admin.trackingPage.useQuery({});
  const _data = (tracking?.trackingEvent || []).map((d) => ({
    name: TRACKING_TITLE[d.event],
    sum: d._sum.amount,
  }));
  const event_data = (tracking?.trackingEvent || []).map((d) => ({
    name: d.event,
    sum: d._sum.amount,
  }));
  console.log({ _data });

  const COLORS = ["#0088FE", "#00C49F"];
  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Pending requests:
      </Text>
      <Header />
      <Divider my="sm" />
      <div className="flex flex-col justify-around items-center">
        <div className="chart-container">
          <BarChart width={800} height={300} data={_data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sum" fill="#8884d8" />
            <text
              x="60%"
              y="300"
              textAnchor="middle"
              fontWeight="bold"
              fontSize={16}
            >
              My Chart Title
            </text>
          </BarChart>
        </div>
        <PieChart width={400} height={400}>
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
          <text
            x="50%"
            y="300"
            textAnchor="middle"
            fontWeight="bold"
            fontSize={16}
          >
            My Chart Title
          </text>
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

      <Text size="xl" className="relative px-4 ml-8 pt-3 font-semibold">
        Danh sách Admin:
        {isLoading && <Loader className="absolute top-1/2 left-1/2 -tr" />}
      </Text>
      <div className="px-4 mt-4">
        {data?.result.map((d) => (
          <Admin key={d.id} admin={d} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
