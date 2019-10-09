<template>
    <div class="timeline">
        <el-timeline >
            <el-timeline-item v-for="(item, index) in timelines"
                              :key="index"
                              :color="item.color"
                        >
                <el-card>
                    <h3>{{item.title}}</h3>
                    <p>{{item.content}}</p>
                    <span>{{item.time}}</span>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    interface Item{
        title:string,
        content:string,
        time:string,
        color?:string
    }
    @Component
    export default class Archive extends Vue{
            timelines:Array<Item>=[
                {
                    title:'我是一只鱼',
                    content:'每个人都有自己的责任，我们需要将其承担起来',
                    time:'2019-01-01'
                },
                {
                    title:'我是一只鱼',
                    content:'每个人都有自己的责任，我们需要将其承担起来',
                    time:'2019-01-01',
                    color:'red'
                },
                {
                    title:'我是一只鱼',
                    content:'每个人都有自己的责任，我们需要将其承担起来',
                    time:'2019-01-01'
                },
            ]
    }
</script>

<style lang="less" scoped>

</style>
