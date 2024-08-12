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
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
  id: 'admin',
  title: <FormattedMessage id='admin' />,
  caption: <FormattedMessage id='application category' />,
  type: 'group',
  children: [
    {
      id: 'category',
      title: <FormattedMessage id='category' />,
      type: 'collapse',
      icon: icons.IconCategory,
      children: [
        {
          id: 'product_category',
          title: 'Product Category',
          type: 'item',
          icon: icons.IconLayoutKanban,
          url: '/app/product-category-list',
          breadcrumbs: true,
        },
        {
          id: 'material_category',
          title: 'Material Category',
          type: 'item',
          icon: icons.IconLayoutKanban,
          url: '/app/material-category-list',
          breadcrumbs: true,
        },
        {
          id: 'designation',
          title: 'Designation List',
          type: 'item',
          icon: icons.IconLayoutKanban,
          url: '/app/designation-list',
          breadcrumbs: true,
        },
        {
          id: 'production_status',
          title: 'Production Status',
          type: 'item',
          icon: icons.IconLayoutKanban,
          url: '/app/production-status-list',
          breadcrumbs: true,
        },
      ],
    },
  ],
};

export default application;
