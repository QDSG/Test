/*
 * @Author: gc
 * @Date: 2021-02-07 14:18:13
 */
import React from 'react';
import { InputNumber, Button, message } from 'antd';

class DigitalBomb extends React.Component {
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
            mes: '',
        }
    }

    componentDidMount() {
        // this.randomInt()
    }
    setLimits(min: Number, max: Number) {
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
                mes: str,
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
        } else {
			message.error("输入有误，请按规定重新输入！", [1]);
			this.setState({
				number: undefined,
			})
		}
    }
    handleChange(e: Number | String, key1: String, key2: String ) {
        let obj = {};
        if(key2) {
            obj[key1] = this.state[key1];
            obj[key1][key2] = e;
            this.setState({
                [key1]: obj[key1]
            }, function () {
                console.log(this.state);
            });
        }else{
            this.setState({
                [key1]: e - 0,
            }, function () {
                console.log(this.state);
            });
        }
    }
    showPlayPro() {
        const { number, limits: { max ,min } ,flag, preN } = this.state;
        const { pre, next } = preN;
        let str = '输入数字的范围有误，请输入' + min +' ~ ' + max + '的数字(不含' + max + ')';
        if ( number < min || number >= max) {
			message.error(str, [1]);
        }
        let obj = preN;
        if( number > min && number < max) {
            if(number < flag) {
                obj.pre = number;
				str = '请输入' + number +' ~ ' + next + '的数字';
				this.setState({
                    limits: {
                        max,
                        min: number,
                    },
				})
            } else if (number > flag){
                obj.next = number;
                str = '请输入' + pre +' ~ ' + number + '的数字';
				this.setState({
                    limits: {
                        max: number,
                        min,
                    },
				})
            } else {
                str = '恭喜你答对了，数字是' + flag;
                this.pageChange('playE');//切换到惩罚环节
            }
        }
        this.setState({
            preN: obj,
            mes : str
        })
    }

    randomInt() {
        console.log(this.state.limits)
        const { max ,min } = this.state.limits;
        const num = parseInt(Math.random()*max+min, 10);
        this.setState({
            flag: num,
        }, function() {
            console.log(this.state);
        })
    }
    pageChange(key: Number | String){
        let obj = {
            setM: false,//初始化最大值最小值界面
            setFlag: false,//设置待猜数字环节
            playS: false,//游戏开始界面
            playE: false,//游戏结束惩罚环节
        }
        obj[key] = true;
        this.setState({
            changePage: obj,
        },function () {
            console.log(this.state);
        });
    }

    render(){
        const { changePage ,limits, number, flag, mes } = this.state;
        return (
            <div>
                { changePage.setM && (
                    <div>
                        <label>数字范围：</label>
                        <InputNumber value={ limits.min || '' } onChange={ (e) => this.handleChange(e, 'limits', 'min') }></InputNumber> ~
                        <InputNumber value={ limits.max || '' } onChange={ (e) => this.handleChange(e, 'limits', 'max') }></InputNumber>
                        <Button onClick={  () => this.setLimits( limits.min, limits.max ) }>确定</Button>
                        <Button onClick={  () => this.setLimits( 0, 100 ) }>0~100</Button>
                        <Button onClick={  () => this.setLimits( 0, 200 ) }>0~200</Button>
                        {/* <input value={ limits.min || '' } onChange={ (e) => this.handleChange(e, 'limits', 'min') }></input> ~
                        <input value={ limits.max || '' } onChange={ (e) => this.handleChange(e, 'limits', 'max') }></input>
                        <button onClick={  () => this.setLimits( limits.min, limits.max ) }>确定</button>
                        <button onClick={  () => this.setLimits( 0, 100 ) }>0~100</button>
                        <button onClick={  () => this.setLimits( 0, 200 ) }>0~200</button> */}
                    </div> 
                )}
                { changePage.setFlag && (
                    <div>
                        <InputNumber value={ flag || '' } onChange={ (e) => this.handleChange(e, 'flag') }></InputNumber>
                        <Button onClick={  () => this.setFlagNum() }>确定</Button>
                        <Button onClick={  () => this.randomInt()}>随机数</Button>
                        {/* <input value={ flag || '' } onChange={ (e) => this.handleChange(e, 'flag') }></input>
                        <button onClick={ this.setFlagNum }>确定</button>
                        <button onClick={ this.randomInt}>随机数</button> */}
                        <p>{ mes }</p>
                    </div>
                )}
                { changePage.playS && (
                    <div>
                        <InputNumber value={ number || '' } onChange={ (e) => this.handleChange(e, 'number') }></InputNumber>
                        <Button onClick={  () => this.showPlayPro() }>确定</Button>
                        {/* <input value={ number || '' } onChange={ (e) => this.handleChange(e, 'number') }></input>
                        <button onClick={ this.showPlayPro }>确定</button> */}
                        <p>{ mes }</p>
                    </div>
                )}
                { changePage.playE && (
                    <div>
                        <p>{ mes }</p>
                    </div>
                )}
            </div>
        )
    }
}
export default DigitalBomb;
