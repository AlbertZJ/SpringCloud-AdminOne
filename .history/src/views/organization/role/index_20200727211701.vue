<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.code"
        style="width: 200px;"
        class="filter-item"
        placeholder="角色代码"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="角色名"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="handleFilter"
      />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>
    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center" label="ID" />
      <el-table-column width="180px" align="center" label="角色号">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="角色代码">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="角色名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedBy }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="90" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createdBy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            修改
          </el-button>
          <el-button type="primary" size="mini" @click="handleAuth(scope.row.id)">
            授权
          </el-button>
          <el-button type="danger" size="mini" @click="deleteRole(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页工具条-->
    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--添加或编辑对话框-->
    <el-dialog title="新增/修改" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        status-icon
        style="width: 80%; margin-left:30px;"
      >
        <el-form-item label="角色代码" prop="code">
          <el-input v-model="temp.code" placeholder="建议为角色名的英文，首字母大写" maxlength="60" suffix-icon="el-icon-edit" clearable />
        </el-form-item>
        <el-form-item label="角色名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入角色名" maxlength="40" suffix-icon="el-icon-edit" clearable />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="temp.description"
            type="textarea"
            :rows="2"
            maxlength="150"
            show-word-limit
            placeholder="请输入描述内容"
          />
        </el-form-item>
      </el-form>
      <!--对话框动作按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="授权" :visible.sync="authFormVisible">
      <el-tree
        ref="tree"
        class="filter-tree"
        node-key="id"
        lazy
        show-checkbox
        :load="loadNode"
        :data="treeData"
        :props="defaultProps"
        :default-checked-keys="temp.resourceIds"
        :default-expand-all="true"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="authFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateAuth">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryRole, createRole, updateRole, deleteRole, getRole } from '@/api/organization/role'
import { getAllResources, fetchResourceByParentId, queryAllResource } from '@/api/organization/resource'
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'RoleManagement',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        deleted: 'info',
        ok: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        status: 'ok',
        current: 1,
        size: 10
      },
      form: {
        parentId: undefined,
        id: undefined,
        name: '',
        code: '',
        type: '',
        url: '',
        method: '',
        description: '',
        createdTime: '',
        createdBy: '',
        updatedTime: '',
        updatedBy: ''
      },
      // 树数据
      treeData: [],
      labelPosition: 'right',
      resourceList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogStatus: 'create',
      dialogFormVisible: false,
      authFormVisible: false,
      rules: {
        code: [{ required: true, message: '角色代码必填', trigger: 'blur' }],
        name: [{ required: true, message: '角色名必填', trigger: 'blur' }]
      },
      checkAll: false,
      resources: [],
      isIndeterminate: true,
      temp: {
        code: '',
        name: '',
        description: '',
        resourceIds: []
      },
      downloadLoading: false
    }
  },
  created() {
    this.queryRole()
  },
  methods: {

    /**
       * 根据父节点id，查询子节点
       * @param parentId 父节点id
       */
    fetchResourceByParentId(parentId) {
      fetchResourceByParentId(parentId).then(response => {
        this.treeData = response.data
      })
    },
    /**
       * 搜索node节点
       */
    filterNode() {
    },
    getCurrentKey(data) {
      this.$alert(data)
    },
    /**
       * 获取节点数据
       * @param data
       */
    getNodeData(currentData, isCheck) {
      if (!currentData.children.length && isCheck) {
        const currentCode = currentData.code
        const $current = Array.from(this.$refs.dataTree.$children).filter($child => { return $child.node.data.code === currentCode })[0]
        $current.$el.childNodes[0].childNodes[0].click()
      }
    },
    /**
       * 查询列表
       */
    queryRole() {
      this.listLoading = true
      queryRole(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.queryRole()
    },
    /**
       * 资源列表
       */
    getResources(isShow) {
      if (isShow) {
        getAllResources().then(response => {
          this.resourceList = response.data
        })
      }
    },
    /**
       * 资源列表
       */
    getResources(isShow) {
      if (isShow) {
        getAllResources().then(response => {
          this.resourceList = response.data
        })
      }
    },
    /**
       * 修改每页显示条数
       */
    handleSizeChange(val) {
      this.listQuery.size = val
      this.queryRole()
    },
    /**
       * 跳转到指定页
       */
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.queryRole()
    },
    /**
       * 弹出新增角色对话框
       */
    handleCreate() {
      this.temp = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
       * 新增角色
       */
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRole(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '创建成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.queryRole()
          })
        }
      })
    },
    /**
       * 点击授权按钮
       */
    handleAuth(id) {
      // this.fetchResourceByParentId('-1')
      this.temp.id = id
      this.temp.resourceIds = []
      // 查询所有资源
      this.fetchResourceByParentId('-1')
      this.authFormVisible = true
      // 查询角色详细信息，拿到已授权的角色id
      // this.$alert("user:"+id)
      getRole(id).then(response => {
        // this.$alert("response.data.resourceIds:"+response.data.resourceIds)
        this.temp.resourceIds = response.data.resourceIds
      })
    },
    /**
       * 加载树数据
       * @param node 树节点
       * @param resolve
       *
       */
    loadNode(node, resolve) {
      fetchResourceByParentId(node.data.id).then(response => {
        resolve(response.data)
      })
    },
    /**
       * 全选权限选项
       */
    handleCheckAllChange(val) {
      const ids = []
      for (let i = 0; i < this.resources.length; i++) {
        ids.push(this.resources[i].id)
      }
      this.temp.resourceIds = val ? ids : []
      this.isIndeterminate = false
    },
    /**
       * 选中选项
       */
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.resources.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.resources.length
    },
    /**
       * 更新权限
       */
    updateAuth() {
      const temp = {
        id: this.temp.id,
        resourceIds: this.$refs.tree.getCheckedKeys()
      }
      console.log(temp)
      // this.$alert(temp)
      updateRole(temp).then(() => {
        this.authFormVisible = false
        this.$notify({
          title: '权限编辑成功s',
          message: '权限编辑成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    /**
       * 点击更新按钮
       */
    handleUpdate(row) {
      this.temp = Object.assign({}, row)// copy obj
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
       * 更新角色
       */
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateRole(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '编辑成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
            this.queryRole()
          })
        }
      })
    },
    /**
       * 删除角色
       * @param id
       */
    deleteRole(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id).then(() => {
          this.$notify({
            title: '删除成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.queryRole()
        })
      })
    },
    handleDownload() {
      console.log('download')
    }
  }
}
</script>

