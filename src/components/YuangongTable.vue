<template>
    <div id="top">您好，{{data.rzname}}，祝您工作顺利！</div>
    <div id="middle">
        <div id="left">
            <div style="height: 30px;" :model="data.bcqk">上班时间：{{data.bcqk.bckssj}}，下班时间：{{data.bcqk.bcjssj}}，
                记得<el-button type="text" style="font-weight: bold" @click="selectkqjlbyDate()">打卡</el-button>哦！</div>
            <div>
                <el-calendar v-model="rili.kqtimes" id="rili">
                    <template slot="dateCell" #dateCell="{ data }">
                        <p :class="data.isSelected ? 'is-selected' : ''">
                            {{ data.day.split("-").slice(1).join("-") }}
                        </p>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==1 && e.kqxbdkzt==1}).length>0">正常</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==1 && e.kqxbdkzt==3}).length>0">正常,早退</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==1 && e.kqxbdkzt==4}).length>0">正常,未打卡</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==2 && e.kqxbdkzt==1}).length>0">迟到,正常</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==2 && e.kqxbdkzt==3}).length>0">迟到,早退</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==2 && e.kqxbdkzt==4}).length>0">迟到,未打卡</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==4 && e.kqxbdkzt==1}).length>0">未打卡,正常</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==4 && e.kqxbdkzt==3}).length>0">未打卡,早退</div>
                        <div  v-if="rili.kqzt.filter(e=>{return e.xzsj==data.day && e.kqsbdkzt==4 && e.kqxbdkzt==4}).length>0">未打卡</div>
                    </template>
                </el-calendar>
            </div>
        </div>
        <div id="right">
            <div id="bianjiedaohang">
                <p style="font-size: 20px;font-weight: bold;margin-left: 10px;margin-top: 0;">便捷导航</p>
                <el-button @click="Yuangongziliao=true,gerenziliao()" class="bianjie">个人资料</el-button>
                <el-button @click="cxygphone(),drawer=true" class="bianjie">通讯录</el-button>
                <el-button @click="rizhiDialog=true,merizhi(),yidianpingrz()" class="bianjie">工作日志</el-button>
                <el-button @click="liuchengsq=true" class="bianjie">流程申请</el-button>
                <el-button @click="yuangongjilu=true,jxjl(),xzjl(),ccjl()" class="bianjie">个人记录</el-button>
            </div>
            <div style="box-shadow: 5px 5px 5px 5px #B3C0D1;margin-top: 3%;height: 430px; ">
                <el-tabs v-model="tzandgg">
                    <el-tab-pane label="通知" name="first">
                        <el-table :data="data.tongzhiData" height="360px">
                            <el-table-column prop="tzbh" label="编号"/>
                            <el-table-column prop="rzname" label="发布人"/>
                            <el-table-column prop="tzbt" label="标题"/>
                            <el-table-column prop="tznr" label="通知内容" show-overflow-tooltip/>
                            <el-table-column prop="tzsj" label="发布时间" sortable/>
                            <el-table-column prop="tzyds" label="阅读数"/>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="公告" name="second">
                        <el-table :data="data.gonggaoData" height="360px">
                            <el-table-column prop="ggbh" label="编号"/>
                            <el-table-column prop="rzname" label="发布人"/>
                            <el-table-column prop="ggbt" label="标题"/>
                            <el-table-column prop="ggnr" label="公告内容" show-overflow-tooltip/>
                            <el-table-column prop="ggsj" label="发布时间" sortable/>
                            <el-table-column prop="ggyds" label="阅读数"/>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
    <!--个人资料弹窗-->
    <el-dialog v-model="Yuangongziliao" title="个人资料">
        <el-form label-width="120px" :model="data.gerenziliaoxx">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="员工编号">
                        <el-input v-model="data.gerenziliaoxx.ybh" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="员工姓名">
                        <el-input v-model="data.gerenziliaoxx.rzname"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="所在部门">
                        <el-input v-model="data.gerenziliaoxx.bmmc" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="社保方案">
                        <el-input v-model="data.gerenziliaoxx.sbbh" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="员工状态">
                        <el-input v-model="data.gerenziliaoxx.ygzt" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="性别">
                        <el-radio-group v-model="data.gerenziliaoxx.rzsex">
                            <el-radio label="男"/>
                            <el-radio label="女"/>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="出生日期">
                        <el-date-picker
                                v-model="data.gerenziliaoxx.rzcsrq"
                                type="date"
                                placeholder="Pick a date"
                                style="width: 100%"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="年龄">
                        <el-input v-model="data.gerenziliaoxx.rzage"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="学历">
                        <el-select v-model="data.gerenziliaoxx.rzxl">
                            <el-option label="硕士" value="硕士"/>
                            <el-option label="研究生" value="研究生"/>
                            <el-option label="本科" value="本科"/>
                            <el-option label="大专" value="大专"/>
                            <el-option label="高中" value="高中"/>
                            <el-option label="初中" value="初中"/>
                            <el-option label="小学" value="小学"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="身份证">
                        <el-input v-model="data.gerenziliaoxx.rzsfz"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="联系电话">
                        <el-input v-model="data.gerenziliaoxx.rzphone"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="现居地址">
                        <el-input v-model="data.gerenziliaoxx.rzdz"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="工作经历">
                        <el-input v-model="data.gerenziliaoxx.rzgzjl"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="婚姻状况">
                        <el-select v-model="data.gerenziliaoxx.rzhyzk">
                            <el-option label="未婚" value="未婚"/>
                            <el-option label="已婚" value="已婚"/>
                            <el-option label="丧偶" value="丧偶"/>
                            <el-option label="离婚" value="离婚"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="民族">
                        <el-select v-model="data.gerenziliaoxx.rzmz">
                            <el-option label="汉族" value="汉族"/>
                            <el-option label="壮族" value="壮族"/>
                            <el-option label="回族" value="回族"/>
                            <el-option label="满族" value="满族"/>
                            <el-option label="维吾尔族" value="维吾尔族"/>
                            <el-option label="苗族" value="苗族"/>
                            <el-option label="彝族" value="彝族"/>
                            <el-option label="土家族" value="土家族"/>
                            <el-option label="藏族" value="藏族"/>
                            <el-option label="蒙古族" value="蒙古族"/>
                            <el-option label="侗族" value="侗族"/>
                            <el-option label="布依族" value="布依族"/>
                            <el-option label="瑶族" value="瑶族"/>
                            <el-option label="白族" value="白族"/>
                            <el-option label="朝鲜族" value="朝鲜族"/>
                            <el-option label="哈尼族" value="哈尼族"/>
                            <el-option label="黎族" value="黎族"/>
                            <el-option label="哈萨克族" value="哈萨克族"/>
                            <el-option label="傣族" value="傣族"/>
                            <el-option label="畲族" value="畲族"/>
                            <el-option label="傈僳族" value="傈僳族"/>
                            <el-option label="东乡族" value="东乡族"/>
                            <el-option label="仡佬族" value="仡佬族"/>
                            <el-option label="拉祜族" value="拉祜族"/>
                            <el-option label="佤族" value="佤族"/>
                            <el-option label="水族" value="水族"/>
                            <el-option label="纳西族" value="纳西族"/>
                            <el-option label="羌族" value="羌族"/>
                            <el-option label="土族" value="土族"/>
                            <el-option label="仫佬族" value="仫佬族"/>
                            <el-option label="柯尔克孜族" value="柯尔克孜族"/>
                            <el-option label="锡伯族" value="锡伯族"/>
                            <el-option label="柯尔克孜族" value="柯尔克孜族"/>
                            <el-option label="达斡尔族" value="达斡尔族"/>
                            <el-option label="撒拉族" value="撒拉族"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="政治面貌">
                        <el-select v-model="data.gerenziliaoxx.rzzzmm">
                            <el-option label="少先队员" value="少先队员"/>
                            <el-option label="共青团员" value="共青团员"/>
                            <el-option label="中共党员" value="中共党员"/>
                            <el-option label="群众" value="群众"/>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="updategerenziliao(data.gerenziliaoxx)">提交</el-button>
					<el-button @click="Yuangongziliao = false">取消</el-button>
				</span>
        </template>
    </el-dialog>
    <!--员工通讯录抽屉-->
    <el-drawer v-model="drawer" title="员工通讯录">
        <el-table :data="ygphoneTable">
            <el-table-column prop="rzname" label="员工姓名"/>
            <el-table-column prop="rzphone" label="联系电话"/>
        </el-table>
    </el-drawer>
    <!-- 日志弹窗 -->
    <el-dialog v-model="rizhiDialog" title="工作日志">
        <el-tabs v-model="rz">
            <el-tab-pane label="发表日志" name="first">
                <el-form :model="fabiaoForm">
                    <el-form-item>
                        <el-input v-model="fabiaoForm.gzrznr" type="textarea"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="fabiaorz()">发表</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="我的日志" name="second">
                <div :model="data.merizhiData " v-for="(rz,xh) in data.merizhiData"
                     style="border: 1px solid black;margin-bottom: 20px;">
                    <p>序号：{{xh+1}}&nbsp;&nbsp;&nbsp;日志id：{{rz.gzrzbh}}&nbsp;&nbsp;&nbsp;姓名：{{rz.rzname}}&nbsp;&nbsp;&nbsp;发布时间：{{rz.gzrzsj}}</p>
                    <p>日志内容：{{rz.gzrznr}}</p>
                </div>
                <!-- 分页-->
                <div class="page">
                    <el-pagination background layout="prev, pager, next"
                                   v-model:current-page="this.data.pageNum"
                                   v-model:page-size="this.data.pageSize"
                                   :total="data.total"
                                   @current-change="page()"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已点评日志" name="third">
                <div :model="data.yidianpingrz" v-for="(ydp,xh) in data.yidianpingrz"
                     style="border: 1px solid black;margin-bottom: 20px;">
                    <p>序号：{{xh+1}}&nbsp;&nbsp;&nbsp;日志id：{{ydp.gzrzbh}}&nbsp;&nbsp;&nbsp;姓名：{{ydp.rzname}}&nbsp;&nbsp;&nbsp;发布时间：{{ydp.gzrzsj}}</p>
                    <p>日志内容：{{ydp.gzrznr}}</p>
                    <p>员工编号：{{ydp.ybh}}&nbsp;&nbsp;&nbsp;点评内容：{{ydp.rzdpnr}}&nbsp;&nbsp;&nbsp;点评时间：{{ydp.rzdpsj}}</p>
                </div>
                <!-- 分页-->
                <div class="page">
                    <el-pagination background layout="prev, pager, next"
                                   v-model:current-page="this.data.pageNum1"
                                   v-model:page-size="this.data.pageSize1"
                                   :total="data.total1"
                                   @current-change="page1()"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
    <!--流程申请弹窗-->
    <el-dialog v-model="liuchengsq" title="流程申请">
        <el-tabs v-model="lcsq">
            <el-tab-pane label="申请排休" name="first">
                申请排休
            </el-tab-pane>
            <el-tab-pane label="申请补卡" name="second">
                申请补卡
            </el-tab-pane>
            <el-tab-pane label="申请转正" name="third">
                申请转正
            </el-tab-pane>
            <el-tab-pane label="申请离职" name="fourth">
                申请离职
            </el-tab-pane>
            <el-tab-pane label="申请出差" name="fifth">
                <el-form label-width="120px">
                    <el-form-item label="出发地">
                        <el-input class="wbk"/>
                    </el-form-item>
                    <el-form-item label="目的地">
                        <el-input class="wbk"/>
                    </el-form-item>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="开始时间">
                                <el-date-picker
                                        type="date"
                                        placeholder="请选择开始时间"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="预计回来时间">
                                <el-date-picker
                                        type="date"
                                        placeholder="请选择预计回来时间"
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="出差内容">
                        <el-input type="textarea" class="wbk"/>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
    <!--个人记录弹窗-->
    <el-dialog v-model="yuangongjilu" title="个人记录">
        <el-tabs v-model="ygjl">
            <el-tab-pane label="考勤记录" name="first">
                <el-table :data="data.kaoqinData" height="300px">
                    <el-table-column prop="kqsbdksj" label="上班打卡时间"/>
                    <el-table-column prop="kqsbzt" label="上班打卡状态">
                        <template #default="scope" v-solt="scope">
                            <span v-if="scope.row.kqsbzt==1">正常</span>
                            <span v-else-if="scope.row.kqsbzt==2">迟到</span>
                            <span v-else-if="scope.row.kqsbzt==3">早退</span>
                            <span v-else-if="scope.row.kqsbzt==4">未打卡</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kqxbdksj" label="下班打卡时间"/>
                    <el-table-column prop="kqxbzt" label="下班打卡状态">
                        <template #default="scope" v-solt="scope">
                            <span v-if="scope.row.kqxbzt==1">正常</span>
                            <span v-else-if="scope.row.kqxbzt==2">迟到</span>
                            <span v-else-if="scope.row.kqxbzt==3">早退</span>
                            <span v-else-if="scope.row.kqxbzt==4">未打卡</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xzsj" label="时间"/>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="绩效记录" name="second">
                <el-table :data="data.jixiaoData" height="300px">
                    <el-table-column prop="jmc" label="绩效名称"/>
                    <el-table-column prop="jnr" label="绩效内容"/>
                    <el-table-column prop="jxsj" label="时间"/>
                    <el-table-column prop="jxfs" label="分数">
                        <template #default="scope" v-slot="scope">
                            <el-rate v-model="scope.row.jxfs"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jdjb" label="等级"/>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="薪资记录" name="third">
                <el-table :data="data.xinziData" height="300px">
                    <el-table-column prop="xzjljbgz" label="基本工资"/>
                    <el-table-column prop="xzjlsb" label="社保"/>
                    <el-table-column prop="szjlqj" label="请假"/>
                    <el-table-column prop="szjlze" label="总额"/>
                    <el-table-column prop="szjlsh" label="税后"/>
                    <el-table-column prop="szjlsj" label="时间">
                        <template #default="scope" v-solt="scope">
                            <span>{{scope.row.szjlsj.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="出差记录" name="fifth">
                <el-table :data="data.chuchaiData" height="300px">
                    <el-table-column prop="ccfd" label="出发地"/>
                    <el-table-column prop="cmdd" label="目的地"/>
                    <el-table-column prop="ckssj" label="开始时间"/>
                    <el-table-column prop="cyjsj" label="预计回来时间"/>
                    <el-table-column prop="csjsj" label="实际回来时间"/>
                    <el-table-column prop="cccnr" label="出差内容"/>
                    <el-table-column prop="czt" label="状态">
                        <template #default="scope" v-solt="scope">
                            <span v-if="scope.row.czt==1">未出发</span>
                            <span v-else-if="scope.row.czt==2">出差中</span>
                            <span v-else-if="scope.row.czt==3">已回来</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts" setup>
    import {
        ref, reactive, onBeforeMount
    } from 'vue'
    import {ElMessage} from 'element-plus'
    import axios from '../axios.js'

    const Yuangongziliao = ref(false)//个人资料弹窗
    const drawer = ref(false)//通讯录抽屉
    const rizhiDialog = ref(false)//日志弹窗
    const ygphoneTable = ref([])//员工通讯录
    const liuchengsq=ref(false)
    const yuangongjilu=ref(false)
    const lcsq = ref('first')
    const tzandgg = ref('first')
    const rz = ref('first')
    const ygjl = ref('first')
    const fabiaoForm = reactive({//发表日志表单
        ybh: '',
        gzrznr: '', //发表日志内容
    })
    const data = reactive({
        merizhiData: [],//我的日志数据
        pageNum: 1,
        pageSize: 3,
        total: 0,
        pages: 0,
        yidianpingrz: [],//已点评日志数据
        pageNum1: 1,
        pageSize1: 2,
        total1: 0,
        kaoqinData: [],//考勤数据
        jixiaoData: [],//绩效数据
        xinziData: [],//薪资数据
        chuchaiData:[],//出差数据
        tongzhiData: [],//通知数据
        gonggaoData: [],//公告数据
        gerenziliaoxx: {},//个人资料信息
        kaoqinjilubiao: {},//考勤记录表信息
        bcqk:{},//班次情况
        rzname:'',//当前登录人
    })
    const rili=reactive({
        kqzt: [],//考勤状态
        kqtimes: new Date(),//当前时间
    })

    //Message消息提示
    //1、新增成功
    const xz = () => {
        ElMessage({
            showClose: true,
            message: '新增成功！',
            type: 'success'
        })
    }
    //2、请发表日志
    const gbrz = () => {
        ElMessage({
            showClose: true,
            message: '请发表日志！',
            type: 'warning'
        })
    }
    //3、修改成功
    const xg = () => {
        ElMessage({
            showClose: true,
            message: '修改成功！',
            type: 'success'
        })
    }
    //4、已取消
    const qx = () => {
        ElMessage({
            showClose: true,
            message: '已取消！',
        })
    }
    //5、已成功打卡
    const dk = () => {
        ElMessage({
            showClose: true,
            message: '打卡成功！',
            type: 'success'
        })
    }
    //6、打卡失败
    const dksb = () => {
        ElMessage({
            showClose: true,
            message: '已完成下班打卡，当前无需再打卡！',
            type: 'warning'
        })
    }

    //查询员工通讯录
    function cxygphone() {
        axios.get("/cxygphone").then(function (response) {
            ygphoneTable.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //发表日志
    function fabiaorz() {
        if (fabiaoForm.gzrznr == '') {
            gbrz()
            return false;
        }
        axios.post("/fabiaorz", fabiaoForm).then(function (response) {
            xz()
            gztshuaxin()
            return true;
        }).catch(function (error) {
            console.log(error)
        })
        rizhiDialog.value=false
        fabiaoForm.gzrznr = null;
    }

    //我的日志
    function merizhi() {
        axios.get("/meRizhi", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }
        }).then(function (response) {
            data.merizhiData = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }

    //我的日志--分页
    function page() {
        axios.get("/meRizhi", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize
            }
        }).then(function (response) {
            data.merizhiData = response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }

    //已点评日志
    function yidianpingrz() {
        axios.get("/yidianpingrz", {
            params: {
                pageNum: data.pageNum1,
                pageSize: data.pageSize1
            }
        }).then(function (response) {
            data.yidianpingrz = response.data.data.list
            data.total1 = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }

    //已点评日志--分页
    function page1() {
        axios.get("/yidianpingrz", {
            params: {
                pageNum: data.pageNum1,
                pageSize: data.pageSize1
            }
        }).then(function (response) {
            data.yidianpingrz = response.data.data.list
            data.total1 = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }
    //刷新
    function gztshuaxin(){
        axios.get("/cxkqjlByid").then(function (response) {
            data.kaoqinData = response.data.data
            data.rzname=response.data.data[0].rzname
            var kq = [];
            for (var i = 0; i < response.data.data.length; i++) {
                kq.push({
                    kqsbdkzt: response.data.data[i].kqsbzt,
                    kqxbdkzt: response.data.data[i].kqxbzt,
                    xzsj: response.data.data[i].xzsj
                })
            }
            rili.kqzt = kq
        }).catch(function (error) {
            console.log(error)
        })
        axios.get("/tongzhixx").then(function (response) {
            data.tongzhiData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
        axios.get("/gonggaoxx").then(function (response) {
            data.gonggaoData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
        axios.get("/cxbcxx").then(function (response) {
            data.bcqk=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //根据id查询员工考勤记录
    onBeforeMount(() => {
        axios.get("/cxkqjlByid").then(function (response) {
            data.kaoqinData = response.data.data
            data.rzname=response.data.data[0].rzname
            var kq = [];
            for (var i = 0; i < response.data.data.length; i++) {
                kq.push({
                    kqsbdkzt: response.data.data[i].kqsbzt,
                    kqxbdkzt: response.data.data[i].kqxbzt,
                    xzsj: response.data.data[i].xzsj
                })
            }
            rili.kqzt = kq
        }).catch(function (error) {
            console.log(error)
        })
    })
    //根据id查询员工绩效记录
    function jxjl(){
        axios.get("/cxjxjlByid").then(function (response) {
            data.jixiaoData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //根据id查询员工薪资记录
    function xzjl(){
        axios.get("/cxxzjlByid").then(function (response) {
            data.xinziData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //根据id查询员工出差记录
    function ccjl(){
        axios.get("/cxccjlByid").then(function (response) {
            data.chuchaiData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //通知
    onBeforeMount(() => {
        axios.get("/tongzhixx").then(function (response) {
            data.tongzhiData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    })
    //公告
    onBeforeMount(() => {
        axios.get("/gonggaoxx").then(function (response) {
            data.gonggaoData = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    })

    //根据员工id查询员工个人资料
    function gerenziliao() {
        axios.get("/selectgerenzl").then(function (response) {
            data.gerenziliaoxx = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

    //修改员工个人资料
    function updategerenziliao(gerenziliaoxx) {
        axios.put("/updategerenziliao", gerenziliaoxx).then(function (response) {
            xg()
            gztshuaxin()
        }).catch(function (error) {
            console.log(error)
        })
        Yuangongziliao.value=false
    }

    //根据员工id查询员工班次情况
    onBeforeMount(() => {
        axios.get("/cxbcxx").then(function (response) {
            data.bcqk=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    })

    //根据员工id查询当天是否有考勤记录
    function selectkqjlbyDate() {
        axios.get("/selectkqjlbyDate").then(function (response) {
            data.kaoqinjilubiao = response.data.data
            if (data.kaoqinjilubiao == null || data.kaoqinjilubiao.kqxbdksj == null) {
                if (confirm("确定打卡吗？")) {
                    axios.post("/ygdaka").then(function (response) {
                        console.log(response.data.data)
                        dk()
                        gztshuaxin()
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    qx()
                }
            } else {
                dksb()
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    //员工打卡操作
    function ygdk() {
        if (confirm("确定打卡吗？")) {
            axios.post("/ygdaka").then(function (response) {
                console.log(response.data.data)
                dk()
                gztshuaxin()
            }).catch(function (error) {
                console.log(error)
            })
        } else {
            qx()
        }
    }

</script>

<style scoped>
    #top {
        margin-top: 1%;
        width: 99%;
        height: 50px;
        box-shadow: 5px 5px 5px 5px #B3C0D1;
    }

    #middle {
        margin-top: 1%;
    }

    #left {
        float: left;
        width: 49%;
        margin-right: 2%;
        box-shadow: 5px 5px 5px 5px #B3C0D1;
    }

    #right {
        float: left;
        width: 48%;
    }

    #bianjiedaohang {
        /*border: 1px solid black;*/
        box-shadow: 5px 5px 5px 5px #B3C0D1;
    }

    .bianjie {
        margin: 0px 10px 2% 0px;
        width: 110px;
        height: 40px;
    }

    .page {
        margin-top: 5%;
        margin-left: 40%;
    }

    #rili {
        line-height: 20px;
    }

    #rili ::v-deep .el-calendar-day {
        height: auto;
    }

    .wbk{
        width: 500px;
    }
</style>
