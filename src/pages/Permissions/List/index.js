import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import { Form, Button, Divider, Card, message, Modal } from 'antd';
import StandardTable from '@/components/StandardTable2';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import Authorized from '../../../components/Authorized/Authorized';
import Exception403 from '../../Exception/403';

/* eslint react/no-multi-comp:0 */
@connect(({ permissions, loading }) => ({
  permissions,
  loading: loading.models.permissions,
}))
@Form.create()
class List extends PureComponent {
  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: '菜单',
      dataIndex: 'menuName',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '权限',
      dataIndex: 'url',
    },
    {
      title: '方法',
      dataIndex: 'method',
      width: 100,
    },
    {
      title: '序号',
      width: 60,
      dataIndex: 'order',
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      width: 180,
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      width: 120,
      render: (text, record) => (
        <Fragment>
          <Link to={`/permissions/edit/${record.id}`}>修改</Link>
          <Divider type="vertical" />
          <a onClick={e => this.remove(e, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'permissions/list',
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  remove = (e, record) => {
    const root = this;
    const { selectedRows } = this.state;
    const ids = record.id || selectedRows.map(item => item.id).join(',');

    if (!ids) {
      message.error('请选择需要删除的数据');
      return;
    }

    e.preventDefault();
    const { dispatch } = root.props;
    Modal.confirm({
      title: '警告',
      content: '确定删除该条记录?',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        dispatch({
          type: 'permissions/remove',
          payload: {
            ids,
          },
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              root.componentDidMount();
            } else {
              message.error(response.content);
            }
          },
        });
      },
    });
  };

  render() {
    const {
      permissions: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Authorized authority={['admin:permissions:add']} noMatch={Exception403}>
                <Link to="/permissions/add">
                  <Button icon="plus" type="primary">
                    添加
                  </Button>
                </Link>
              </Authorized>
              <Button
                onClick={e => this.remove(e, {})}
                icon="delete"
                type="danger"
                disabled={selectedRows.length === 0}
              >
                删除
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              bordered
              size="small"
              columns={this.columns}
              defaultExpandAllRows
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default List;
