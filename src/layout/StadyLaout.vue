<template>
  <div>
    <router-view/>
    <z-footer></z-footer>
  </div>
</template>

<script>
import ZFooter from "@/components/ZFooter";
export default {
  name: 'BasicLayout',
  components: {
    ZFooter
  },
  methods: {
  }
}
</script>