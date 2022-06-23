<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tym">
    <el-tab-pane label="薪资记录" name="lll">
      <br>
      <div>
        <el-button style="position: relative;right: -166px;" @click="mohuchaxunyghxz">查询</el-button>
        <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
      </div>
      <div>
        <el-table :data="data.Recruit" height="350" style="width: 100%">
          <el-table-column prop="ybh" label="编号"  />
          <el-table-column prop="rzname" label="姓名"  />
          <el-table-column prop="zwbh" label="职位"  />
          <el-table-column prop="xzjljbgz" label="基本工资"  />
          <el-table-column prop="xzjlsb" label="社保"  />
          <el-table-column prop="szjlze" label="总额"  />
          <el-table-column prop="szjlsj" label="时间"  />
          <el-table-column label="操作" width="200" >
            <template #default=scope v-slot="scope">
              <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />	<!-- 删除 -->
              <el-button size="20px"  type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
                     v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                     @current-change="page" prev-text="上一页" next-text="下一页" />
      <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
        <el-form :model="data.cx" >
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名:">
                <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="性别">
              <el-radio-group v-model="data.cx.rzsex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>


            <el-form-item label="出生日期">
              <el-col :span="14">
                <el-date-picker
                    v-model="data.cx.rzcsrq"
                    type="date"
                    style="width: 200px"
                />
              </el-col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
            <el-form-item label="学历:">
              <el-select v-model="data.cx.rzxl" placeholder="学历">
                <el-option label="硕士" value="硕士" />
                <el-option label="研究生" value="研究生" />
                <el-option label="本科" value="本科" />
                <el-option label="大专" value="大专" />
                <el-option label="高中" value="高中" />
                <el-option label="初中" value="初中" />
                <el-option label="小学" value="小学" />
              </el-select>
            </el-form-item>


            <el-col :span="11">
              <el-form-item label="身份证:">
                <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="联系电话:">
              <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="年龄:">
                <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="现居地址:">
              <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="工作经验:">
                <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
              </el-form-item>
            </el-col>
            <el-form-item label="婚姻状况:">
              <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
                <el-option label="已婚" value="已婚" />
                <el-option label="未婚" value="未婚" />
                <el-option label="丧偶" value="丧偶" />
                <el-option label="离婚" value="离婚" />
              </el-select>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="政治面貌:">
                <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
                  <el-option label="少先队员" value="少先队员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="名族:">
              <el-select v-model="data.cx.rzmz" placeholder="名族">
                <el-option label="汉族" value="汉族" />
                <el-option label="壮族" value="壮族" />
                <el-option label="回族" value="回族" />
                <el-option label="满族" value="满族" />
                <el-option label="维吾尔族" value="维吾尔族" />
                <el-option label="苗族" value="苗族" />
                <el-option label="彝族" value="彝族" />
                <el-option label="土家族" value="土家族" />
                <el-option label="藏族" value="藏族" />
                <el-option label="蒙古族" value="蒙古族" />
                <el-option label="侗族" value="侗族" />
                <el-option label="布依族" value="布依族" />
                <el-option label="瑶族" value="瑶族" />
                <el-option label="白族" value="白族" />
                <el-option label="朝鲜族" value="朝鲜族" />
                <el-option label="哈尼族" value="哈尼族" />
                <el-option label="黎族" value="黎族" />
                <el-option label="哈萨克族" value="哈萨克族" />
                <el-option label="傣族" value="傣族" />
                <el-option label="畲族" value="畲族" />
                <el-option label="傈僳族" value="傈僳族" />
                <el-option label="东乡族" value="东乡族" />
                <el-option label="仡佬族" value="仡佬族" />
                <el-option label="拉祜族" value="拉祜族" />
                <el-option label="佤族" value="佤族" />
                <el-option label="水族" value="水族" />
                <el-option label="纳西族" value="纳西族" />
                <el-option label="羌族" value="羌族" />
                <el-option label="土族" value="土族" />
                <el-option label="仫佬族" value="仫佬族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="锡伯族" value="锡伯族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="达斡尔族" value="达斡尔族" />
                <el-option label="撒拉族" value="撒拉族" />
              </el-select>
            </el-form-item>

          </el-row>
        </el-form>
        <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

        </template>
      </el-dialog>
    </el-tab-pane>

    <el-tab-pane label="考勤记录" name="first" >
      <br>
      <div>

        <el-button style="position: relative;right: -166px;" @click="mohuchaxunkqjl">查询</el-button>
        <el-input v-model="data2.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
      </div>
      <div>
        <el-table :data="data2.kaoqin" height="350" style="width: 100%">
          <el-table-column prop="ybh" label="编号"  />
          <el-table-column prop="rzname" label="姓名"  />
          <el-table-column prop="rzsex" label="性别"  />
          <el-table-column prop="kqsbdksj" label="上班打卡时间"  />
          <el-table-column  label="上班打卡状态" >
            <template #default="scope">
              <span v-if="scope.row.kqsbzt==1">正常</span>
              <span v-else-if="scope.row.kqsbzt==2">迟到</span>
              <span v-else-if="scope.row.kqsbzt==3">早退</span>
              <span v-else-if="scope.row.kqsbzt==4">未打卡</span>
            </template>
          </el-table-column>
          <el-table-column prop="kqxbdksj" label="下班打卡时间"  />
          <el-table-column  label="下班打卡状态" >
            <template #default="scope">
              <span v-if="scope.row.kqxbzt==1">正常</span>
              <span v-else-if="scope.row.kqxbzt==2">迟到</span>
              <span v-else-if="scope.row.kqxbzt==3">早退</span>
              <span v-else-if="scope.row.kqxbzt==4">未打卡</span>
            </template>
          </el-table-column>
          <el-table-column prop="xzsj" label="时间"  />
          <el-table-column label="操作" width="200" >
            <template #default=scope v-slot="scope">
              <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />	<!-- 删除 -->
              <el-button size="20px"  type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data2.pageNum"
                     v-model:page-size="this.data2.pageSize" layout="prev,pager,next" :total="this.data2.total"
                     @current-change="kkkkaoqin2" prev-text="上一页" next-text="下一页" />
      <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
        <el-form :model="data.cx" >
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名:">
                <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="性别">
              <el-radio-group v-model="data.cx.rzsex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>


            <el-form-item label="出生日期">
              <el-col :span="14">
                <el-date-picker
                    v-model="data.cx.rzcsrq"
                    type="date"
                    style="width: 200px"
                />
              </el-col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
            <el-form-item label="学历:">
              <el-select v-model="data.cx.rzxl" placeholder="学历">
                <el-option label="硕士" value="硕士" />
                <el-option label="研究生" value="研究生" />
                <el-option label="本科" value="本科" />
                <el-option label="大专" value="大专" />
                <el-option label="高中" value="高中" />
                <el-option label="初中" value="初中" />
                <el-option label="小学" value="小学" />
              </el-select>
            </el-form-item>


            <el-col :span="11">
              <el-form-item label="身份证:">
                <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="联系电话:">
              <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="年龄:">
                <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="现居地址:">
              <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="工作经验:">
                <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
              </el-form-item>
            </el-col>
            <el-form-item label="婚姻状况:">
              <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
                <el-option label="已婚" value="已婚" />
                <el-option label="未婚" value="未婚" />
                <el-option label="丧偶" value="丧偶" />
                <el-option label="离婚" value="离婚" />
              </el-select>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="政治面貌:">
                <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
                  <el-option label="少先队员" value="少先队员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="名族:">
              <el-select v-model="data.cx.rzmz" placeholder="名族">
                <el-option label="汉族" value="汉族" />
                <el-option label="壮族" value="壮族" />
                <el-option label="回族" value="回族" />
                <el-option label="满族" value="满族" />
                <el-option label="维吾尔族" value="维吾尔族" />
                <el-option label="苗族" value="苗族" />
                <el-option label="彝族" value="彝族" />
                <el-option label="土家族" value="土家族" />
                <el-option label="藏族" value="藏族" />
                <el-option label="蒙古族" value="蒙古族" />
                <el-option label="侗族" value="侗族" />
                <el-option label="布依族" value="布依族" />
                <el-option label="瑶族" value="瑶族" />
                <el-option label="白族" value="白族" />
                <el-option label="朝鲜族" value="朝鲜族" />
                <el-option label="哈尼族" value="哈尼族" />
                <el-option label="黎族" value="黎族" />
                <el-option label="哈萨克族" value="哈萨克族" />
                <el-option label="傣族" value="傣族" />
                <el-option label="畲族" value="畲族" />
                <el-option label="傈僳族" value="傈僳族" />
                <el-option label="东乡族" value="东乡族" />
                <el-option label="仡佬族" value="仡佬族" />
                <el-option label="拉祜族" value="拉祜族" />
                <el-option label="佤族" value="佤族" />
                <el-option label="水族" value="水族" />
                <el-option label="纳西族" value="纳西族" />
                <el-option label="羌族" value="羌族" />
                <el-option label="土族" value="土族" />
                <el-option label="仫佬族" value="仫佬族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="锡伯族" value="锡伯族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="达斡尔族" value="达斡尔族" />
                <el-option label="撒拉族" value="撒拉族" />
              </el-select>
            </el-form-item>

          </el-row>
        </el-form>
        <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

        </template>
      </el-dialog>

    </el-tab-pane>
    <el-tab-pane label="面试记录" name="second">
      <br>
      <div>

        <el-button style="position: relative;right: -166px;" @click="mohumianshijl">查询</el-button>
        <el-input v-model="data3.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
      </div>
      <div>
        <el-table :data="data3.Mianshi" height="350" style="width: 100%">
          <el-table-column prop="rid" label="编号"  />
          <el-table-column prop="rzname" label="姓名"  />
          <el-table-column prop="rzsex" label="性别"  />
          <el-table-column prop="mjsj" label="面试时间"  />
          <el-table-column  label="状态" >
            <template #default="scope">
              <span v-if="scope.row.mjzt==1">通过</span>
              <span v-else-if="scope.row.mjzt==2">未通过</span>
              <span v-else-if="scope.row.mjzt==3">未面试</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" >
            <template #default=scope v-slot="scope">
              <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />	<!-- 删除 -->
              <el-button size="20px"  type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data3.pageNum"
                     v-model:page-size="this.data3.pageSize" layout="prev,pager,next" :total="this.data3.total"
                     @current-change="mianshi2" prev-text="上一页" next-text="下一页" />
      <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
        <el-form :model="data.cx" >
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名:">
                <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="性别">
              <el-radio-group v-model="data.cx.rzsex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>


            <el-form-item label="出生日期">
              <el-col :span="14">
                <el-date-picker
                    v-model="data.cx.rzcsrq"
                    type="date"
                    style="width: 200px"
                />
              </el-col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
            <el-form-item label="学历:">
              <el-select v-model="data.cx.rzxl" placeholder="学历">
                <el-option label="硕士" value="硕士" />
                <el-option label="研究生" value="研究生" />
                <el-option label="本科" value="本科" />
                <el-option label="大专" value="大专" />
                <el-option label="高中" value="高中" />
                <el-option label="初中" value="初中" />
                <el-option label="小学" value="小学" />
              </el-select>
            </el-form-item>


            <el-col :span="11">
              <el-form-item label="身份证:">
                <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="联系电话:">
              <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="年龄:">
                <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="现居地址:">
              <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="工作经验:">
                <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
              </el-form-item>
            </el-col>
            <el-form-item label="婚姻状况:">
              <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
                <el-option label="已婚" value="已婚" />
                <el-option label="未婚" value="未婚" />
                <el-option label="丧偶" value="丧偶" />
                <el-option label="离婚" value="离婚" />
              </el-select>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="政治面貌:">
                <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
                  <el-option label="少先队员" value="少先队员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="名族:">
              <el-select v-model="data.cx.rzmz" placeholder="名族">
                <el-option label="汉族" value="汉族" />
                <el-option label="壮族" value="壮族" />
                <el-option label="回族" value="回族" />
                <el-option label="满族" value="满族" />
                <el-option label="维吾尔族" value="维吾尔族" />
                <el-option label="苗族" value="苗族" />
                <el-option label="彝族" value="彝族" />
                <el-option label="土家族" value="土家族" />
                <el-option label="藏族" value="藏族" />
                <el-option label="蒙古族" value="蒙古族" />
                <el-option label="侗族" value="侗族" />
                <el-option label="布依族" value="布依族" />
                <el-option label="瑶族" value="瑶族" />
                <el-option label="白族" value="白族" />
                <el-option label="朝鲜族" value="朝鲜族" />
                <el-option label="哈尼族" value="哈尼族" />
                <el-option label="黎族" value="黎族" />
                <el-option label="哈萨克族" value="哈萨克族" />
                <el-option label="傣族" value="傣族" />
                <el-option label="畲族" value="畲族" />
                <el-option label="傈僳族" value="傈僳族" />
                <el-option label="东乡族" value="东乡族" />
                <el-option label="仡佬族" value="仡佬族" />
                <el-option label="拉祜族" value="拉祜族" />
                <el-option label="佤族" value="佤族" />
                <el-option label="水族" value="水族" />
                <el-option label="纳西族" value="纳西族" />
                <el-option label="羌族" value="羌族" />
                <el-option label="土族" value="土族" />
                <el-option label="仫佬族" value="仫佬族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="锡伯族" value="锡伯族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="达斡尔族" value="达斡尔族" />
                <el-option label="撒拉族" value="撒拉族" />
              </el-select>
            </el-form-item>

          </el-row>
        </el-form>
        <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

        </template>
      </el-dialog>

    </el-tab-pane>
    <el-tab-pane label="绩效记录" name="third">
      <br>
      <div>

        <el-button style="position: relative;right: -166px;" @click="mohuchaxunjxjl">查询</el-button>
        <el-input v-model="data4.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
      </div>
      <div>
        <el-table :data="data4.Jixiao" height="350" style="width: 100%">
          <el-table-column prop="ybh" label="编号"  />
          <el-table-column prop="rzname" label="姓名"  />
          <el-table-column prop="rzsex" label="性别"  />s
          <el-table-column prop="jnr" label="绩效内容"  />
          <el-table-column prop="jmc" label="绩效考核名称"  />
          <el-table-column label="操作" width="200" >
            <template #default=scope v-slot="scope">
              <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />	<!-- 删除 -->
              <el-button size="20px"  type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data4.pageNum"
                     v-model:page-size="this.data4.pageSize" layout="prev,pager,next" :total="this.data4.total"
                     @current-change="jixiao2" prev-text="上一页" next-text="下一页" />
      <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
        <el-form :model="data.cx" >
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名:">
                <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="性别">
              <el-radio-group v-model="data.cx.rzsex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>


            <el-form-item label="出生日期">
              <el-col :span="14">
                <el-date-picker
                    v-model="data.cx.rzcsrq"
                    type="date"
                    style="width: 200px"
                />
              </el-col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
            <el-form-item label="学历:">
              <el-select v-model="data.cx.rzxl" placeholder="学历">
                <el-option label="硕士" value="硕士" />
                <el-option label="研究生" value="研究生" />
                <el-option label="本科" value="本科" />
                <el-option label="大专" value="大专" />
                <el-option label="高中" value="高中" />
                <el-option label="初中" value="初中" />
                <el-option label="小学" value="小学" />
              </el-select>
            </el-form-item>


            <el-col :span="11">
              <el-form-item label="身份证:">
                <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="联系电话:">
              <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="年龄:">
                <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="现居地址:">
              <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="工作经验:">
                <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
              </el-form-item>
            </el-col>
            <el-form-item label="婚姻状况:">
              <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
                <el-option label="已婚" value="已婚" />
                <el-option label="未婚" value="未婚" />
                <el-option label="丧偶" value="丧偶" />
                <el-option label="离婚" value="离婚" />
              </el-select>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="政治面貌:">
                <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
                  <el-option label="少先队员" value="少先队员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="名族:">
              <el-select v-model="data.cx.rzmz" placeholder="名族">
                <el-option label="汉族" value="汉族" />
                <el-option label="壮族" value="壮族" />
                <el-option label="回族" value="回族" />
                <el-option label="满族" value="满族" />
                <el-option label="维吾尔族" value="维吾尔族" />
                <el-option label="苗族" value="苗族" />
                <el-option label="彝族" value="彝族" />
                <el-option label="土家族" value="土家族" />
                <el-option label="藏族" value="藏族" />
                <el-option label="蒙古族" value="蒙古族" />
                <el-option label="侗族" value="侗族" />
                <el-option label="布依族" value="布依族" />
                <el-option label="瑶族" value="瑶族" />
                <el-option label="白族" value="白族" />
                <el-option label="朝鲜族" value="朝鲜族" />
                <el-option label="哈尼族" value="哈尼族" />
                <el-option label="黎族" value="黎族" />
                <el-option label="哈萨克族" value="哈萨克族" />
                <el-option label="傣族" value="傣族" />
                <el-option label="畲族" value="畲族" />
                <el-option label="傈僳族" value="傈僳族" />
                <el-option label="东乡族" value="东乡族" />
                <el-option label="仡佬族" value="仡佬族" />
                <el-option label="拉祜族" value="拉祜族" />
                <el-option label="佤族" value="佤族" />
                <el-option label="水族" value="水族" />
                <el-option label="纳西族" value="纳西族" />
                <el-option label="羌族" value="羌族" />
                <el-option label="土族" value="土族" />
                <el-option label="仫佬族" value="仫佬族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="锡伯族" value="锡伯族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="达斡尔族" value="达斡尔族" />
                <el-option label="撒拉族" value="撒拉族" />
              </el-select>
            </el-form-item>

          </el-row>
        </el-form>
        <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

        </template>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="出差记录" name="fourth">
      <br>
      <div>

        <el-button style="position: relative;right: -166px;" @click="mohuchaxunchuchaijl">查询</el-button>
        <el-input v-model="data6.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
      </div>
      <div>
        <el-table :data="data6.chuhcai" height="350" style="width: 100%">
          <el-table-column prop="ybh" label="编号"  />
          <el-table-column prop="rzname" label="姓名"  />
          <el-table-column prop="rzsex" label="性别"  />s
          <el-table-column prop="ccfd" label="出发地"  />
          <el-table-column prop="cmdd" label="目的地"  />
          <el-table-column prop="ckssj" label="开始时间"  />
          <el-table-column prop="cyjsj" label="预计回来时间"  />
          <el-table-column prop="csjsj" label="实际回来时间"  />
          <el-table-column prop="cccnr" label="出差内容"  />
          <el-table-column  label="状态" >
            <template #default="scope">
              <span v-if="scope.row.czt==1">未出发</span>
              <span v-else-if="scope.row.czt==2">出差中</span>
              <span v-else-if="scope.row.czt==3">已回来</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" >
            <template #default=scope v-slot="scope">
              <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />	<!-- 删除 -->
              <el-button size="20px"  type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data6.pageNum"
                     v-model:page-size="this.data6.pageSize" layout="prev,pager,next" :total="this.data6.total"
                     @current-change="chuchai2" prev-text="上一页" next-text="下一页" />
      <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
        <el-form :model="data.cx" >
          <el-row>
            <el-col :span="11">
              <el-form-item label="姓名:">
                <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="性别">
              <el-radio-group v-model="data.cx.rzsex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>


            <el-form-item label="出生日期">
              <el-col :span="14">
                <el-date-picker
                    v-model="data.cx.rzcsrq"
                    type="date"
                    style="width: 200px"
                />
              </el-col>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </el-form-item>
            <el-form-item label="学历:">
              <el-select v-model="data.cx.rzxl" placeholder="学历">
                <el-option label="硕士" value="硕士" />
                <el-option label="研究生" value="研究生" />
                <el-option label="本科" value="本科" />
                <el-option label="大专" value="大专" />
                <el-option label="高中" value="高中" />
                <el-option label="初中" value="初中" />
                <el-option label="小学" value="小学" />
              </el-select>
            </el-form-item>


            <el-col :span="11">
              <el-form-item label="身份证:">
                <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="联系电话:">
              <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="年龄:">
                <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-form-item label="现居地址:">
              <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="工作经验:">
                <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
              </el-form-item>
            </el-col>
            <el-form-item label="婚姻状况:">
              <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
                <el-option label="已婚" value="已婚" />
                <el-option label="未婚" value="未婚" />
                <el-option label="丧偶" value="丧偶" />
                <el-option label="离婚" value="离婚" />
              </el-select>
            </el-form-item>

            <el-col :span="11">
              <el-form-item label="政治面貌:">
                <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
                  <el-option label="少先队员" value="少先队员" />
                  <el-option label="共青团员" value="共青团员" />
                  <el-option label="中共党员" value="中共党员" />
                  <el-option label="群众" value="群众" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item label="名族:">
              <el-select v-model="data.cx.rzmz" placeholder="名族">
                <el-option label="汉族" value="汉族" />
                <el-option label="壮族" value="壮族" />
                <el-option label="回族" value="回族" />
                <el-option label="满族" value="满族" />
                <el-option label="维吾尔族" value="维吾尔族" />
                <el-option label="苗族" value="苗族" />
                <el-option label="彝族" value="彝族" />
                <el-option label="土家族" value="土家族" />
                <el-option label="藏族" value="藏族" />
                <el-option label="蒙古族" value="蒙古族" />
                <el-option label="侗族" value="侗族" />
                <el-option label="布依族" value="布依族" />
                <el-option label="瑶族" value="瑶族" />
                <el-option label="白族" value="白族" />
                <el-option label="朝鲜族" value="朝鲜族" />
                <el-option label="哈尼族" value="哈尼族" />
                <el-option label="黎族" value="黎族" />
                <el-option label="哈萨克族" value="哈萨克族" />
                <el-option label="傣族" value="傣族" />
                <el-option label="畲族" value="畲族" />
                <el-option label="傈僳族" value="傈僳族" />
                <el-option label="东乡族" value="东乡族" />
                <el-option label="仡佬族" value="仡佬族" />
                <el-option label="拉祜族" value="拉祜族" />
                <el-option label="佤族" value="佤族" />
                <el-option label="水族" value="水族" />
                <el-option label="纳西族" value="纳西族" />
                <el-option label="羌族" value="羌族" />
                <el-option label="土族" value="土族" />
                <el-option label="仫佬族" value="仫佬族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="锡伯族" value="锡伯族" />
                <el-option label="柯尔克孜族" value="柯尔克孜族" />
                <el-option label="达斡尔族" value="达斡尔族" />
                <el-option label="撒拉族" value="撒拉族" />
              </el-select>
            </el-form-item>

          </el-row>
        </el-form>
        <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

        </template>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {onBeforeMount, reactive} from "vue";
import axios from '../axios'
import {
  ref
} from 'vue'
import {
  Delete
} from '@element-plus/icons-vue'
const dialogFormVisible = ref(false)
import {ElNotification} from 'element-plus'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('lll')
function mohumianshijl(){
  axios.get("/mohumianshijl?rzname="+data3.rzname).then(function(response){
    data3.Mianshi=response.data.data
    console.log(response.data.data.users)
  })
}
function mohuchaxunchuchaijl(){
  axios.get("/mohuchaxunchuchaijl?rzname="+data6.rzname).then(function(response){
    data6.chuhcai=response.data.data
    console.log(response.data.data.users)
  })
}
function mohuchaxunjxjl(){
  axios.get("/mohuchaxunjxjl?rzname="+data4.rzname).then(function(response){
    data4.Jixiao=response.data.data
    console.log(response.data.data.users)
  })
}
function mohuchaxunkqjl(){
  axios.get("/mohuchaxunkqjl?rzname="+data2.rzname).then(function(response){

    data2.kaoqin=response.data.data
    console.log(response.data.data.kaoqin)
  })
}

function  tym(TabsPaneContext,Event){
  if(TabsPaneContext.props.label=='薪资记录'){
    reload()
  }else if(TabsPaneContext.props.label=='考勤记录'){
    kkkkaoqin()
  }else if (TabsPaneContext.props.label=='面试记录'){
    mianshi()
  }else if (TabsPaneContext.props.label=='绩效记录'){
    jixiao(),
    jixiao2()
  }else if (TabsPaneContext.props.label=='出差记录'){
    chuchai(),
    chuchai2()
  }

}
var data4 = reactive({
  Jixiao:[], //存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,
  cx:{},
  rzname:''

})
var data = reactive({
  Recruit: [],//存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,
  cx:{},
  rzname:''

})
var data2 = reactive({
  kaoqin:[],
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,
  cx:{},
  rzname:''

})
var data3 = reactive({
  Mianshi:[],
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,
  cx:{},
  rzname:''

})
var data6 = reactive({
  chuhcai: [],//存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,
  cx:{},
  rzname:''

})
function  chuchai2(){
  axios.get("/chuchaijilu", {
    params: {
      pageNum: data6.pageNum,
      pageSize: data6.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data6.chuhcai = response.data.data.list
    data6.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
function  chuchai(){
  axios.get("/chuchaijilu", {
    params: {
      pageNum: data6.pageNum,
      pageSize: data6.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data6.chuhcai = response.data.data.list
    data6.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
const open1 = () => {
  ElNotification({
    title: '删除',
    message: '删除成功',
    type: 'success',
  })
}
function  jixiao2(){
  axios.get("/jixiaojilu", {
    params: {
      pageNum: data4.pageNum,
      pageSize: data4.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data4.Jixiao = response.data.data.list
    data4.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
function  jixiao(){
  axios.get("/jixiaojilu", {
    params: {
      pageNum: data4.pageNum,
      pageSize: data4.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data4.Jixiao = response.data.data.list
    data4.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
function  mianshi2(){
  axios.get("/mianshijilu", {
    params: {
      pageNum: data3.pageNum,
      pageSize: data3.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data3.Mianshi = response.data.data.list
    data3.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
function  mianshi(){
  axios.get("/mianshijilu", {
    params: {
      pageNum: data3.pageNum,
      pageSize: data3.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data3.Mianshi = response.data.data.list
    data3.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
function  reload(){
  axios.get("/findusersxinzi", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
}
//考勤
function kkkkaoqin(){
  axios.get("/kaoqinjilu", {
    params: {
      pageNum: data2.pageNum,
      pageSize: data2.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data2.kaoqin = response.data.data.list
    data2.total = response.data.data.total
    console.log(response.data.data.kaoqin)

  }).catch(function(error) {
    console.log(error)
  })
}
function kkkkaoqin2(){
  axios.get("/kaoqinjilu", {
    params: {
      pageNum: data2.pageNum,
      pageSize: data2.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data2.kaoqin = response.data.data.list
    data2.total = response.data.data.total
    console.log(response.data.data.kaoqin)

  }).catch(function(error) {
    console.log(error)
  })
}
onBeforeMount(() => {
  axios.get("/findusersxinzi", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
})

function mohuchaxunyghxz(){
  axios.get("/mohuchaxunyghxzzz?rzname="+data.rzname).then(function(response){
    data.Recruit=response.data.data
    console.log(response.data.data.users)
  })
}
const del=(ybh)=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.post("/delete/"+ybh).then(function(response){
      if (response.data.code==200){
        console.log(response.data.data)
        open1()
        reload()
      }
      reload()
    }).catch(function(error){

    })
  })
}

function xiugai(rzbh){
  axios.put("/updata",data.cx).then(function(response){
    reload()
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }
  }).catch(function(error){
    return
  })
}
import { ElMessageBox } from 'element-plus'
//根据id查询，将这条数据显示在修改页面中
function a(rzbh){
  console.log("用户id2222222222"+rzbh)
  axios.get("/selectidd/"+rzbh)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
      })
}
function page() {
  axios.get("/findusersxinzi", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    data.total = response.data.data.total
    data.Recruit = response.data.data.list

  }).catch(function(error) {
    console.log(error)
  })
}

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>