<template>
    <div class="m-istyle">
        <dl @mouseover="over" :class="nav.class">
            <dt>{{ nav.title }}</dt>
            <dd v-for="(item, index) in nav.list" :key="index" :class="{active: kind == item.tab}" :data-type="item.tab">{{item.text}}</dd>
        </dl>
        <ul class="ibody">
            <li v-for="(item, index) in list" :key="index">
                <el-card :body-style="{ padding: '0px' }" shadow="never">
                    <img :src="item.image" class="image">
                    <div class="cbody">    
                        <div class="title" :title="item.title">{{item.title}}</div>
                        <div class="sub-title" :title="item.sub_title">{{item.sub_title}}</div>
                        <div class="price-info" v-if="item.price_info.current_price && item.price_info.old_price">
                            <span class="current-price-wrapper">
                                <span class="price-symbol numfont">¥</span>
                                <span class="current-price numfont">
                                    {{item.price_info.current_price}}
                                    <span class="old-price" v-if="item.price_info.old_price">门市价¥{{item.price_info.old_price}}</span>
                                </span>
                            </span>
                            <span class="sold bottom-right-info">{{item.address}}</span>
                        </div>
                        <div class="price-info" v-else-if="item.rentNum === 0">
                            <span class="current-price-wrapper">
                                <span class="price-symbol numfont">¥</span>
                                <span class="current-price numfont">
                                    抢光啦
                                </span>
                            </span>
                        </div>
                        <div class="price-info" v-else>
                            <span class="current-price-wrapper">
                                <span class="price-symbol numfont">¥</span>
                                <span class="current-price numfont">
                                    {{item.price_info.current_price}}
                                    <span class="current-price-type">/人均</span>
                                </span>
                            </span>
                            <span class="sold bottom-right-info">{{item.address}}</span>
                        </div>
                    </div>
                </el-card>
            </li>
        </ul>
    </div>

</template>

<script>
import api from '@/api/index.js'
export default {
    data () {
        return {
            kind: 'all',
            list : [
                {
                    image: '//p0.meituan.net/poi/c2b482474377fc31a8311f46055f40b0442616.png@460w_260h_1e_1c',
                    title: '金泉港IMAX国际影城',
                    sub_title : '免押金,可停车,有情侣座,儿童票,有WIFI,IMAX厅,杜比全景声厅',
                    price_info: {
                        current_price : 44,
                        old_price : 0
                    },
                    address: ''
                },
                {
                    image: '//p1.meituan.net/deal/bd9a5c59a6646c683b214139056b7fe1332966.jpg@460w_260h_1e_1c',
                    title: '金逸影城(荟聚IMAX店)',
                    sub_title : '免押金,可停车,有情侣座,儿童票,可刷卡,休息区,IMAX厅,60帧厅',
                    price_info: {
                        current_price : 19.9,
                        old_price : 0
                    },
                    rentNum: 0,
                    address: ''
                },
                {
                    image: '//p0.meituan.net/msmerchant/775fa45a4ec9dbe6bc6f353ec489756e104350.jpg@460w_260h_1e_1c',
                    title: '新屿悦和食汇',
                    sub_title : '自助单人餐',
                    price_info: {
                        current_price : 188,
                        old_price : 268
                    },
                    address: '王府井/东单'
                },
                {
                    image: '//p1.meituan.net/poi/ac64050e681b71087101b0ee0079766a182272.jpg@460w_260h_1e_1c',
                    title: 'UME国际影城(华星店)',
                    sub_title : '免押金,可停车,有情侣座,儿童票,可刷卡,有WIFI,休息区,IMAX厅,中国巨幕厅',
                    price_info: {
                        current_price : 39.4,
                        old_price : 0
                    },
                    address: ''
                },
                {
                    image: '//p1.meituan.net/deal/46d9aae57e2a58019d73a1e7624ce86983140.jpg@460w_260h_1e_1c',
                    title: '首都电影院(中华店)',
                    sub_title : '自费购买,中国巨幕厅,杜比全景声厅,60帧厅',
                    price_info: {
                        current_price : 27.9,
                        old_price : 0
                    },
                    address: ''
                },
                {
                    image: '//p1.meituan.net/deal/201203/31/002.jpg@460w_260h_1e_1c',
                    title: '广安门电影院',
                    sub_title : '免押金,可停车,儿童票,可刷卡,有WIFI,休息区,杜比全景声厅',
                    price_info: {
                        current_price : 27.9,
                        old_price : 0
                    },
                    address: ''
                },
            ]
        }
    },
    created () {
        api.resultsByKeywords().then(res => {
            // console.log(res)
        })
    },
    props: [
        'nav'
    ],
    methods: {
        over (e) {
            let dom = e.target,
                tagName =  dom.tagName.toLowerCase();
            if ( tagName !== 'dd' ) {
                return
            }
            this.kind = dom.getAttribute('data-type');
            //动态获取数据  发送ajax请求
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/css/index/artistic.scss'
</style>