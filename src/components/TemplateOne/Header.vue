<template>
  <div class="header">
    <div>
      <div class="">
        <img class="" src="" />
        <div class="">测试</div>
      </div>
      <img class="name_bg" :src="name_bg" />
    </div>
  </div>
</template>

<script>
import name_bg from '@/assets/home/name.png';
export default {
  name: '',
  data() {
    return {
      name_bg:name_bg
    };
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.header{
  z-index: 1;
  color:red;

  .name_bg{
    width: 250.5px;
    height: 35px;
  }
}
</style>
