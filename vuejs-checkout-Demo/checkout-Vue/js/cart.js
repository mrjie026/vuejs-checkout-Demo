/**
 * Created by JBook on 2017/4/11.
 */
var vm = new Vue({
    el:"#app",
    data:{
        //数据
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        totalPrice:0,
        delFlag:false,
        curProduct:''
    },
    filters: {
        //局部过滤器
        formatMoney : function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {
        //构造完成的方法
        this.cartView();
    },
    methods:{
        //事件绑定 定义
        cartView: function () {
            // var _this = this;
            // this.$http.get("data/cart.json").then(function(resp){
            //     _this.productList = resp.body.result.list;
            //     _this.totalMoney = resp.body.result.totalMoney;
            // });

            // es6 箭头函数
            let _this = this;
            this.$http.get("data/cart.json").then(resp=>{
                this.productList = resp.body.result.list;
                //this.totalMoney = resp.body.result.totalMoney;
            });
        },
        changeMoney: function (product,way) {
            if(way > 0){
                product.productQuentity++;
            }else{
                product.productQuentity--;
                if(product.productQuentity<1){
                    product.productQuentity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if(typeof item.checked == 'undefined'){
                //添加不存在的属性
                // Vue.set(item,"checked",true);
                //局部用法
                this.$set(item,"checked",true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            var _this = this;

            this.productList.forEach(function(item,index){
                if(typeof item.checked == 'undefined'){
                    _this.$set(item,"checked",_this.checkAllFlag);
                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    console.log(item.productQuentity);
                    _this.totalMoney += item.productPrice*item.productQuentity;
                    console.log(_this.totalMoney);
                }
            });
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function(){
            // vue 1.0 删除方法
            //this.delProduct.$deleta(this.curProduct);

            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
});
//全局过滤器
Vue.filter("money",function(value,type){
    return "￥" + value.toFixed(2) + type;
});


