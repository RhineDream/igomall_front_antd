import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Input, Popover } from 'antd';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const fieldLabels = {
  siteName: '网站名称',
  siteUrl: '网站网址',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  pushAccessKeyId: 'pushAccessKeyId',
  pushAccessKeySecret: 'pushAccessKeySecret',
  pushEndpoint: 'pushEndpoint',
  pushRoleArn: 'pushRoleArn',
  pushServer: 'pushServer',
  pushAppName: 'pushAppName',
  pushDomain: 'pushDomain',
  pushAppId: 'pushAppId',
  smsUser: '用户名',
  smsPassword: '密码',
  smsUrl: '接口地址',
  androidAppKey: 'androidAppKey',
  androidAppMasterSecret: 'androidAppMasterSecret',
  iosAppKey: 'iosAppKey',
  iosAppMasterSecret: 'iosAppMasterSecret',
  bfwChannelId: 'bfwChannelId',
  bfwTemplateId: 'bfwTemplateId',
  bfwNewsType: 'bfwNewsType',
  bfwOrgState: 'bfwOrgState',
  bfwNewState: 'bfwNewState',
  bfwSourceType: 'bfwSourceType',
  bfwUsername: 'bfwUsername',
  bfwPassword: 'bfwPassword',
  uploadUrl: 'uploadUrl',

  oAurl: 'oAurl',
  oAUsername: 'oAUsername',
  oAPassword: 'oAPassword',
  oAThirdparty: 'oAThirdparty',
  oAThirdpartyBackUrl: 'oAThirdpartyBackUrl',
};

@connect(({ setting1, loading }) => ({
  setting1,
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting1/edit',
    });
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'setting1/update',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      setting1: { data = {} },
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper wrapperClassName={styles.advancedForm} hiddenBreadcrumb>
        <Card title="基本设置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.siteName}>
                  {getFieldDecorator('siteName', {
                    initialValue: data.siteName || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.siteUrl}>
                  {getFieldDecorator('siteUrl', {
                    initialValue: data.siteUrl || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(<Input placeholder="请输入网站名称" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator('approver', {
                    rules: [{ required: true, message: '请选择审批员' }],
                  })(<Input placeholder="请输入网站名称" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator('dateRange', {
                    rules: [{ required: true, message: '请选择生效日期' }],
                  })(<Input placeholder="请输入网站名称" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择仓库类型' }],
                  })(<Input placeholder="请输入网站名称" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="音/视频转码配置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.pushAccessKeyId}>
                  {getFieldDecorator('pushAccessKeyId', {
                    initialValue: data.pushAccessKeyId || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.pushAccessKeySecret}>
                  {getFieldDecorator('pushAccessKeySecret', {
                    initialValue: data.pushAccessKeySecret || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.pushEndpoint}>
                  {getFieldDecorator('pushEndpoint', {
                    initialValue: data.pushEndpoint || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.pushRoleArn}>
                  {getFieldDecorator('pushRoleArn', {
                    initialValue: data.pushRoleArn || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.pushServer}>
                  {getFieldDecorator('pushServer', {
                    initialValue: data.pushServer || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.pushAppName}>
                  {getFieldDecorator('pushAppName', {
                    initialValue: data.pushAppName || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.pushDomain}>
                  {getFieldDecorator('pushDomain', {
                    initialValue: data.pushDomain || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.pushAppId}>
                  {getFieldDecorator('pushAppId', {
                    initialValue: data.pushAppId || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="短信配置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.smsUser}>
                  {getFieldDecorator('smsUser', {
                    initialValue: data.smsUser || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.smsPassword}>
                  {getFieldDecorator('smsPassword', {
                    initialValue: data.smsPassword || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.smsUrl}>
                  {getFieldDecorator('smsUrl', {
                    initialValue: data.smsUrl || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="App配置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.androidAppKey}>
                  {getFieldDecorator('androidAppKey', {
                    initialValue: data.androidAppKey || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.androidAppMasterSecret}>
                  {getFieldDecorator('androidAppMasterSecret', {
                    initialValue: data.androidAppMasterSecret || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.iosAppKey}>
                  {getFieldDecorator('iosAppKey', {
                    initialValue: data.iosAppKey || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.iosAppMasterSecret}>
                  {getFieldDecorator('iosAppMasterSecret', {
                    initialValue: data.iosAppMasterSecret || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="北方网配置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.bfwChannelId}>
                  {getFieldDecorator('bfwChannelId', {
                    initialValue: data.bfwChannelId || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.bfwTemplateId}>
                  {getFieldDecorator('bfwTemplateId', {
                    initialValue: data.bfwTemplateId || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.bfwNewsType}>
                  {getFieldDecorator('bfwNewsType', {
                    initialValue: data.bfwNewsType || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.bfwOrgState}>
                  {getFieldDecorator('bfwOrgState', {
                    initialValue: data.bfwOrgState || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.bfwNewState}>
                  {getFieldDecorator('bfwNewState', {
                    initialValue: data.bfwNewState || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.bfwSourceType}>
                  {getFieldDecorator('bfwSourceType', {
                    initialValue: data.bfwSourceType || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.bfwUsername}>
                  {getFieldDecorator('bfwUsername', {
                    initialValue: data.bfwUsername || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.bfwPassword}>
                  {getFieldDecorator('bfwPassword', {
                    initialValue: data.bfwPassword || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="文件上传配置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.uploadUrl}>
                  {getFieldDecorator('uploadUrl', {
                    initialValue: data.uploadUrl || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.deleteUrl}>
                  {getFieldDecorator('deleteUrl', {
                    initialValue: data.deleteUrl || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="OA配置" className={styles.card} bordered={false}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.oAurl}>
                  {getFieldDecorator('oAurl', {
                    initialValue: data.oAurl || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.oAUsername}>
                  {getFieldDecorator('oAUsername', {
                    initialValue: data.oAUsername || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.oAPassword}>
                  {getFieldDecorator('oAPassword', {
                    initialValue: data.oAPassword || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.oAThirdparty}>
                  {getFieldDecorator('oAThirdparty', {
                    initialValue: data.oAThirdparty || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.oAThirdpartyBackUrl}>
                  {getFieldDecorator('oAThirdpartyBackUrl', {
                    initialValue: data.oAThirdpartyBackUrl || '',
                    rules: [{ required: true, message: '必填' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedForm;
