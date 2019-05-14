<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <router-link :to="{name : 'index'}">
                    <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团" style="{cursor: 'pointer'}">
                </router-link>
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input v-model="searchWord" placeholder="请输入内容" @focus="focus" @blur="blur" @input="input"></el-input>
                    <el-button type="primary" icon="el-icon-search"></el-button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd  v-for="(item,index) in hotPlaceList.slice(0, 4)" :key="index">
                            <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                       <dd  v-for="(item,index) in SearchList" :key="index">
                            <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a href="#" v-for="(item,index) in suggestList" :key="index">{{item}}</a>
                </p>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import api from '@/api/index.js'
export default {
    data () {
        return {
            searchWord: '',
            isFocus : false,
            hotPlaceList: [

            ],
            SearchList: [

            ],
            suggestList: [

            ]
        }
    },
    created () {
        api.searchHotWords().then(
            res => {
                console.log(res);
                this.hotPlaceList = res.data.data;
                this.suggestList = res.data.data;
            }
        )
    },
    computed : {
        isHotPlace () {
            return this.isFocus && !this.searchWord;
        },
        isSearchList () {
            return this.isFocus && this.searchWord;
        }
    },
    methods: {
        focus () {
            this.isFocus = true
        },
        blur () {
            let self = this;
            setTimeout( function () {
                self.isFocus = false
            }, 100)
        },
        input () {
            let value = this.searchWord;
            api.getSearchList().then(res => {
                this.SearchList = res.data.data.list.filter((item,index) => {
                    return item.indexOf(value) > -1;
                });
            });
        }
    }
}
</script>

