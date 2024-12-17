import {
  BookOutlined,
  FundViewOutlined,
  PieChartOutlined,
  ProductOutlined,
  TeamOutlined,
} from '@ant-design/icons';

export const MenuItems: any = [
  {
    label: 'Overview',
    key: 0,
    url: '/',
    icon: <PieChartOutlined />,
  },
  {
    label: 'User management',
    key: 1,
    url: '/user-management',
    icon: <TeamOutlined />,
  },
  {
    label: 'Product management',
    key: 2,
    url: '/product-management',
    icon: <ProductOutlined />,
    children: [
      {
        label: 'Product',
        key: 20,
        url: '/product',
      },
      {
        label: 'Category',
        key: 21,
        url: '/category',
      },
    ],
  },
  {
    label: 'Order management',
    key: 3,
    url: '/order-management',
    icon: <BookOutlined />,
    children: [
      {
        label: 'Overview',
        key: 30,
        url: '/overview',
      },
      {
        label: 'Order by users',
        key: 31,
        url: '/order-by-user',
      },
      {
        label: 'Order by products',
        key: 32,
        url: '/order-by-product',
      },
      {
        label: 'All orders',
        key: 39,
        url: '/all',
      },
    ],
  },
  {
    label: 'Revenue Management',
    key: 4,
    url: '/revenue-management',
    icon: <FundViewOutlined />,
  },
];

export const getMenuUrlByKeyPath = (keyPath: string[]) => {
  let items = MenuItems;
  let path = '';
  while (keyPath.length > 1) {
    const key = keyPath.pop() || '';

    const item = items.find((item: any) => item.key === +key);
    path += item.url;
    items = item.children;
  }

  return path + items.find((item: any) => item.key === +keyPath[0]).url;
};
