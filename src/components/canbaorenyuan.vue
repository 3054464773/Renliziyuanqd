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
    const activeName = ref('first')

    //局部刷新
    const refresh = inject('reload')
    var data=reactive({
        pageNum: 1,//当前显示页码
        pageSize: 5,//每一页显示的条数
        total: 0,//总条数
        pages: 0,
        rzname:'', //员工姓名
        sbfa:[],//社保方案
        ygxx:{},//员工信息
        dept:[], //所有部门信息
    })
    const shixiData = ref([])
    const zhengshiData = ref([])

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

    //查询参保人员信息--实习员工
    onBeforeMount(() => {
        axios.get("/selectcbryxxSx",{
            params:{
                pageNum:data.pageNum,
                pageSize:data.pageSize
            }
        }).then(function (response) {
            console.log(response)
            shixiData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    })
    //分页--实习员工
    function page() {
        axios.get("/selectcbryxxSx", {
            params: {pageNum: data.pageNum, pageSize: data.pageSize}
        }).then(function (response) {
            shixiData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }
    //查询参保人员信息--正式员工
    onBeforeMount(() => {
        axios.get("/selectcbryxxZs",{
            params:{
                pageNum:data.pageNum,
                pageSize:data.pageSize
            }
        }).then(function (response) {
            console.log(response)
            zhengshiData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    })
    //分页--正式员工
    function page1() {
        axios.get("/selectcbryxxZs", {
            params: {pageNum: data.pageNum, pageSize: data.pageSize}
        }).then(function (response) {
            zhengshiData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }

    //根据员工姓名模糊查询员工信息--实习员工
    function mohucxSx() {
        axios.get("/selectygBynamesx",{
            params:{
                rzname:data.rzname
            }
        }).then(function (response) {
            shixiData.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }
    //根据员工姓名模糊查询员工信息--正式员工
    function mohucxZs() {
        axios.get("/selectygByname",{
            params:{
                rzname:data.rzname
            }
        }).then(function (response) {
            zhengshiData.value = response.data.data
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
    //查询所有部门信息
    function selectdeptxx(){
        axios.get("/selectdept").then(function (response) {
            data.dept=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }
    //根据部门编号查询员工信息
    function cxygbybmbh1(bmbh){
        axios.get("/selectygbybhid1",{
            params:{
                bmbh:bmbh
            }
        }).then(function (response) {
            shixiData.value=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }
    //根据部门编号查询员工信息
    function cxygbybmbh2(bmbh){
        axios.get("/selectygbybhid2",{
            params:{
                bmbh:bmbh
            }
        }).then(function (response) {
            zhengshiData.value=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

</script>
<template>
    <el-tabs v-model="activeName" >
        <el-tab-pane label="实习员工" name="first">
            <div class="sousuo">
                <el-select placeholder="请选择部门" v-model="data.dept.bmmc" @click="selectdeptxx" >
                    <el-option v-for="dept in data.dept" :label="dept.bmmc" :value="dept.bmbh" @click="cxygbybmbh1(dept.bmbh)" />
                </el-select>
                <input type="text" placeholder="请输入员工姓名" v-model="data.rzname" class="txt">
                <el-button type="primary" :icon="Search" class="cx" @click="mohucxSx">查询</el-button>
            </div>
            <!--表格-->
            <el-table
                    :data="shixiData"
                    height="350px"
            >
                <el-table-column property="ybh" label="员工编号" width="120px" sortable/>
                <el-table-column property="rzname" label="姓名" width="120px"/>
                <el-table-column  label="员工状态" width="120px" >
                    <template #default="scope">
                        <span v-if="scope.row.ygzt==2">实习员工</span>
                        <span v-else-if="scope.row.ygzt==3">正式员工</span>
                    </template>
                </el-table-column>
                <el-table-column property="bmmc" label="部门名称" width="120px"/>
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

            </el-table>
            <!--分页标签-->
            <div class="page">
                <el-pagination background layout="prev, pager, next"
                               v-model:current-page="this.data.pageNum"
                               v-model:page-size="this.data.pageSize"
                               :total="data.total"
                               @current-change="page"/>
            </div>
        </el-tab-pane>

        <el-tab-pane label="正式员工" name="second">
            <div class="sousuo">
                <el-select placeholder="请选择部门" v-model="data.dept.bmmc" @click="selectdeptxx" >
                    <el-option v-for="dept in data.dept" :label="dept.bmmc" :value="dept.bmbh" @click="cxygbybmbh2(dept.bmbh)" />
                </el-select>
                <input type="text" placeholder="请输入员工姓名" v-model="data.rzname" class="txt">
                <el-button type="primary" :icon="Search" class="cx" @click="mohucxZs">查询</el-button>
            </div>
            <!--表格-->
            <el-table
                    :data="zhengshiData"
                    height="350px"
            >
                <el-table-column property="ybh" label="员工编号" width="120px" sortable/>
                <el-table-column property="rzname" label="姓名" width="120px"/>
                <el-table-column  label="员工状态" width="120px" >
                    <template #default="scope">
                        <span v-if="scope.row.ygzt==2">实习员工</span>
                        <span v-else-if="scope.row.ygzt==3">正式员工</span>
                    </template>
                </el-table-column>
                <el-table-column property="bmmc" label="部门名称" width="120px"/>
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
                               @current-change="page1"/>
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
                            <el-form-item label="姓名">
                                <el-input v-model="data.ygxx.rzname" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="所在部门">
                                <el-input v-model="data.ygxx.bmmc" disabled/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="社保方案">
                                <el-select v-model="data.ygxx.sbbh"  placeholder="请选择一项社保方案" >
                                    <el-option v-for="fa in data.sbfa" :key="fa.sbbh" :label="fa.sbmc" :value="fa.sbbh" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="员工状态">
                                <el-input  v-model="data.ygxx.ygzt" disabled/>
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
        </el-tab-pane>
    </el-tabs>

</template>

<style scoped>
    .sousuo{
        margin: 15px;
    }

    .txt {
        width: 200px;
        height: 20px;
    }

    .cx {
        width: 66px;
        height: 25px;
        margin: 0px 10px 0px 0px;
    }
</style>