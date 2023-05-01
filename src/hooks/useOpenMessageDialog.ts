import useMessageStore from '@/stores/message';
import { User } from '@prisma/client';

const useOpenMessageDialog = () => {
  const setUser = useMessageStore.use.setUser();
  const setOpen = useMessageStore.use.setOpen();
  const show = (user: User) => {
    setUser(user);
    setOpen(true);
  };
  return { show };
};

export default useOpenMessageDialog;
