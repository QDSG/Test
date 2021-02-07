
    handleChick() {

    }
    showPlayPro() {
        const { number, limits: { max ,min } ,flag, preN } = this.state;
        const { pre, next } = preN;
        let str = '输入数字的范围有误，请输入' + min +' ~ ' + max + '的数字(不含' + max + ')';
        let obj = preN;
        if( number > min && number < max) {
            if(number < flag) {
                obj.pre = number;
                str = '请输入' + number +' ~ ' + next + '的数字'
            } else if (number > flag){
                obj.next = number;
                str = '请输入' + pre +' ~ ' + number + '的数字'
            } else {
                str = '恭喜你答对了，数字是' + flag;
                this.pageChange('playE');//切换到惩罚环节
            }
        }
        this.setState({
            preN: obj,
            message : str
        })
    }
