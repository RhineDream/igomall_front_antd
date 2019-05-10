import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Card, message, Checkbox, Row, Col } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

@connect(({ admin, role, loading }) => ({
  admin,
  role,
  submitting: loading.effects['admin/edit'],
}))
@Form.create()
class BasicForms extends PureComponent {
  componentDidMount() {
    const {
      match: { params = {} },
      dispatch,
    } = this.props;

    dispatch({
      type: 'admin/edit',
      payload: params,
    });
    dispatch({
      type: 'role/getAll',
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          ...values,
        };
        params.roleIds = params.roleIds.join(',');
        dispatch({
          type: 'admin/save',
          payload: params,
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              router.push('/admin');
            } else {
              message.error(response.content);
            }
          },
        });
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    const password = form.getFieldValue('password');
    if (value) {
      if (value !== password) {
        callback('两次输入的密码不一致！');
      } else {
        callback();
      }
    } else {
      callback('请再次输入新密码！');
    }
  };

  renderRoles = roles => {
    return roles.map(item => (
      <Col span={8}>
        <Checkbox value={item.id} key={item.id}>
          {item.name}
        </Checkbox>
      </Col>
    ));
  };

  render() {
    const {
      submitting,
      admin: { values = {} },
      role: { roles = [] },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            {getFieldDecorator('id', {
              initialValue: values.id || '',
            })(<Input type="hidden" />)}
            <FormItem {...formItemLayout} label="用户名" help="一旦设置将不允许修改">
              {getFieldDecorator('username', {
                initialValue: values.username || '',
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input disabled={values.id} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: values.name || '',
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </FormItem>
            {values.id ? null : (
              <Fragment>
                <FormItem {...formItemLayout} label="密码">
                  {getFieldDecorator('password', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '必填',
                      },
                    ],
                  })(<Input type="password" autoComplete="new-password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码">
                  {getFieldDecorator('rePassword', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '必填',
                      },
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(<Input type="password" autoComplete="new-password" />)}
                </FormItem>
              </Fragment>
            )}

            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                initialValue: values.email || '',
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                  {
                    type: 'email',
                    message: '邮箱格式不正确',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="部门">
              {getFieldDecorator('department', {
                initialValue: values.department || '',
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input />)}
            </FormItem>
            {values.id ? null : (
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('mobile', {
                  initialValue: values.mobile || '',
                  rules: [
                    {
                      required: true,
                      message: '必填',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            )}

            <FormItem {...formItemLayout} label="设置">
              {getFieldDecorator('isEnabled', {
                valuePropName: 'checked',
                initialValue: values.isEnabled || true,
              })(<Checkbox>是否启用</Checkbox>)}
              {getFieldDecorator('isLocked', {
                valuePropName: 'checked',
                initialValue: values.isLocked || false,
              })(<Checkbox>是否锁定</Checkbox>)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              {getFieldDecorator('roleIds', {
                initialValue: values.roleIds || ['2'],
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={8}>{this.renderRoles(roles)}</Row>
                </Checkbox.Group>
              )}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.save" />
              </Button>
              <Link to="/admin">
                <Button style={{ marginLeft: 8 }}>返回</Button>
              </Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
