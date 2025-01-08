'use client'
import { Layout, Menu, Avatar, Popover, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { httpClient } from '@/libs/api.client'
import { useGetMe } from '@/services/auth.service'
import { ProgressProvider } from '@/components/layouts/HeaderProgress'
import { getMenuUrlByKeyPath, MenuItems } from '@/shared/constants/menu'
import Image from 'next/image'
import React from 'react'

const { Content, Header } = Layout
const Sider = Layout.Sider
const queryClient = new QueryClient()

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetMe(queryClient)
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    if (!isLoading && !data) {
      notification.error({
        placement: 'top',
        message: 'Unauthenticated',
      })
      window.location.href = '/login'
    }
  }, [data, isLoading])

  if (isLoading || !data) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <Image width={80} height={80} src="/images/loading.gif" alt="Loading..." />
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout style={{ height: '100vh' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="text-xl text-white font-bold mr-6">CSMS MANAGER</div>
          <div className="flex-1"></div>
          <Popover
            placement="bottomLeft"
            trigger="click"
            title={data.fullName || data.username}
            content={
              <div className="flex flex-col gap-4 pt-4 border-t-gray-400 border-t">
                <a onClick={() => {}}>View profile</a>
                <a onClick={() => {}}>Change password</a>
                <a
                  onClick={() => {
                    httpClient.setToken('')
                    localStorage.removeItem('act')
                    window.location.href = '/login'
                    notification.success({
                      placement: 'top',
                      message: 'Logout!',
                    })
                  }}
                >
                  Logout
                </a>
              </div>
            }
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </Popover>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              position: 'fixed',
              height: '100vh',
              overflow: 'auto',
              left: 0,
              top: 50, // Adjust for header height
              background: '#fff',
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[
                MenuItems.findIndex((item: any) => item.url === pathName).toString(),
              ]}
              items={MenuItems}
              onSelect={(params) => {
                router.push(getMenuUrlByKeyPath(params.keyPath))
              }}
              style={{ height: '100%', borderRight: 0 }}
            />
          </Sider>
          <Layout style={{ marginLeft: 200, padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                overflow: 'auto',
              }}
            >
              <ProgressProvider>{children}</ProgressProvider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </QueryClientProvider>
  )
}
