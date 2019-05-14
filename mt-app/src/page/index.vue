<template>
    <div class="page-index">
        <el-row>
            <el-col :span="5">
                <m-menu />
            </el-col>
            <el-col :span="19">
            <m-life />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
               <m-Container :nav="iStyle"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
               <m-Container :nav="recomment"/>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import mMenu from '@/components/index/menu.vue'
import mLife from '@/components/index/life.vue'
import mContainer from '@/components/index/container.vue'

export default {
    data () {
        return {
            iStyle: {
                class: 'istyle',
                title: '有格调',
                list: [
                    {
                    text: '全部',
                    tab: 'all'
                    },
                    {
                        text: '约会聚餐',
                        tab: 'food'
                    },
                    {
                        text: '丽人SPA',
                        tab: 'spa'
                    },
                    {
                        text: '电影演出',
                        tab: 'movie'
                    },
                    {
                        text: '品质出游',
                        tab: 'travel'
                    }
                ]
            },
            recomment: {
                class: 'minSu',
                title: '推荐民宿',
                list: [
                    {
                    text: '天津',
                    tab: 'tianJing'
                    },
                    {
                        text: '济南',
                        tab: 'jiNan'
                    },
                    {
                        text: '大连',
                        tab: 'daLian'
                    },
                    {
                        text: '太原',
                        tab: 'taiYuan'
                    },
                    {
                        text: '石家庄',
                        tab: 'shiJiaZhuang'
                    },
                    {
                        text: '秦皇岛',
                        tab: 'qinHuangDao'
                    },
                    {
                        text: '呼和浩特',
                        tab: 'huHeHaoTe'
                    },
                    {
                        text: '潍坊',
                        tab: 'lanFang'
                    },
                    {
                        text: '唐山',
                        tab: 'tangShan'
                    },
                    {
                        text: '泰安',
                        tab: 'taiAn'
                    }
                ]
            }
        }
    },
    components:{
        mMenu,
        mLife,
        mContainer
    }
}
</script>

<style lang="scss">
    @import '@/assets/css/index/index.scss';
</style>