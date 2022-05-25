<script setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import axios from '../axios.js'

    import {ref, reactive, onBeforeMount, inject} from 'vue'
    import {ElMessage} from "element-plus";

    //局部刷新
    const refresh = inject('reload')
    var data=reactive({
        pageNum: 1,//当前显示页码
        pageSize: 5,//每一页显示的条数
        total: 0,//总条数
        pages: 0,
        rzname:'', //员工姓名
        sbfa:[],//社保方案
        ygxx:{}//员工信息
    })
    const tableData = ref([])

    const content=ref(false)
   /* const ygxx=reactive({})*/

    //1、社保方案填写成功
    const xz = () => {
        ElMessage({
            showClose: true,
            message: '社保方案填写成功！',
            type: 'success'
        })
    }

    //查询参保人员信息
    onBeforeMount(() => {
        axios.get("/selectcbryxx",{
            params:{
                pageNum:data.pageNum,
                pageSize:data.pageSize
            }
        }).then(function (response) {
            console.log(response)
            tableData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    })
    //分页
    function page() {
        axios.get("/selectcbryxx", {
            params: {pageNum: data.pageNum, pageSize: data.pageSize}
        }).then(function (response) {
            tableData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }
    //根据员工姓名模糊查询员工信息
    function mohucx() {
        axios.get("/selectygByname",{
            params:{
                rzname:data.rzname
            }
        }).then(function (response) {
            tableData.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }
    //根据员工id查询员工信息
    function cxygxxbyid(ybh) {
        axios.get("/selectygxx",{
            params:{
                ybh:ybh
            }
        }).then(function (response) {
            data.ygxx=response.data.data
            console.log(data.ygxx)
        }).catch(function (error) {
            console.log(error)
        })
    }
    //查询社保状态为启用的方案
    function sbztqy() {
        axios.get("/selectsbfaByzt").then(function (response) {
            data.sbfa=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }
    //给正式员工（员工状态为3）未参保的人员设置社保方案
    function xzygsb(ygxx){
        console.log("下拉框的值：%o",data.ygxx.sbbh)
        console.log("修改：%o",data.ygxx)
        axios.post("/xzygsb",ygxx).then(function (response) {
            console.log(response)
            console.log("ybh:"+data.ygxx.ybh)
            refresh()
            xz()
        }).catch(function (error) {
            console.log(error)
        })
    }

</script>
<template>
    <div id="head">
        <span id="title">参保人员</span>
        <input type="text" placeholder="请输入员工姓名" v-model="data.rzname" id="txt">
        <el-button type="primary" :icon="Search" class="cx" @click="mohucx">查询</el-button>
    </div>
    <!-- 参保信息弹窗 -->
    <el-dialog v-model="content" title="参保信息详情填写">
        <el-form  label-width="120px" :model="data.ygxx">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="员工编号">
                        <el-input v-model="data.ygxx.ybh" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="社保方案">
                        <el-select v-model="data.ygxx.sbbh"  placeholder="请选择一项社保方案" >
                            <el-option v-model="data.ygxx.sbbh" v-for="fa in data.sbfa" :key="fa.sbbh" :label="fa.sbmc" :value="fa.sbbh" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="员工状态">
                        <el-input  v-model="data.ygxx.ygzt" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="姓名">
                        <el-input v-model="data.ygxx.rzname" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="性别">
                        <el-radio-group v-model="data.ygxx.rzsex" disabled>
                            <el-radio label="男" />
                            <el-radio label="女" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="出生日期">
                        <el-date-picker
                                v-model="data.ygxx.rzcsrq"
                                type="date"
                                placeholder="Pick a date"
                                style="width: 100%"
                                disabled
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="年龄">
                        <el-input v-model="data.ygxx.rzage" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="学历">
                        <el-input v-model="data.ygxx.rzxl" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="身份证">
                        <el-input v-model="data.ygxx.rzsfz" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="联系电话">
                        <el-input  v-model="data.ygxx.rzphone" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="现居地址">
                        <el-input v-model="data.ygxx.rzdz" type="textarea" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="工作经历">
                        <el-input v-model="data.ygxx.rzgzjl" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="婚姻状况">
                        <el-input v-model="data.ygxx.rzhyzk" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="民族">
                        <el-input v-model="data.ygxx.rzmz" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="政治面貌">
                        <el-input v-model="data.ygxx.rzzzmm" disabled/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="xzygsb(data.ygxx)">提交</el-button>
					<el-button @click="content = false">取消</el-button>
				</span>
        </template>
    </el-dialog>
    <!--表格-->
    <el-table
            :data="tableData"
            height="400px"
    >
<!--        <el-table-column type="selection" width="55" />-->
        <el-table-column property="ybh" label="员工编号" width="120px" sortable/>
        <el-table-column property="ygzt" label="员工状态" width="120px"/>
        <el-table-column property="rzname" label="姓名" width="120px"/>
        <el-table-column property="rzsex" label="性别" width="120px"/>
        <el-table-column property="rzcsrq" label="出生日期" width="130px" sortable/>
        <el-table-column property="rzage" label="年龄" width="120px"/>
        <el-table-column property="rzxl" label="学历" width="120px"/>
        <el-table-column property="rzsfz" label="身份证" width="120px"/>
        <el-table-column property="rzphone" label="联系电话" width="120px"/>
        <el-table-column property="rzdz" label="现居地址" width="120px"/>
        <el-table-column property="rzgzjl" label="工作经历" width="120px"/>
        <el-table-column property="rzhyzk" label="婚姻状况" width="120px"/>
        <el-table-column property="rzmz" label="民族" width="120px"/>
        <el-table-column property="rzzzmm" label="政治面貌" width="120px"/>
        <el-table-column fixed="right"  align="center" label="操作" width="170px">
            <template #default="scope" v-solt="scope">
                <el-button type="primary" :icon="Plus" @click="content=true,sbztqy(),cxygxxbyid(scope.row.ybh)">填写参保信息</el-button>
            </template>
        </el-table-column>

    </el-table>
    <!--分页标签-->
    <div class="page">
        <el-pagination background layout="prev, pager, next"
                       v-model:current-page="this.data.pageNum"
                       v-model:page-size="this.data.pageSize"
                       :total="data.total"
                       @current-change="page"/>
    </div>
</template>

<style scoped>
    #head {
        margin: 10px;
    }

    #title {
        font-weight: bold;
        font-size: 18px;
        margin-left: -30%;

    }

    #txt {
        width: 200px;
        height: 20px;
        margin: 0px 0px 0px 40%;
    }

    .cx {
        width: 66px;
        height: 25px;
        margin: 0px 10px 0px 0px;
    }
</style>