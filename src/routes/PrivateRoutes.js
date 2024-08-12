import ProductionList from '@/container/production/ProductionList';
import MainLayout from '@/layout/MainLayout';
import Loadable from '@/ui-component/Loadable';
import { lazy } from 'react';

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import('../views/dashboard/Default'))
);
const DashboardAnalytics = Loadable(
  lazy(() => import('../views/dashboard/Analytics'))
);

// widget routing
const WidgetStatistics = Loadable(
  lazy(() => import('../views/widget/Statistics'))
);
const WidgetData = Loadable(lazy(() => import('../views/widget/Data')));
const WidgetChart = Loadable(lazy(() => import('../views/widget/Chart')));

// application - user social & account profile routing
const AppUserSocialProfile = Loadable(
  lazy(() => import('../views/application/users/social-profile'))
);
const AppUserAccountProfile1 = Loadable(
  lazy(() => import('../views/application/users/account-profile/Profile1'))
);
const AppUserAccountProfile2 = Loadable(
  lazy(() => import('../views/application/users/account-profile/Profile2'))
);
const AppUserAccountProfile3 = Loadable(
  lazy(() => import('../views/application/users/account-profile/Profile3'))
);

// application - user cards & list variant routing
const AppProfileCardStyle1 = Loadable(
  lazy(() => import('../views/application/users/card/CardStyle1'))
);
const AppProfileCardStyle2 = Loadable(
  lazy(() => import('../views/application/users/card/CardStyle2'))
);
const AppProfileCardStyle3 = Loadable(
  lazy(() => import('../views/application/users/card/CardStyle3'))
);
const AppProfileListStyle1 = Loadable(
  lazy(() => import('../views/application/users/list/Style1'))
);
const AppProfileListStyle2 = Loadable(
  lazy(() => import('../views/application/users/list/Style2'))
);

// application - customer routing
const AppCustomerList = Loadable(
  lazy(() => import('../views/application/customer/CustomerList'))
);
const AppCustomerOrderList = Loadable(
  lazy(() => import('../views/application/customer/OrderList'))
);
const AppCustomerOrderDetails = Loadable(
  lazy(() => import('../views/application/customer/OrderDetails'))
);
const AppCustomerProduct = Loadable(
  lazy(() => import('../views/application/customer/Product'))
);
const AppCustomerProductReview = Loadable(
  lazy(() => import('../views/application/customer/ProductReview'))
);

// application routing
const AppChat = Loadable(lazy(() => import('../views/application/chat')));
const AppKanban = Loadable(lazy(() => import('../views/application/kanban')));
const AppMail = Loadable(lazy(() => import('../views/application/mail')));
const AppCalendar = Loadable(
  lazy(() => import('../views/application/calendar'))
);
const AppContactCard = Loadable(
  lazy(() => import('../views/application/contact/Card'))
);
const AppContactList = Loadable(
  lazy(() => import('../views/application/contact/List'))
);

// application e-commerce pages
const AppECommProducts = Loadable(
  lazy(() => import('../views/application/e-commerce/Products'))
);

const AppECommCheckout = Loadable(
  lazy(() => import('../views/application/e-commerce/Checkout'))
);

// forms component routing
const FrmComponentsTextfield = Loadable(
  lazy(() => import('../views/forms/components/TextField'))
);
const FrmComponentsButton = Loadable(
  lazy(() => import('../views/forms/components/Button'))
);
const FrmComponentsCheckbox = Loadable(
  lazy(() => import('../views/forms/components/Checkbox'))
);
const FrmComponentsRadio = Loadable(
  lazy(() => import('../views/forms/components/Radio'))
);
const FrmComponentsSwitch = Loadable(
  lazy(() => import('../views/forms/components/Switch'))
);
const FrmComponentsAutoComplete = Loadable(
  lazy(() => import('../views/forms/components/AutoComplete'))
);
const FrmComponentsSlider = Loadable(
  lazy(() => import('../views/forms/components/Slider'))
);
const FrmComponentsDateTime = Loadable(
  lazy(() => import('../views/forms/components/DateTime'))
);

// forms plugins layout
const FrmLayoutLayout = Loadable(
  lazy(() => import('../views/forms/layouts/Layouts'))
);
const FrmLayoutMultiColumnForms = Loadable(
  lazy(() => import('../views/forms/layouts/MultiColumnForms'))
);
const FrmLayoutActionBar = Loadable(
  lazy(() => import('../views/forms/layouts/ActionBar'))
);
const FrmLayoutStickyActionBar = Loadable(
  lazy(() => import('../views/forms/layouts/StickyActionBar'))
);

// forms plugins routing
const FrmAutocomplete = Loadable(
  lazy(() => import('../views/forms/plugins/AutoComplete'))
);
const FrmMask = Loadable(lazy(() => import('../views/forms/plugins/Mask')));
const FrmClipboard = Loadable(
  lazy(() => import('../views/forms/plugins/Clipboard'))
);
const FrmRecaptcha = Loadable(
  lazy(() => import('../views/forms/plugins/Recaptcha'))
);
const FrmWysiwugEditor = Loadable(
  lazy(() => import('../views/forms/plugins/WysiwugEditor'))
);
const FrmModal = Loadable(lazy(() => import('../views/forms/plugins/Modal')));
const FrmTooltip = Loadable(
  lazy(() => import('../views/forms/plugins/Tooltip'))
);

// table routing
const TableBasic = Loadable(
  lazy(() => import('../views/forms/tables/TableBasic'))
);
const TableDense = Loadable(
  lazy(() => import('../views/forms/tables/TableDense'))
);
const TableEnhanced = Loadable(
  lazy(() => import('../views/forms/tables/TableEnhanced'))
);
const TableData = Loadable(
  lazy(() => import('../views/forms/tables/TableData'))
);
const TableCustomized = Loadable(
  lazy(() => import('../views/forms/tables/TablesCustomized'))
);
const TableStickyHead = Loadable(
  lazy(() => import('../views/forms/tables/TableStickyHead'))
);
const TableCollapsible = Loadable(
  lazy(() => import('../views/forms/tables/TableCollapsible'))
);

// forms validation
const FrmFormsValidation = Loadable(
  lazy(() => import('../views/forms/forms-validation'))
);
const FrmFormsWizard = Loadable(
  lazy(() => import('../views/forms/forms-wizard'))
);

// chart routing
const ChartApexchart = Loadable(
  lazy(() => import('../views/forms/chart/Apexchart'))
);

// basic ui-elements routing
const BasicUIAccordion = Loadable(
  lazy(() => import('../views/ui-elements/basic/UIAccordion'))
);
const BasicUIAvatar = Loadable(
  lazy(() => import('../views/ui-elements/basic/UIAvatar'))
);
const BasicUIBadges = Loadable(
  lazy(() => import('../views/ui-elements/basic/UIBadges'))
);
const BasicUIBreadcrumb = Loadable(
  lazy(() => import('../views/ui-elements/basic/UIBreadcrumb'))
);
const BasicUICards = Loadable(
  lazy(() => import('../views/ui-elements/basic/UICards'))
);
const BasicUIChip = Loadable(
  lazy(() => import('../views/ui-elements/basic/UIChip'))
);
const BasicUIList = Loadable(
  lazy(() => import('../views/ui-elements/basic/UIList'))
);
const BasicUITabs = Loadable(
  lazy(() => import('../views/ui-elements/basic/UITabs'))
);

// advance ui-elements routing
const AdvanceUIAlert = Loadable(
  lazy(() => import('../views/ui-elements/advance/UIAlert'))
);
const AdvanceUIDialog = Loadable(
  lazy(() => import('../views/ui-elements/advance/UIDialog'))
);
const AdvanceUIPagination = Loadable(
  lazy(() => import('../views/ui-elements/advance/UIPagination'))
);
const AdvanceUIProgress = Loadable(
  lazy(() => import('../views/ui-elements/advance/UIProgress'))
);
const AdvanceUIRating = Loadable(
  lazy(() => import('../views/ui-elements/advance/UIRating'))
);
const AdvanceUISnackbar = Loadable(
  lazy(() => import('../views/ui-elements/advance/UISnackbar'))
);
const AdvanceUISkeleton = Loadable(
  lazy(() => import('../views/ui-elements/advance/UISkeleton'))
);
const AdvanceUISpeeddial = Loadable(
  lazy(() => import('../views/ui-elements/advance/UISpeeddial'))
);
const AdvanceUITimeline = Loadable(
  lazy(() => import('../views/ui-elements/advance/UITimeline'))
);
const AdvanceUIToggleButton = Loadable(
  lazy(() => import('../views/ui-elements/advance/UIToggleButton'))
);
const AdvanceUITreeview = Loadable(
  lazy(() => import('../views/ui-elements/advance/UITreeview'))
);

// pricing page routing
const PagesPrice1 = Loadable(
  lazy(() => import('../views/pages/pricing/Price1'))
);
const PagesPrice2 = Loadable(
  lazy(() => import('../views/pages/pricing/Price2'))
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import('../views/utilities/Typography'))
);
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(
  lazy(() => import('../views/utilities/MaterialIcons'))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import('../views/utilities/TablerIcons'))
);
const UtilsAnimation = Loadable(
  lazy(() => import('../views/utilities/Animation'))
);
const UtilsGrid = Loadable(lazy(() => import('../views/utilities/Grid')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// Product Routing

const ProductStock = Loadable(
  lazy(() => import('../container/inventory/product/ProductStock'))
);
const ProductDetails = Loadable(
  lazy(() => import('../container/inventory/product/ProductDetails'))
);

// Employee Routing
const EmployeeList = Loadable(
  lazy(() => import('../container/hrms/employee/EmployeeList'))
);

const EmployeeDetail = Loadable(
  lazy(() => import('../container/hrms/employee/EmployeeDetail'))
);

// Client Routing
const ClientList = Loadable(
  lazy(() => import('../container/hrms/client/ClientList'))
);

const ClientDetail = Loadable(
  lazy(() => import('../container/hrms/client/ClientDetail'))
);

// Vendor Routing
const VendorList = Loadable(
  lazy(() => import('../container/hrms/vendor/VendorList'))
);
const VendorDetail = Loadable(
  lazy(() => import('../container/hrms/vendor/VendorDetail'))
);

// Material Routing
const MaterialStock = Loadable(
  lazy(() => import('../container/inventory/material/MaterialStock'))
);
const AddEditMaterial = Loadable(
  lazy(() => import('../container/inventory/material/AddEditMaterial'))
);

const MaterialDetail = Loadable(
  lazy(() =>
    import('../views/application/e-commerce/MaterialDetail/MaterialDetail')
  )
);

// Accounting Routing
const ExpenseList = Loadable(
  lazy(() => import('../container/account/expense/ExpenseList'))
);

const AddEditExpense = Loadable(
  lazy(() => import('../container/account/expense/AddEditExpense'))
);

// Bills
const ProductPurchaseBill = Loadable(
  lazy(() => import('../container/account/purchase-bill/ProductPurchaseBill'))
);
const SaleProductList = Loadable(
  lazy(() => import('../container/account/sales-bill/SaleProductList'))
);

// Salary
const SalaryCalculator = Loadable(
  lazy(() => import('../container/salary/salary/SalaryCalculator'))
);

// Advance
const AdvanceAmount = Loadable(
  lazy(() => import('../container/salary/advance/AdvanceAmount'))
);

// const ProductPurchasing = Loadable(
//   lazy(() => import('../container/account/purchase-bill/'))
// );

// Order Routing
const OrderTrack = Loadable(
  lazy(() => import('../container/order/OrderTrack'))
);

//

// Admin -->
const ProductCategory = Loadable(
  lazy(() => import('../container/admin/productCategory/ProductCategory'))
);

const MaterialCategory = Loadable(
  lazy(() => import('../container/admin/materialCategory/MaterialCategory'))
);

const Designation = Loadable(
  lazy(() => import('../container/admin/designation/Designation'))
);

const ProductionStatus = Loadable(
  lazy(() => import('../container/admin/productionStatus/ProductionStatus'))
);

const MaterialConsumption = Loadable(
  lazy(() => import('../container/inventory/material/MaterialConsumptionList'))
);

// Task
const PreviousTask = Loadable(
  lazy(() => import('../container/task/PreviousTask'))
);

// transport
const Transport = Loadable(
  lazy(() => import('../container/transport/Transport'))
);

// ==============================|| MAIN ROUTING ||============================== //

const PrivateRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/widget/statistics',
      element: <WidgetStatistics />,
    },
    {
      path: '/widget/data',
      element: <WidgetData />,
    },
    {
      path: '/widget/chart',
      element: <WidgetChart />,
    },

    {
      path: '/user/social-profile/:tab',
      element: <AppUserSocialProfile />,
    },
    {
      path: '/user/account-profile/profile1',
      element: <AppUserAccountProfile1 />,
    },
    {
      path: '/user/account-profile/profile2',
      element: <AppUserAccountProfile2 />,
    },
    {
      path: '/user/account-profile/profile3',
      element: <AppUserAccountProfile3 />,
    },

    {
      path: '/user/card/card1',
      element: <AppProfileCardStyle1 />,
    },
    {
      path: '/user/card/card2',
      element: <AppProfileCardStyle2 />,
    },
    {
      path: '/user/card/card3',
      element: <AppProfileCardStyle3 />,
    },
    {
      path: '/user/list/list1',
      element: <AppProfileListStyle1 />,
    },
    {
      path: '/user/list/list2',
      element: <AppProfileListStyle2 />,
    },

    {
      path: '/customer/customer-list',
      element: <AppCustomerList />,
    },
    {
      path: '/customer/order-list',
      element: <AppCustomerOrderList />,
    },
    {
      path: '/customer/order-details',
      element: <AppCustomerOrderDetails />,
    },
    {
      path: '/customer/product',
      element: <AppCustomerProduct />,
    },
    {
      path: '/customer/product-review',
      element: <AppCustomerProductReview />,
    },

    {
      path: '/app/chat',
      element: <AppChat />,
    },
    {
      path: '/app/mail',
      element: <AppMail />,
    },
    {
      path: '/app/kanban',
      element: <AppKanban />,
    },
    {
      path: '/app/calendar',
      element: <AppCalendar />,
    },
    {
      path: '/app/contact/c-card',
      element: <AppContactCard />,
    },
    {
      path: '/app/contact/c-list',
      element: <AppContactList />,
    },
    {
      path: '/e-commerce/products',
      element: <AppECommProducts />,
    },

    // Order Module
    {
      path: '/app/order-list',
      element: <OrderTrack />,
    },
    {
      path: '/app/production-list',
      element: <ProductionList />,
    },
    {
      path: '/e-commerce/checkout',
      element: <AppECommCheckout />,
    },

    {
      path: '/components/text-field',
      element: <FrmComponentsTextfield />,
    },
    {
      path: '/components/button',
      element: <FrmComponentsButton />,
    },
    {
      path: '/components/checkbox',
      element: <FrmComponentsCheckbox />,
    },
    {
      path: '/components/radio',
      element: <FrmComponentsRadio />,
    },
    {
      path: '/components/autocomplete',
      element: <FrmComponentsAutoComplete />,
    },
    {
      path: '/components/slider',
      element: <FrmComponentsSlider />,
    },
    {
      path: '/components/switch',
      element: <FrmComponentsSwitch />,
    },
    {
      path: '/components/date-time',
      element: <FrmComponentsDateTime />,
    },

    {
      path: '/forms/layouts/layouts',
      element: <FrmLayoutLayout />,
    },
    {
      path: '/forms/layouts/multi-column-forms',
      element: <FrmLayoutMultiColumnForms />,
    },

    // Bill
    // Purchase Bill
    {
      path: '/app/purchase-product/list',
      element: <ProductPurchaseBill />,
    },
    {
      path: '/app/sale-bill/list',
      element: <SaleProductList />,
    },

    // Expense
    {
      path: '/app/expense-list',
      element: <ExpenseList />,
    },

    {
      path: '/app/add-edit-expense',
      element: <AddEditExpense />,
    },

    // Salary
    {
      path: '/app/salary-calculator',
      element: <SalaryCalculator />,
    },

    // Advance
    {
      path: '/app/advance/advance-take',
      element: <AdvanceAmount />,
    },

    // {
    //   path: '/app/productpurchasing',
    //   element: <ProductPurchasing />,
    // },

    // Client Routes
    {
      path: '/app/client-list',
      element: <ClientList />,
    },
    {
      path: '/app/client-detail/:id',
      element: <ClientDetail />,
    },

    // Employee Routes
    {
      path: '/app/employee-list',
      element: <EmployeeList />,
    },
    {
      path: '/app/employee-detail/:id',
      element: <EmployeeDetail />,
    },

    // Vendor Routes
    {
      path: '/app/vendor-list',
      element: <VendorList />,
    },

    {
      path: '/app/vendor-detail/:id',
      element: <VendorDetail />,
    },
    // Product Stock
    {
      path: '/app/products',
      element: <ProductStock />,
    },
    {
      path: '/product/product-details/:id',
      element: <ProductDetails />,
    },
    // Material Routes
    {
      path: '/app/material',
      element: <MaterialStock />,
    },
    {
      path: '/app/add-material',
      element: <AddEditMaterial />,
    },
    {
      path: '/material/material-details/:id',
      element: <MaterialDetail />,
    },

    // Forms Layout
    {
      path: '/forms/layouts/action-bar',
      element: <FrmLayoutActionBar />,
    },
    {
      path: '/forms/layouts/sticky-action-bar',
      element: <FrmLayoutStickyActionBar />,
    },

    {
      path: '/forms/frm-autocomplete',
      element: <FrmAutocomplete />,
    },
    {
      path: '/forms/frm-mask',
      element: <FrmMask />,
    },
    {
      path: '/forms/frm-clipboard',
      element: <FrmClipboard />,
    },
    {
      path: '/forms/frm-recaptcha',
      element: <FrmRecaptcha />,
    },
    {
      path: '/forms/frm-wysiwug',
      element: <FrmWysiwugEditor />,
    },
    {
      path: '/forms/frm-modal',
      element: <FrmModal />,
    },
    {
      path: '/forms/frm-tooltip',
      element: <FrmTooltip />,
    },

    {
      path: '/tables/tbl-basic',
      element: <TableBasic />,
    },
    {
      path: '/tables/tbl-dense',
      element: <TableDense />,
    },
    {
      path: '/tables/tbl-enhanced',
      element: <TableEnhanced />,
    },
    {
      path: '/tables/tbl-data',
      element: <TableData />,
    },
    {
      path: '/tables/tbl-customized',
      element: <TableCustomized />,
    },
    {
      path: '/tables/tbl-sticky-header',
      element: <TableStickyHead />,
    },
    {
      path: '/tables/tbl-collapse',
      element: <TableCollapsible />,
    },

    {
      path: '/chart/apexchart',
      element: <ChartApexchart />,
    },
    {
      path: '/forms/forms-validation',
      element: <FrmFormsValidation />,
    },
    {
      path: '/forms/forms-wizard',
      element: <FrmFormsWizard />,
    },

    {
      path: '/basic/accordion',
      element: <BasicUIAccordion />,
    },
    {
      path: '/basic/avatar',
      element: <BasicUIAvatar />,
    },
    {
      path: '/basic/badges',
      element: <BasicUIBadges />,
    },
    {
      path: '/basic/breadcrumb',
      element: <BasicUIBreadcrumb />,
    },
    {
      path: '/basic/cards',
      element: <BasicUICards />,
    },
    {
      path: '/basic/chip',
      element: <BasicUIChip />,
    },
    {
      path: '/basic/list',
      element: <BasicUIList />,
    },
    {
      path: '/basic/tabs',
      element: <BasicUITabs />,
    },

    {
      path: '/advance/alert',
      element: <AdvanceUIAlert />,
    },
    {
      path: '/advance/dialog',
      element: <AdvanceUIDialog />,
    },
    {
      path: '/advance/pagination',
      element: <AdvanceUIPagination />,
    },
    {
      path: '/advance/progress',
      element: <AdvanceUIProgress />,
    },
    {
      path: '/advance/rating',
      element: <AdvanceUIRating />,
    },
    {
      path: '/advance/snackbar',
      element: <AdvanceUISnackbar />,
    },
    {
      path: '/advance/skeleton',
      element: <AdvanceUISkeleton />,
    },
    {
      path: '/advance/speeddial',
      element: <AdvanceUISpeeddial />,
    },
    {
      path: '/advance/timeline',
      element: <AdvanceUITimeline />,
    },
    {
      path: '/advance/toggle-button',
      element: <AdvanceUIToggleButton />,
    },
    {
      path: '/advance/treeview',
      element: <AdvanceUITreeview />,
    },

    {
      path: '/pages/price/price1',
      element: <PagesPrice1 />,
    },
    {
      path: '/pages/price/price2',
      element: <PagesPrice2 />,
    },

    {
      path: '/utils/util-typography',
      element: <UtilsTypography />,
    },
    {
      path: '/utils/util-color',
      element: <UtilsColor />,
    },
    {
      path: '/utils/util-shadow',
      element: <UtilsShadow />,
    },
    {
      path: '/icons/tabler-icons',
      element: <UtilsTablerIcons />,
    },
    {
      path: '/icons/material-icons',
      element: <UtilsMaterialIcons />,
    },
    {
      path: '/utils/util-animation',
      element: <UtilsAnimation />,
    },
    {
      path: '/utils/util-grid',
      element: <UtilsGrid />,
    },
    {
      path: '/sample-page',
      element: <SamplePage />,
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />,
    },
    {
      path: '/dashboard/analytics',
      element: <DashboardAnalytics />,
    },

    // Admin-Routes
    {
      path: '/app/product-category-list',
      element: <ProductCategory />,
    },

    {
      path: '/app/material-category-list',
      element: <MaterialCategory />,
    },

    {
      path: '/app/designation-list',
      element: <Designation />,
    },

    {
      path: '/app/production-status-list',
      element: <ProductionStatus />,
    },

    {
      path: '/material/consumption/list',
      element: <MaterialConsumption />,
    },

    {
      path: '/app/task',
      element: <PreviousTask />,
    },

    {
      path: '/app/transport-status',
      element: <Transport />,
    },
  ],
};

export default PrivateRoutes;
