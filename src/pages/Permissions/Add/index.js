import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Button, Card, message, TreeSelect } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

const menuList = [];

function listMenu(menus) {
  for (let i = 0; i < menus.length; i += 1) {
    const menu = menus[i];
    menuList.push(menu);
    if (menu.children && menu.children.length > 0) {
      return listMenu(menu.children);
    }
  }

  return menuList;
}

@connect(({ menu1, permissions, loading }) => ({
  menu1,
  permissions,
  submitting: loading.effects['permissions/edit'],
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    permissions: [],
  };

  componentDidMount() {
    const {
      match: { params = {} },
      dispatch,
    } = this.props;

    dispatch({
      type: 'permissions/edit',
      payload: params,
    });

    dispatch({
      type: 'menu1/list',
      callback: response => {
        listMenu(response);
      },
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'permissions/save',
          payload: values,
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              router.push('/permissions');
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

  selectMenu = value => {
    if (!value) {
      this.setState({
        permissions: [],
      });
    }
    const selectMenu = menuList.filter(item => item.id === value)[0];
    this.setState({
      permissions: selectMenu.permissionses,
    });
  };

  renderPermissionsTree = data => {
    return data.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id}>
            {this.renderPermissionsTree(item.children)}
          </TreeSelect.TreeNode>
        );
      }
      return <TreeSelect.TreeNode value={item.id} title={item.name} key={item.id} />;
    });
  };

  render() {
    const {
      submitting,
      permissions: { values = {} },
      menu1: { data = [] },
    } = this.props;
    const {
      match: { params = {} },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { permissions } = this.state;

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
            {params.id ? (
              <FormItem {...formItemLayout} label="菜单">
                {getFieldDecorator('menuId', {
                  initialValue: values.menuId || '',
                })(<Input type="hidden" />)}
                <span>{values.menuName}</span>
              </FormItem>
            ) : (
              <FormItem {...formItemLayout} label="菜单">
                {getFieldDecorator('menuId', {
                  initialValue: values.menuId || '',
                })(
                  <TreeSelect
                    treeDefaultExpandAll
                    showSearch
                    allowClear
                    filterTreeNode
                    onSelect={this.selectMenu}
                  >
                    {this.renderMenuTree(data, false)}
                  </TreeSelect>
                )}
              </FormItem>
            )}

            {params.id ? (
              <FormItem {...formItemLayout} label="上级权限">
                {getFieldDecorator('parentId', {
                  initialValue: values.parentId || '',
                })(<Input type="hidden" />)}
                <span>{values.parentName}</span>
              </FormItem>
            ) : (
              <FormItem {...formItemLayout} label="上级权限">
                {getFieldDecorator('parentId', {
                  initialValue: values.parentId || '',
                })(
                  <TreeSelect treeDefaultExpandAll showSearch allowClear filterTreeNode>
                    {this.renderPermissionsTree(permissions)}
                  </TreeSelect>
                )}
              </FormItem>
            )}

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
            <FormItem {...formItemLayout} label="方法">
              {getFieldDecorator('method', {
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
              <Link to="/permissions">
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
