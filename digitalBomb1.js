
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
    pageChange(key){
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
        const { changePage ,limits, number, flag, message } = this.state;
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
                        <Button onClick={  () => this.setFlagNum }>确定</Button>
                        <Button onClick={  () => this.randomInt}>随机数</Button>
                        {/* <input value={ flag || '' } onChange={ (e) => this.handleChange(e, 'flag') }></input>
                        <button onClick={ this.setFlagNum }>确定</button>
                        <button onClick={ this.randomInt}>随机数</button> */}
                        <p>{ message }</p>
                    </div>
                )}
                { changePage.playS && (
                    <div>
                        <InputNumber value={ number || '' } onChange={ (e) => this.handleChange(e, 'number') }></InputNumber>
                        <Button onClick={  () => this.showPlayPro }>确定</Button>
                        {/* <input value={ number || '' } onChange={ (e) => this.handleChange(e, 'number') }></input>
                        <button onClick={ this.showPlayPro }>确定</button> */}
                        <p>{ message }</p>
                    </div>
                )}
                { changePage.playE && (
                    <div>
                        <p>{ message }</p>
                    </div>
                )}
            </div>
        )
    }
}
export default Test;
