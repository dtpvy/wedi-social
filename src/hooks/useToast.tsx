import { notifications } from '@mantine/notifications';
import useTranslation from './useTranslation';
import { IconCheck, IconX } from '@tabler/icons-react';

const useToast = () => {
  const { t } = useTranslation();

  const show = ({ type = 'success', message }: { message?: string; type: 'success' | 'error' }) => {
    if (type === 'success') {
      notifications.show({
        message: message || t('addsuccessText'),
        color: 'green',
        icon: <IconCheck />,
      });
    } else {
      notifications.show({
        message: message || t('addfailedText'),
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  return { show };
};

export default useToast;
