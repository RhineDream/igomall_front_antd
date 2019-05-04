import React, { Component } from 'react';
import { Modal, Form, Input, message, Row, Col, Button } from 'antd';
import { connect } from 'dva';

let timer = null;

@connect(({ user }) => ({
  user,
}))
class ChangeMobile extends Component {
  state = {
    sendCodeBtnDisabled: false,
    countDown: 120,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, onCancel } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'user/changeMobile',
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

  sendCode = e => {
    const root = this;
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(['mobile'], (errors, values) => {
      if (!errors) {
        const { countDown } = this.state;
        let countDown1 = countDown;
        root.setState({
          sendCodeBtnDisabled: true,
        });

        if (timer) {
          clearInterval(timer);
          timer = null;
        }

        timer = setInterval(() => {
          if (countDown === 0) {
            clearInterval(timer);
            timer = null;
            root.setState({
              sendCodeBtnDisabled: false,
            });
          }
          countDown1 -= 1;
          root.setState({
            countDown: countDown1,
          });
        }, 1000);

        dispatch({
          type: 'login/getCaptcha',
          payload: {
            mobile: values,
            type: 1,
          },
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
            } else {
              message.error(response.content);
            }
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      onCancel,
    } = this.props;
    const { sendCodeBtnDisabled, countDown } = this.state;
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
        title="修改手机号"
        visible={visible}
        destroyOnClose
        maskClosable={false}
        onOk={this.handleSubmit}
        onCancel={onCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="新手机号">
            {getFieldDecorator('mobile', {
              rules: [
                { required: true, message: '必填' },
                { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="验证码">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码' }],
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button onClick={this.sendCode} disabled={sendCodeBtnDisabled}>
                  {sendCodeBtnDisabled ? `${countDown} S` : '发送验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ChangeMobile);
