<template>
  <div class="content">
    <div class="rolePower">
      <div class="container">
        <div class="title">用户管理</div>
        <div class="tableContent">
          <div class="list" v-for="(item ,index) in list" :key="item.id" @click="userClick(index)">
            <div class="anniu"></div>
            <div class="name" :class="{active: selectIndex === index}">{{item.username}}</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="title">权限管理</div>
        <div class="tableContent">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      list: [
        {
          username: "admin",
          id: 1
        },
        {
          username: "admin1",
          id: 2
        }
      ],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    userClick(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style scoped>
.rolePower {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container {
  width: 49%;
  height: 100%;
  border: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
}
.title {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #eff2f6;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #807f83;
}
.tableContent {
  padding: 20px;
}
.list {
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list .anniu {
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background: #1a91ff;
  opacity: 0.6;
  margin-right: 20px;
}
.list .name {
  flex: 1;
  height: 100%;
  cursor: pointer;
  text-indent: 20px;
}
.list .active {
  background: gray;
  color: #fff;
  text-indent: 20px;
}
</style>