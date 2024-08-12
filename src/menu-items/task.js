// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
  IconUsers,
  IconGoGame,
  IconEngineOff,
  IconSubtask,
} from '@tabler/icons-react';

// constant
const icons = {
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc,
  IconUsers,
  IconGoGame,
  IconEngineOff,
  IconSubtask,
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const task = {
  id: 'task',
  title: <FormattedMessage id='task' />,
  caption: <FormattedMessage id='todo' />,
  type: 'group',
  children: [
    {
      id: 'task',
      title: <FormattedMessage id='task' />,
      type: 'item',
      url: '/app/task',
      icon: icons.IconSubtask,
      breadcrumbs: true,
    },
  ],
};

export default task;
