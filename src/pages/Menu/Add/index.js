import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, message, TreeSelect } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

@connect(({ menu1, loading }) => ({
  menu1,
  submitting: loading.effects['menu1/edit'],
}))
@Form.create()
class BasicForms extends PureComponent {
  componentDidMount() {
    const {
      match: { params = {} },
      dispatch,
    } = this.props;

    dispatch({
      type: 'menu1/edit',
      payload: params,
    });

    dispatch({
      type: 'menu1/list',
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'menu1/save',
          payload: values,
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              router.push('/menu');
            } else {
              message.error(response.content);
            }
          },
        });
      }
    });
  };

  renderMenuTree = (data, disabled) => {
    const {
      menu1: { values = {} },
    } = this.props;
    let disable1 = disabled;
    return data.map(item => {
      if (values && item.id === values.id) {
        disable1 = true;
      }
      if (item.children && item.children.length > 0) {
        return (
          <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id} disabled={disable1}>
            {this.renderMenuTree(item.children, disable1)}
          </TreeSelect.TreeNode>
        );
      }
      return (
        <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id} disabled={disable1} />
      );
    });
  };

  render() {
    const {
      submitting,
      menu1: { values = {}, data = [] },
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
            <FormItem {...formItemLayout} label="上级菜单">
              {getFieldDecorator('parentId', {
                initialValue: values.parentId || '',
              })(
                <TreeSelect treeDefaultExpandAll showSearch allowClear filterTreeNode>
                  {this.renderMenuTree(data, false)}
                </TreeSelect>
              )}
            </FormItem>
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
            <FormItem {...formItemLayout} label="序号">
              {getFieldDecorator('order', {
                initialValue: values.order || '',
                rules: [
                  {
                    pattern: /^(\d+)$/,
                    message: '只能输入正整数',
                  },
                ],
              })(<Input autoComplete="off" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.save" />
              </Button>
              <Link to="/menu">
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
