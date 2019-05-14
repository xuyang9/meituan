<template>
    <div> 
        <span class="name">按省份选择:</span>
        <m-select :list="provinceList" class="province" title="省份" :value="province" @change_active="changeProvinceActive" @change="changeProvince"  :showWrapperActive="provinceActive"/>
        <m-select :list="cityList" mclass="city" title="城市" :value="city" @change_active="changeCityActive" @change="changeCity" :showWrapperActive="cityActive" :disable="cityDisabled"/>
        <span>直接搜索:</span>
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect"
        ></el-autocomplete>
    </div>
</template>

<script>
import mSelect from './select.vue'
import api from '@/api/index.js'
export default {
    data () {
        return {
            cityDisabled: true,
            province: '省份',
            provinceList : [
            ],
            cityList: [
            ],
            city: '城市',
            provinceActive: false,
            cityActive: false,
            restaurants: [],
            state: '',
            timeout:  null
        }
    },
    created () {
        api.getProvinceList().then(res => {
            this.provinceList = res.data.data.map(item => {
                item.name = item.provinceName;
                return item
            });
        })
    },
    components: {
        mSelect,
    },
    methods: {
        changeProvinceActive (flag) {
            this.provinceActive = flag;
            if( flag ) {
                this.cityActive = false;
            }
        },
        changeCityActive (flag) {
            this.cityActive = flag;
            if( flag ) {
                this.provinceActive = false;
            }
        },
        changeProvince (item) {
            this.cityDisabled = false;
            this.province = item.name;
            this.cityList = item.cityInfoList;
        },
        changeCity (item) {
            this.city = item.name;
            this.$store.dispatch('setPosition', item);
            this.$router.push({name: 'index'});
        },
        loadAll() {
            return [
                {'value': '成都'},
                {'value': '广元'},
                {'value': '绵阳'},
                {'value': '南充'},
                {'value': '旺苍'},
                {'value': '嘉川'},
                {'value': '白水'},
                {'value': '江油'},
                {'value': '剑阁'}
            ]
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 2000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
}
</script>
<style lang="scss">
    @import "@/assets/css/changecity/iselect.scss";
</style>

