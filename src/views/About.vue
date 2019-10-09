<template>
    <div class="about">
        <h1>This is an about page</h1>
        <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                :expand-on-click-node="false"
                ref="tree">
        </el-tree>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    import instance from "@/utils/api";
    @Component
    export default class Archive extends Vue{
        data:Array<object> = [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
            }]
        }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
        }, {
            id: 3,
            label: '一级 3',
            children: [{
                id: 7,
                label: '二级 3-1'
            }, {
                id: 8,
                label: '二级 3-2'
            }]
        }]
        defaultProps:object = {
            children: 'children',
            label: 'label'
        }

        mounted(){
            instance.get('/v1').then((res)=>{
                console.log(res);
            })
        }
    }
</script>

<style lang="less" scoped>

</style>
