// @flow
import React, {Component} from 'react';
import {Modal, Menu, Button} from 'antd';
import styled from 'styled-components';

import TaskTable from './component/TaskTable';
import TaskCreate from './component/TaskCreate';
import TaskIM from './component/TaskIM';

import {observer, inject} from 'mobx-react';
import unLoginRedirect from '../../component/hoc/unlogin-redirect';

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;

const TaskButton = styled(Button)`
  float: right;
  clear: both;
  margin-bottom: 10px;
`;

const MenuStyled = styled(Menu)`
  background-color: lightgray; 
  clear: both;
`;

type PropType = {
    isLogin: boolean,
    nav: Object,
}

@inject(stores => ({
    isLogin: stores.user.isLogin,
    nav: stores.nav,
}))

@unLoginRedirect('/login')
@observer
class Task extends Component<PropType> {
    constructor() {
        super();
        this.state = {
            taskCreateVisible: false,
            currentSelect: 'working',
        };
    }

    componentWillMount() {
        this.props.nav.setSelectedKey('nav_1');
    }

    handleMenuClick = (item) => {
        switch (item.key) {
            case "1":
                this.setState({currentSelect: 'working'});
                break;
            case "2":
                this.setState({currentSelect: 'done'});
                break;
        }
    };

    showTaskCreate = () => {
        this.setState({
            taskCreateVisible: true,
        });
    };

    hideTaskCreate = () => {
        this.setState({
            taskCreateVisible: false,
        });
    };

    render() {
        return (
            <Container>
                <div>
                    <TaskButton type="primary" onClick={this.showTaskCreate}>
                        +发布任务
                    </TaskButton>
                </div>
                <div>
                    <MenuStyled mode="horizontal" defaultSelectedKeys={["1"]} onClick={this.handleMenuClick}>
                        <Menu.Item key="1">正在进行</Menu.Item>
                        <Menu.Item key="2">已完成</Menu.Item>
                    </MenuStyled>

                    <TaskTable type={this.state.currentSelect}/>

                    <Modal
                        title="发布任务"
                        width={960}
                        visible={this.state.taskCreateVisible}
                        okText="发布"
                        onOk={this.hideTaskCreate}
                        cancelText="取消"
                        onCancel={this.hideTaskCreate}
                    >
                        <TaskCreate/>
                    </Modal>

                    <TaskIM/>
                </div>
            </Container>
        );
    }
}

export default Task;
