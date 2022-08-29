<template>
<frame id="webviewTest">    
     <Page >
        <ActionBar style="background-color">            
            <Label :text=title></Label>
        </ActionBar>
        
        <GridLayout rows="30,30,30,*" cols="*" class="page__content" @webConfirm="test"  >
            <Label row="0" col="0" :text="src + this.$store.state.tabview.session" class="label1" />                        
            <Button row="1" col="0" text="Notifiaction" @tap="onNotification" />                        
            <Button row="2" col="0" text="Notifiaction Cancel" @tap="onNotiCancel" />                        
            <WebView row="3" col="0"  :src="src"  @loaded="onLoaded"  /> 
        </GridLayout>
    </Page>
</frame>
</template>

<script>
import { LocalNotifications } from "@nativescript/local-notifications";
import { Color } from "@nativescript/core/Color"
LocalNotifications.hasPermission()

export default {
    //@loadFinished="finish" @loaded="onLoaded"
    data(){
        return{
            title: "Web View",
            src: "http://203.254.143.108:8001?objectid=",
        }
    },
    methods: {
        onNotification(){
            LocalNotifications.schedule([{
                id: 1, // generated id if not set
                title: '알림창',
                body: 'Recurs every minute until cancelled',
                ticker: 'The ticker',
                color: new Color('red'),
                badge: 1,
                groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
                groupSummary:"Summary of the grouped messages above", //android only
                ongoing: true, // makes the notification ongoing (Android only)
                icon: 'res://heart',
                image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
                thumbnail: true,
                interval: 'minute',
                channel: 'My Channel', // default: 'Channel'
                sound: "customsound-ios.wav", // falls back to the default sound on Android
                at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
            }]).then(
                function(scheduledIds) {
                    console.log("Notification id(s) scheduled: " + JSON.stringify(scheduledIds));
                },
                function(error) {
                    console.log("scheduling error: " + error);
                }
            )
        }, 
        onNotiCancel() {
            // 일부 Notification 해제
            LocalNotifications.cancel(1 /* the ID */).then((foundAndCanceled) => {
                if (foundAndCanceled) {
                    console.log("OK, it's gone!");
                } else {
                    console.log('No ID 5 was scheduled');
                }
            });

            // 전체 Notification 해제
            LocalNotifications.cancelAll();
            console.log("OK,All gone!");
        },     
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
