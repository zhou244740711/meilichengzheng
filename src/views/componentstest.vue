<template>
  <div>
    {{t}}
    <z-select v-model="t" :options="options"></z-select>

    <span @click="t = 1">设置为1</span>
    <span @click="t = 2">设置为2</span>

  </div>
</template>

<script>
import { ZSelect } from "@/components/index";
export default{
  components: { ZSelect},
  data () {
    return {
      t: 'value',
      options: [
        {
          key: 'key',
          value: 'value',
          label: '测试1'
        },
        {
          key: 'key2',
          value: 'value2',
          label: '测试2'
        },
        {
          key: 'key3',
          value: 'value3',
          label: '测试3'
        }
      ]
    }
  }
}
</script>