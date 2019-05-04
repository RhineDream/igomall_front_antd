import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { List } from 'antd';
import { connect } from 'dva';
import ChangePwd from './ChangePwd';
import { formatStr } from '../../../utils/utils';
import ChangeMobile from './ChangeMobile';
// import { getTimeDistance } from '@/utils/utils';

const passwordStrength = {
  strong: (
    <font className="strong">
      <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
      Weak
    </font>
  ),
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class SecurityView extends Component {
  state = {
    changePwdModalVisible: false,
    changeMobileModalVisible: false,
  };

  changePwd = e => {
    e.preventDefault();
    this.setState({
      changePwdModalVisible: true,
      changeMobileModalVisible: false,
    });
  };

  changeMobile = e => {
    e.preventDefault();
    this.setState({
      changePwdModalVisible: false,
      changeMobileModalVisible: true,
    });
  };

  onCancel = () => {
    this.setState({
      changePwdModalVisible: false,
      changeMobileModalVisible: false,
    });
    window.location.reload(true);
  };

  getData = currentUser => [
    {
      title: formatMessage({ id: 'app.settings.security.password' }, {}),
      description: (
        <Fragment>
          {formatMessage({ id: 'app.settings.security.password-description' })}：
          {passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a onClick={this.changePwd}>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'app.settings.security.phone' }, {}),
      description: `${formatMessage(
        { id: 'app.settings.security.phone-description' },
        {}
      )}：${formatStr(currentUser.mobile, 3, 4)}`,
      actions: [
        <a onClick={this.changeMobile}>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'app.settings.security.question' }, {}),
      description: formatMessage({ id: 'app.settings.security.question-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'app.settings.security.email' }, {}),
      description: `${formatMessage(
        { id: 'app.settings.security.email-description' },
        {}
      )}：ant***sign.com`,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage({ id: 'app.settings.security.mfa' }, {}),
      description: formatMessage({ id: 'app.settings.security.mfa-description' }, {}),
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    const { changePwdModalVisible, changeMobileModalVisible } = this.state;
    const { currentUser } = this.props;
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData(currentUser)}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <ChangePwd visible={changePwdModalVisible} onCancel={this.onCancel} />
        <ChangeMobile visible={changeMobileModalVisible} onCancel={this.onCancel} />
      </Fragment>
    );
  }
}

export default SecurityView;
