<template>
    <div :class="['choose-wrap', disable ? 'disable' : '']" @click="showWrapper" v-document-click="documentClick">
        <div class="choose">
            <span>{{value}}</span>
            <i class="el-icon-caret-bottom"></i>
            <div :class="{'mt-content': true, 'active' : showWrapperActive}">
                <h2>{{title}}</h2>
                <div :class="['wrapper', mclass]">
                    <div class="col" v-for="(listDate, index) in renderList" :key="index">
                        <span :class="{'mt-item': true, 'active': item.name == value}" v-for="(item, index) in listDate" :key="index" @click="changeValue(item)">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            key: false
        }
    },
    props:[
        'list',
        'title',
        'value',
        'showWrapperActive',
        'disable',
        'mclass'
    ],
    computed: {
        renderList () {
            let col = Math.ceil(this.list.length / 12);
            let resultList = [];
            for( let i = 0; i < col; i++ ){
                let data = this.list.slice(i * 12, i * 12 + 12);
                resultList.push(data);
            }
            return resultList
        }
    },
    methods: {
        showWrapper (e) {
            e.stopPropagation();
            this.key = true;
            if(!this.disable){
                this.$emit('change_active', true);
            }
        },
        documentClick () {
            if( this.key ){
                this.key = false;
                this.$emit('change_active', false);
            }
        },
        changeValue (item) {
            this.$emit('change', item);
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/css/changecity/select.scss';
</style>