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
  IconCategory,
  IconTir,
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
  IconCategory,
  IconTir,
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const transport = {
  id: 'transport',
  title: <FormattedMessage id='transport' />,
  caption: <FormattedMessage id='transporatation status' />,
  type: 'group',
  children: [
    {
      id: 'transport_status',
      title: <FormattedMessage id='transport_status' />,
      type: 'item',
      icon: icons.IconTir,
      url: '/app/transport-status',
      breadcrumbs: true,
    },
  ],
};

export default transport;
