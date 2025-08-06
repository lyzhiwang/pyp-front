<template>
  <div class="header">
    <div class="header_top">
      <img
        v-if="
          activity &&
          activity.store &&
          activity.store.logo &&
          activity.store.logo.path
        "
        class="logo"
        :src="activity.store.logo.path"
      />
      <div class="name">{{ activity.store.name }}</div>
    </div>
    <img class="name_bg" :src="name_bg" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import name_bg from '@/assets/home/name.png';

export default {
  name: '',
  data() {
    return {
      name_bg: name_bg,
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
    }),
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 1;
  padding-top: 30px;
  .header_top {
    display: flex;
    align-items: center;
    justify-content: center;
    // padding-top: 20px;
    .logo {
      width: auto;
      height: 28px;
    }
    .name {
      color: #ffffff;
      font-size: 16px;
      margin-left: 10px;
      font-weight: 900;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8),
        0 0 10px rgba(255, 255, 255, 0.3);
    }
  }

  .name_bg {
    margin-top: 20px;
    width: 250.5px;
    height: 35px;
  }
}
</style>
