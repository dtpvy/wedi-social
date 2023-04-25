import { FeedLayout } from "@/components/Layout";
import { TripEvent } from "@/components/Event";
import { Button, Input, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import useTranslation from "@/hooks/useTranslation";

const Event = () => {
  const { t } = useTranslation();
  return (
    <FeedLayout className="pt-8 px-16 w-full">
      <div className="bg-white rounded shadow p-4 flex items-center gap-4 mb-8">
        <Input
          icon={<IconSearch />}
          radius="xl"
          placeholder= {`${t("searchText")}...`}
          className="mr-auto"
        />
        <Select
          placeholder={t("groupplhText")}
          data={[
            { value: "react", label: "Group 1" },
            { value: "ng", label: "Group 2" },
            { value: "svelte", label: "Group 3" },
            { value: "vue", label: "Group 4" },
          ]}
        />
        <Button radius="xl" color="green">
          {t("participatebtnText")}
        </Button>
        <Button radius="xl" variant="outline" color="green">
          {t("noparticipatebtnText")}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 pb-8">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <TripEvent key={index} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Event;
