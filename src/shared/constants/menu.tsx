import { BookOutlined, FundViewOutlined, PieChartOutlined, ProductOutlined, TeamOutlined } from "@ant-design/icons";

export const MenuItems: any = [
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
        icon: <ProductOutlined />,
        children: [
            {
                label: 'Product',
                key: 20,
                url: '/product-management/product',
            },
            {
                label: 'Category',
                key: 21,
                url: '/product-management/category',
            }
        ]
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
                url: '/order-management/overview'
            },
            {
                label: 'All orders',
                key: 30,
                url: '/order-management/all'
            }
        ]
    },
    {
        label: 'Revenue Management',
        key: 4,
        url: '/revenue-management',
        icon: <FundViewOutlined />
    },
]


export const getMenuUrlByKeyPath = (keyPath: string[]) => {
    let items = MenuItems
    while (keyPath.length > 1) {
        const key = keyPath.pop() || ''

        items = items.find((item: any) => item.key === +key).children;
    }
    return items.find((item: any) => item.key === +keyPath[0]).url
}