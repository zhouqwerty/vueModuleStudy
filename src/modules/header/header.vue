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
        <!--<gaea-steps :current="2" size="small">-->
            <!--<gaea-step title="已完成"></gaea-step>-->
            <!--<gaea-step title="进行中"></gaea-step>-->
            <!--<gaea-step title="待进行"></gaea-step>-->
            <!--<gaea-step title="待进行"></gaea-step>-->
        <!--</gaea-steps>-->
    </div>

</template>
<script>
    module.exports = {
        data: function () {
            return {}
        },
        methods: {}
    };
</script>
<style>

</style>