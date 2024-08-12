// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  IconKey,
  IconReceipt2,
  IconPhoneCall,
  IconReportMoney,
  IconPigMoney,
  IconCalculator,
  IconCoinRupee,
  IconShoppingCart,
} from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconPhoneCall,
  IconReportMoney,
  IconPigMoney,
  IconCalculator,
  IconCoinRupee,
  IconShoppingCart,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const accounting = {
  id: 'accounting',
  title: <FormattedMessage id='accounting' />,
  caption: <FormattedMessage id='accounting-caption' />,
  type: 'group',
  children: [
    {
      id: 'bill',
      title: <FormattedMessage id='bill' />,
      type: 'collapse',
      icon: icons.IconReportMoney,
      children: [
        {
          id: 'purchasingBill',
          title: <FormattedMessage id='purchasingBill' />,
          type: 'item',
          icon: icons.IconShoppingCart,
          url: '/app/purchase-product/list',
        },
        // {
        //   id: 'salesBill',
        //   title: <FormattedMessage id='salesBill' />,
        //   type: 'item',
        //   url: '/app/sale-bill/list',
        // },
      ],
    },
    {
      id: 'expense',
      title: <FormattedMessage id='expense' />,
      type: 'item',
      icon: icons.IconReceipt2,
      url: '/app/expense-list',
    },
    {
      id: 'salary',
      title: <FormattedMessage id='salary' />,
      type: 'collapse',
      icon: icons.IconPigMoney,
      children: [
        {
          id: 'salaryCalculator',
          title: <FormattedMessage id='salaryCalculator' />,
          type: 'item',
          icon: icons.IconCalculator,
          url: '/app/salary-calculator',
        },
        {
          id: 'advance',
          title: <FormattedMessage id='advance' />,
          type: 'item',
          icon: icons.IconCoinRupee,
          url: '/app/advance/advance-take',
        },
      ],
    },
  ],
};

export default accounting;
