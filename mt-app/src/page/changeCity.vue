<template>

    <div class="page-changeCity">
        <el-row>
            <province />
        </el-row>
        <el-row>
            <hot title="热门城市:" :list="hotList"/>
        </el-row>
        <el-row>
            <hot title="最近访问:" :list="rencentList"/>
        </el-row>
        <el-row>
            <category />
        </el-row>
    </div>

</template>

<script>
import Province from '@/components/changeCity/province.vue'
import Hot from '@/components/changeCity/hot.vue'
import Category from '@/components/changeCity/category.vue'
import api from '@/api/index.js'
export default {
    data () {
        return {
            hotList: [
                // '北京',
                // '上海',
                // '广州',
                // '深圳',
                // '天津',
                // '西安',
                // '重庆',
                // '杭州',
                // '南京',
                // '武汉',
                // '成都'
            ],
            rencentList: [
                // '成都',
                // '广元',
                // '绵阳',
                // '南充',
                // '旺苍',
                // '嘉川',
                // '白水',
                // '江油',
                // '剑阁'
            ]
        }
    },
    created () {
        api.getHotCity().then(res => {
            this.hotList = res.data.data;
        }),
        api.getRecentCity().then(res => {
            this.rencentList = res.data.data;
        })
    },
    components: {
        Province,
        Hot,
        Category
    }
}
</script>

<style lang="scss">
</style>