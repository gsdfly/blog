<template>
    <div class="articles">
        <h3 v-if="params.tag_id"
            class="left-title">{{tag_name}} 相关的文章：</h3>
        <ul class="articles-list"
            id="list">
            <transition-group name="el-fade-in">
                <li @click="articleDetail(article._id)"
                    v-for="(article) in articlesList"
                    :key="article._id"
                    class="item">
                    <a :href="href + article._id"
                       target="_blank">
                        <img class="wrap-img img-blur-done"
                             :data-src="article.img_url"
                             data-has-lazy-src="false"
                             src="../assets/bg.jpg"
                             alt="文章封面"/>
                        <div class="content">
                            <h4 class="title">{{article.title}}</h4>
                            <p class="abstract">{{article.desc}}</p>
                            <div class="meta">
                                <span>查看 {{article.meta.views}}</span>
                                <span>评论 {{article.meta.comments}}</span>
                                <span>赞 {{article.meta.likes}}</span>
                                <span v-if="article.create_time"
                                      class="time">
                  {{formatTime(article.create_time)}}
                </span>
                            </div>
                        </div>
                    </a>
                </li>
            </transition-group>
        </ul>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class Articles extends Vue {
        articlesList: Array<object> =
            [
                {
                    "meta": {
                        "views": 321,
                        "likes": 0,
                        "comments": 2
                    },
                    "desc": "GitHub 上能挖矿的神仙技巧 - 如何发现优秀开源项目",
                    "img_url": "https://upload-images.jianshu.io/upload_images/12890819-4622f9c3a0179069.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                    "tags": ["5bf013d2bc1e7805eb83db9d"],
                    "category": ["5bf4088f245730373274df56"],
                    "_id": "5d79a06d662d5e73c62cbb03",
                    "title": "GitHub 上能挖矿的神仙技巧 - 如何发现优秀开源项目",
                    "create_time": "2019-09-12T01:33:33.147Z"
                }, {
                "meta": {
                    "views": 876,
                    "likes": 5,
                    "comments": 17
                },
                "desc": "之所以把计数排序、桶排序、基数排序 放在一起比较，是因为它们的平均时间复杂度都为 O(n)。",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d405a1896cf541789792486",
                "title": "JavaScript 数据结构与算法之美 - 桶排序、计数排序、基数排序",
                "create_time": "2019-07-30T14:54:16.633Z"
            }, {
                "meta": {
                    "views": 227,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "文中包含了 十大经典排序算法 的思想、代码实现、一些例子、复杂度分析、动画、还有算法可视化工具。",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d4059b896cf541789792485",
                "title": "JavaScript 数据结构与算法之美 - 十大经典排序算法汇总",
                "create_time": "2019-07-30T14:52:40.523Z"
            }, {
                "meta": {
                    "views": 161,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "之所以把归并排序、快速排序、希尔排序、堆排序 放在一起比较，是因为它们的平均时间复杂度都为 O(nlogn)",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d37bdea96cf541789792451",
                "title": "JavaScript 数据结构与算法之美 - 归并排序、快速排序、希尔排序、堆排序",
                "create_time": "2019-07-24T02:09:46.763Z"
            }, {
                "meta": {
                    "views": 201,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "算法为王。想学好前端，先练好内功，内功不行，就算招式练的再花哨，终究成不了高手；只有内功深厚者，前端之路才会走得更远。",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d353b3e96cf54178979244b",
                "title": "JavaScript 数据结构与算法之美 - 强烈推荐 GitHub 上值得前端学习的数据结构与算法项目",
                "create_time": "2019-07-22T04:27:42.374Z"
            }, {
                "meta": {
                    "views": 54,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "算法为王。  想学好前端，先练好内功，只有内功深厚者，前端之路才会走得更远>",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d353b1596cf54178979244a",
                "title": "JavaScript 数据结构与算法之美 - 冒泡排序、插入排序、选择排序",
                "create_time": "2019-07-22T04:27:01.189Z"
            }, {
                "meta": {
                    "views": 115,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "想学好前端，先练好内功，内功不行，就算招式练的再花哨，终究成不了高手。",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d2ed3cb96cf541789792383",
                "title": "JavaScript 数据结构与算法之美 - 非线性表（树、堆）",
                "create_time": "2019-07-17T07:52:43.078Z"
            }, {
                "meta": {
                    "views": 259,
                    "likes": 1,
                    "comments": 9
                },
                "desc": "算法为王，排序算法博大精深，前辈们用了数年甚至一辈子的心血研究出来的算法，更值得我们学习与推敲。",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d1dbaddffe7604ffc4dc87c",
                "title": "JavaScript 数据结构与算法之美 - 递归",
                "create_time": "2019-07-04T08:37:49.860Z"
            }, {
                "meta": {
                    "views": 129,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "JavaScript 数据结构与算法之美 - 栈内存与堆内存 、浅拷贝与深拷贝",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468", "5bf013a6bc1e7805eb83db97"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d1b1e2cb9e26b1e10d2e5d5",
                "title": "JavaScript 数据结构与算法之美 - 栈内存与堆内存 、浅拷贝与深拷贝",
                "create_time": "2019-07-02T09:04:44.050Z"
            }, {
                "meta": {
                    "views": 128,
                    "likes": 0,
                    "comments": 0
                },
                "desc": "基础知识就像是一座大楼的地基，它决定了我们的技术高度。我们应该多掌握一些可移值的技术或者再过十几年应该都不会过时的技术，数据结构与算法就是其中之一。",
                "img_url": "https://upload-images.jianshu.io/upload_images/12890819-bc640d464b56aac9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
                "tags": ["5cf37d2874289f3d47ed1468"],
                "category": ["5bf014e8bc1e7805eb83dba7"],
                "_id": "5d197ed6b9e26b1e10d2e5cc",
                "title": "JavaScript 数据结构与算法之美 - 线性表（数组、栈、队列、链表）",
                "create_time": "2019-07-01T03:32:38.653Z"
            }];
        href: string = 'articleDetail/';
        params:object = {};
        tag_name:string = '';mounted() {
            console.log("11111111111");
            console.log(this.$route.query);
        }
      formatTime(time:string):string{
          return time
        }
      articleDetail(id:any):void{
        // this.$router.push({path:"/articleDetail",query:{articleId:id}})
      }
    }
</script>

<style lang="less" scoped>

</style>
