<template lang="html">
    <Page id="main">
        <ActionBar>
            <NavigationButton visibility="collapse" v-if="!isAndroid" @tap="goBack" text="Back" android.systemIcon="ic_menu_back" />
            <StackLayout orientation="horizontal">
                <Image src="~/images/LOGO_JBCD_1.png" width="80" verticalAlignment="center" />
            </StackLayout>
        </ActionBar>
        <TabView tabTextFontSize="5" androidTabsPosition="bottom" tabTextColor="#767A79" selectedTabTextColor="#004097" androidSelectedTabHighlightColor="#004097" @selectedIndexChanged="selectedIndexChanged">
            
            <TabViewItem title="홈" >
                <homeview />
            </TabViewItem>

            <TabViewItem title="Web View" >
                <webviewTest />
            </TabViewItem>

        </TabView>
    </Page>
</template>

<script>

import homeview from "./Home.vue"
import webviewTest from "./webviewTest.vue"


export default {
    components: { 
        homeview,
        webviewTest,
       
    },        
    methods: {
        selectedIndexChanged(args) {
            this.$store.commit('tabview/setTabViewIndex', args.newIndex);
        },
  
    },
};
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
