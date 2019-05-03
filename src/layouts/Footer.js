import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import Constants from '../utils/Constants';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={Constants.footer.links}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> {Constants.copyright}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
