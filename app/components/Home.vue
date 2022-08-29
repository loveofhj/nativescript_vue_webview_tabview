<template>
<frame id="homeview">
    <Page  actionBarHidden="true">
        <ActionBar  style="background-color" >
          <Label text="home"  horizontalAlignment="center" verticalAlignment="top" />                      
        </ActionBar>
        <GridLayout rows="*,*" cols="*" >
           <button row="0" col="0" text="test" @tap="onClickBtn"/>
            <Label row="1" col="0" class="info">
                <FormattedString>
                    <Span class="fas" text.decode="&#xf135; "/>
                    <Span :text="message"/>
                </FormattedString>
            </Label>
            
        </GridLayout>
    </Page>
</frame>
</template>

<script>
  export default {
    computed: {
      message() {
        return "Blank {N}-Vue app";
      }
    },
    methods: {
      onClickBtn(){
        this.$store.dispatch("tabview/setSessionIndex", "1");
        console.log("Button clicked!!")
      },
    }
  };
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
