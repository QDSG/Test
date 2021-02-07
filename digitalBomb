/*
 * @Author: gc
 * @Date: 2021-02-07 14:18:13
 */
import React from 'react';

class Test extends React.Component {
    constructor(){
        super();
        this.state = {
            changePage: {
                setM: true,//初始化最大值最小值界面
                setFlag: false,//设置待猜数字环节
                playS: false,//游戏开始界面
                playE: false,//游戏结束惩罚环节
            },
            number: undefined,//用户输入的数字
            flag: 0,//待猜的数字
            preN: {
                pre: 0,//上一个猜到的数字
                next: 0,//这次猜到的数字
            },
            limits: {
                max: 0,
                min: 0,
            },
            message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.setLimits = this.setLimits.bind(this);
        this.randomInt = this.randomInt.bind(this);
        this.setFlagNum = this.setFlagNum.bind(this);
        this.showPlayPro = this.showPlayPro.bind(this);
    }

    componentDidMount() {
        // this.randomInt()
    }
