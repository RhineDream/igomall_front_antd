import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, message } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

@connect(({ role, loading }) => ({
  role,
  submitting: loading.effects['role/edit'],
}))
@Form.create()
class BasicForms extends PureComponent {
  componentDidMount() {
    const {
      match: { params = {} },
      dispatch,
    } = this.props;

    dispatch({
      type: 'role/edit',
      payload: params,
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'role/save',
          payload: values,
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              router.push('/role');
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

  render() {
    const {
      submitting,
      role: { values = {} },
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
            <FormItem {...formItemLayout} label="名称">
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
            <FormItem {...formItemLayout} label="描述">
              {getFieldDecorator('description', {
                initialValue: values.description || '',
              })(
                <Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} style={{ resize: 'none' }} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.save" />
              </Button>
              <Link to="/role">
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
