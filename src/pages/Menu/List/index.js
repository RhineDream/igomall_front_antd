import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import { Form, Button, Divider, Card, message, Modal } from 'antd';
import StandardTable from '@/components/StandardTable2';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

/* eslint react/no-multi-comp:0 */
@connect(({ menu1, loading }) => ({
  menu1,
  loading: loading.models.menu1,
}))
@Form.create()
class List extends PureComponent {
  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
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
          <Link to={`/menu/edit/${record.id}`}>修改</Link>
          <Divider type="vertical" />
          <a onClick={e => this.remove(e, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu1/list',
    });
  }

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
          type: 'menu1/remove',
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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render() {
    const {
      menu1: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Link to="/menu/add">
                <Button icon="plus" type="primary">
                  添加
                </Button>
              </Link>
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
