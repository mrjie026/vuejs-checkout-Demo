/**
 * Created by JBook on 2017/4/11.
 */
new Vue({
    el:'.container',
    data: {
        limitNum:3,
        addressList: [],
        currentIndex:0,
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: {
        // computed 实时计算
        filterAddress: function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods: {
        //事件
        getAddressList: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (resp) {
                var res = resp.data;
                if(res.status == "1"){
                    _this.addressList = res.result;
                }
            });
        },
        loadMore: function () {
            this.limitNum = this.addressList.length;
        },
        setDefault: function (addressId) {
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            });
        }
    }
})