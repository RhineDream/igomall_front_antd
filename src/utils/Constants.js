import React from 'react';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

const Constants = {
  baseUrl: 'http://localhost:8080/api',
  siteName: '网站名称',
  description: 'Ant Design 是西湖区最具影响力的 Web 设计规范',
  copyright: ' 2019 蚂蚁金服体验技术部出品',
  loginPage: {
    links: [
      {
        key: 'help',
        title: formatMessage({ id: 'layout.user.link.help' }),
        href: '',
      },
      {
        key: 'privacy',
        title: formatMessage({ id: 'layout.user.link.privacy' }),
        href: '',
      },
      {
        key: 'terms',
        title: formatMessage({ id: 'layout.user.link.terms' }),
        href: '',
      },
    ],
  },
  footer: {
    links: [
      {
        key: 'Pro 首页',
        title: 'Pro 首页1234',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ],
  },
};

export default Constants;
