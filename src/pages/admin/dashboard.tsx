import { Admin, Header } from "@/components/Admin/Dashboard";
import { trpc } from "@/utils/trpc";
import { Loader, Text, Divider } from "@mantine/core";

const Dashboard = () => {
  const { data, isLoading, refetch } = trpc.admin.adminList.useQuery();
  const user = trpc.admin.userList.useQuery();
  return (
    <div>
      <Text size="xl" className="px-4 ml-8 pt-3 font-semibold">
        Pending requests:
      </Text>
      <Header />
      <Divider my="sm" />
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
