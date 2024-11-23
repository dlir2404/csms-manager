import { BookOutlined, FundViewOutlined, PieChartOutlined, ProductOutlined, TeamOutlined } from "@ant-design/icons";

export const MenuItems: any[] = [
    {
        label: 'Overview',
        key: 0,
        url: '/',
        icon: <PieChartOutlined />
    },
    {
        label: 'User management',
        key: 1,
        url: '/user-management',
        icon: <TeamOutlined />
    },
    {
        label: 'Product management',
        key: 2,
        url: '/product-management',
        icon: <ProductOutlined />
    },
    {
        label: 'Order management',
        key: 3,
        url: '/order-management',
        icon: <BookOutlined />
    },
    {
        label: 'Revenue Management',
        key: 4,
        url: '/revenue-management',
        icon: <FundViewOutlined />
    },
]