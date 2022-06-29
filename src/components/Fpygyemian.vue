<template>
  <div>
    <div style="margin-top: 10px">
      <el-input @input="chaxuncd" v-model="cxtj" style="width: 200px;margin-right: 10px" placeholder="请输入菜单名称"/><el-button type="primary" @click="this.dialogVisibletwo=true">添加菜单</el-button>

      <el-select    placeholder="请选择" style="margin-left: 30px;width:120px">
        <el-option value="" label="取消" @click="this.findallqd(1,this.cxtj,'')"></el-option>
        <el-option v-for="a in fjqd" :value="a.qdbid" :label="a.qdcdmc" @click="this.findallqd(1,this.cxtj,a.qdbid)"/>
      </el-select>
    </div>
    <div style="height: 238px;margin-top: 10px">
      <el-table :data="cdlist" style="width: 100%">
        <el-table-column width="100px"/>
        <el-table-column  label="序号" type="index" width="180"/>
        <el-table-column  label="路由地址" width="230" >
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdlydz"/>
          </template>
        </el-table-column>

        <el-table-column label="路由名称" width="230" >
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdlymc"/>
          </template>
        </el-table-column>

        <el-table-column  label="组件名称" width="230">
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdzjmc"/>
          </template>
        </el-table-column>

        <el-table-column  label="菜单名称"  width="230">
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdcdmc"/>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" @click="updatecd(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: center;margin-top: 10px">
      <el-pagination background layout="prev, pager, next" :total="zts" @current-change="xiayiye" @next-click="xiayiye" @prev-click="xiayiye" />
    </div>
    <el-dialog
        v-model="dialogVisibletwo"
        title="添加菜单"
        width="30%"
        destroy-on-close="true"
    >
      <strong>父级菜单:</strong>
      <el-select v-model="cdstl.qdfjid"   placeholder="请选择" style="margin-left: 30px;width:180px">
        <el-option v-for="a in fjqd" :value="a.qdbid" :label="a.qdcdmc" />
      </el-select><br>
      <strong>路由地址:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px" v-model="cdstl.qdlydz"/><br>
      <strong>路由名称:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px"  v-model="cdstl.qdlymc"/><br>
      <strong>组件名称:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px"  v-model="cdstl.qdzjmc"/><br>
      <strong>菜单名称:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px"  v-model="cdstl.qdcdmc"/><br>

      <el-button style="margin-top: 10px" type="danger" @click="this.dialogVisibletwo=false">取消</el-button>
      <el-button style="margin-top: 10px" type="primary" @click="insertcd">确定</el-button>
    </el-dialog>
  </div>


  <div>
    <div>
      <el-input @input="findallqdym(this.cxtj2)" v-model="cxtj2" style="width: 200px;margin-top: 10px;margin-right: 10px" placeholder="请输入角色名称"/>
    </div>
    <div style="height: 238px;margin-top: 10px">
      <el-table :data="qdlist" height="238px" style="width: 100%">
        <el-table-column width="100"/>
        <el-table-column type="index" label="序号" width="180"/>
        <el-table-column prop="jsmc" label="角色名称" width="180" />
        <el-table-column  label="菜单名称"  width="280">
          <template #default="scope" >
            <el-tag v-for="a in scope.row.qdlist"   @close="shanchucd(scope.row.jsbh,a.qdbid)"  closable>{{a.qdcdmc}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope" >
            <el-button  type="success" @click="chaxunwfpcd(scope.row.jsbh,scope.row.qdlist)">分配菜单</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>


    <el-dialog
        v-model="dialogVisibletao"
        title="分配菜单"
        width="40%"
        destroy-on-close="true"
    >
      <el-table  @select-all="xuanzhong" @select="xuanzhong" :data="wfpcdlist" height="300px" style="width: 100%;">
        <el-table-column width="50"/>
        <el-table-column type="selection"   width="100"/>
        <el-table-column type="index" label="序号" width="180"/>
        <el-table-column prop="qdcdmc" label="菜单名称" />
      </el-table>



      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibletao = false">关闭</el-button>
        <el-button type="primary" @click="xinzen"
        >确定</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../axios";
import {Edit,Delete,Check} from "@element-plus/icons-vue";
export default {
  name: "Fpygyemian",
  data(){
    return{
      Check:Check,
      cdlist:[],
      qdlist:[],
      zts:0,
      cxtj:'',
      cxtj2:'',
      dialogVisibletwo:false,
      dialogVisibletao:false,
      cdstl:{
        qdlydz:'',
        qdlymc:'',
        qdzjmc:'',
        qdcdmc:'',
        qdfjid:''
      },
      fjqd:[],
      wfpcdlist:[],
      fpcdlist:{
        xzcdlist:[],
        jsidd:''
      }

    }
  },
  methods:{
    findallqd(ym,cxtj,cxtjj){
      axios.get("/findallqd?ym="+ym+"&cxtj="+cxtj+"&qdfjid="+cxtjj).then((e)=>{
        this.cdlist=e.data.data.cdlsit
        this.zts=e.data.data.zts*10
        this.fjqd=e.data.data.fjqd
      })
    },
    findallqdym(cxtj){
      axios.get("/findallqdym?cxtj="+cxtj).then((e)=>{
          this.qdlist=e.data.data.qdlist;
      })
    },
    xiayiye(ym){
      this.findallqd(ym,this.cxtj,'')
    },
    chaxuncd(){
      this.findallqd(1,this.cxtj,'')
    },
    updatecd(qd){
      axios.post("/updatecd",qd).then((e)=>{
        if (e.data.data>0){
          this.$message.success("修改成功！")
          this.findallqd(1,"",'');
        }
      })
    },
    insertcd(){
      axios.post("/insertcd",this.cdstl).then((e)=>{
        if (e.data.data>0){
          this.$message.success("新增成功")
          this.cdstl={}
          this.dialogVisibletwo=false
          this.findallqd(1,"",'')
        }
      })
    },
    shanchucd(jsid,qdid){
      axios.get("/shanchucd?jsid="+jsid+"&qdid="+qdid).then((e)=>{
            if (e.data.data>0){
              this.findallqdym('');
            }
      })
    },
    chaxunwfpcd(jsbh,qdlist){
      this.dialogVisibletao=true;
      this.fpcdlist.jsidd=jsbh;
      axios.post("/chaxunwfpcd",qdlist).then((e)=>{
         this.wfpcdlist=e.data.data
      })
    },
    xuanzhong(selection, row){
        this.fpcdlist.xzcdlist=selection
    },
    xinzen(){
      axios.post("/xinzengcaidan",this.fpcdlist).then((e)=>{
        if(e.data.data>0){
          this.fpcdlist={}
          this.dialogVisibletao=false
          this.findallqdym('')
        }
      })
    }

  },
  created() {
    this.findallqd(1,this.cxtj,'')
    this.findallqdym(this.cxtj2);
  }
}
</script>

<style scoped>

</style>