import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { connect } from 'dva';

@connect(({ user }) => ({
  user,
}))
class ChangePwd extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onCancel } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/changePwd',
          payload: values,
          callback: response => {
            if (response.type === 'success') {
              onCancel();
              message.success(response.content);
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
      form: { getFieldDecorator },
      visible,
      onCancel,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <Modal
        title="修改登陆密码"
        visible={visible}
        destroyOnClose
        maskClosable={false}
        onOk={this.handleSubmit}
        onCancel={onCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="原始密码">
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: '必填' }],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '必填' }],
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="重复新密码">
            {getFieldDecorator('rePassword', {
              rules: [
                { required: true, message: '必填' },
                {
                  validator: this.checkPassword,
                },
              ],
            })(<Input type="password" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ChangePwd);
