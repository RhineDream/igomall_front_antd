import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import { Row, Col, Form, Input, Icon, Button, DatePicker, Divider, Card } from 'antd';
import StandardTable from '@/components/StandardTable1';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';
import { formatRangeDate } from '../../../utils/utils';

const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))
@Form.create()
class List extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  columns = [
    {
      title: '名称',
      width: 100,
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '是否内置',
      dataIndex: 'isSystem',
      width: 80,
      render: text =>
        text ? (
          <Icon type="check" style={{ color: 'red' }} />
        ) : (
          <Icon type="close" style={{ color: 'green' }} />
        ),
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
          <Link to={`/role/edit/${record.id}`}>修改</Link>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/list',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.orderProperty = sorter.field;
      params.orderDirection = sorter.order === 'ascend' ? 'asc' : 'desc';
    }

    dispatch({
      type: 'role/list',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'role/list',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { beginDate = '', endDate = '' } = formatRangeDate(fieldsValue.rangeDate);
      const values = {
        ...fieldsValue,
        beginDate,
        endDate,
      };
      delete values.rangeDate;
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'role/list',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="添加时间">
              {getFieldDecorator('rangeDate')(<DatePicker.RangePicker />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="名称">{getFieldDecorator('name')(<Input />)}</FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      role: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    console.log(window.innerHeight);
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Link to="/role/add">
                <Button icon="plus" type="primary">
                  添加
                </Button>
              </Link>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              bordered
              size="small"
              scroll={{ y: window.innerHeight - 625 }}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default List;
