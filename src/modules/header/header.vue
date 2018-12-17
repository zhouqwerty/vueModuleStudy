<template>
    <div>
        <h1>这是vue组件学习的界面</h1>
        <Steps :current="2" size="small">
            <Step title="已完成"></Step>
            <Step title="进行中"></Step>
            <Step title="待进行"></Step>
            <Step title="待进行"></Step>
        </Steps>
        <Page :total="100" show-sizer></Page>
        <i-input v-model="value" placeholder="请输入..." style="width: 300px"></i-input>
    </div>

</template>
<script>
    module.exports = {
        data: function () {
            return {
                value:''
            }
        },
        methods: {}
    };
</script>
<style>

</style>