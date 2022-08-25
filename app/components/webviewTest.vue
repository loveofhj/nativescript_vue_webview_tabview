<template>
<frame id="webviewTest">    
     <Page >
        <ActionBar style="background-color">            
            <Label :text=title></Label>
        </ActionBar>
        
        <GridLayout rows="30,*" cols="*" class="page__content" @webConfirm="test"  >
            <Label row="0" col="0" :text="src + this.$store.state.tabview.session" class="label1" />            
            <WebView row="1" col="0"  :src="src"  @loaded="onLoaded"  /> 
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
            src: "http://203.254.143.108:8001?objectid=",
        }
    },
    methods: {
       
        onLoaded: function(event) {
            const webView = event.object
            if(webView.android) { // in IOS android will be undefined
                webView.android.getSettings().setBuiltInZoomControls(true);
                
                
            }

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
