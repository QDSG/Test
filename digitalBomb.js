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
    setLimits(min, max) {
        if( max > min ){
            let str = '请输入' + min +' ~ ' + max + '的数字(不含' + max + ')';
            this.setState({
                limits: {
                    max: max,
                    min: min,
                },
                preN: {
                    pre: min,//上一个猜到的数字
                    next: max,//这次猜到的数字
                },
                message: str,
            }, function() {
                console.log(this.state);
            })
            this.pageChange('setFlag');//切换到设置数字环节
        }else{
            alert('请输入正确格式：例如 1~100');
        }
    }
    setFlagNum() {
        const { flag, limits: { max ,min } }  = this.state;
        if(flag < max && flag > min){
            this.pageChange('playS');//切换到数字猜测环节
        }
    }
    handleChange(e, key1, key2 ) {
        let obj = {};
        if(key2) {
            obj[key1] = this.state[key1];
            obj[key1][key2] = e.target.value;
            this.setState({
                [key1]: obj[key1]
            }, function () {
                console.log(this.state);
            });
        }else{
            this.setState({
                [key1]: e.target.value - 0,
            }, function () {
                console.log(this.state);
            });
        }
    }
