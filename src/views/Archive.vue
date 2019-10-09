<template>
    <div class="archive">
        <el-timeline >
            <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index">
                <h2>{{activity.timestamp}}</h2>
                <el-timeline >
                    <el-timeline-item v-for="(item, index2) in activity.content"
                                         :key="index2">
                        {{item}}
                    </el-timeline-item>
                </el-timeline>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    interface  Acts {
        timestamp:string,
        content:Array<string>
    }
    @Component
    export default class Archive extends Vue{
        activities:Array<Acts>=[
            {
                timestamp:'2019-10-09',
                content:['星期一的故事','星期二的故事','星期三的故事']
            }
        ]
    }
</script>

<style lang="less" scoped>

</style>
