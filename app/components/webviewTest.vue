<template>
<frame id="webviewTest">
     <Page >
        <ActionBar style="background-color">            
            <Label :text=title></Label>
        </ActionBar>
        <GridLayout class="page__content" @webConfirm="test"  >
            <WebView :src="src"  /> 
        </GridLayout>
    </Page>
</frame>
</template>

<script>
export default {
    //@loadFinished="finish" @loaded="onLoaded"
    data(){
        return{
            title: "Web View",
            src: "https://www.google.co.kr",
        }
    },
    methods: {
        onLoaded: function(event) {
            const webView = event.object

            if(webView.android) {
                webView.android.getSettings().setDomStorageEnabled(true)
            }
        },
    },
}
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

</style>
