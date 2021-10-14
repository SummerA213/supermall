<template>
  <!--弹窗-->
    <div class="toast">
      {{message}}
    </div>
</template>

<script>
    export default {
        name: "Toast",
      props: {
          message: {
            type: String,
            default: ''
          }
      }
    }
</script>

<style scoped>

</style>
