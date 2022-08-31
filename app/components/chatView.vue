<template>
    <frame id="chatView">
        <Page  actionBarHidden="true" xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:ch="@nativescript-community/ui-chart" >
            <ActionBar  style="background-color" >
              <Label text="Chat"  horizontalAlignment="center" verticalAlignment="top" />                      
            </ActionBar>
            <GridLayout rows="50,*,50" cols="*" >
                <Button row="0" col="0" text="getChatData" @tap="onClickBtn"/>                
                <GridLayout row="1" col="0" rows="*" cols="*">
                    <ListView ref="listViewUI" for="item in this.$store.state.chat.history" class="nsChatView-messageList" height="*" horizontalAlignment="stretch" verticalAlignment="stretch">
                        <v-template>
                            <GridLayout col="0" row="0"  rows="auto" cols="auto,*,auto">
                                    <!-- visibility="{{ image ? 'visible' : 'collapsed' }}" /> -->
                                <StackLayout  col="1" row="0">
                                <GridLayout col="0" row="0" rows="30,auto,30" cols="*" :class="'nsChatView-item-'+(item.INVID == null ? 'right' : 'left')">                                
                                    <label row="0" col="1" :text="item.SUBJ_FLAG" class="nsChatView-item" verticalAlignment="top" :horizontalAlignment="(item.INVID == null ? 'right' : 'left')"/>
                                    <label row="1" col="0" :text="item.QNACONTENT" class="nsChatView-item" verticalAlignment="top" :horizontalAlignment="(item.INVID == null ? 'right' : 'left')" />
                                    <label row="2" col="0" :text="item.QNADTC" class="nsChatView-item" verticalAlignment="top" :horizontalAlignment="(item.INVID == null ? 'right' : 'left')"  />                                
                                </GridLayout>    
                                </StackLayout>
                                <Image row="0" col="(item.INVID == null ? '2' : '0')" class="nsChatView-avatar" verticalAlignment="center" 
                                :src="(item.INVID == null ? '~/img/marcel.jpg' : '~/img/alert.jpg')"
                                :horizontalAlignment="(item.INVID == null ? 'left' : 'right')" />
                            </GridLayout >                                                    
                        </v-template>                        
                    </ListView>
                </GridLayout>                
                <StackLayout row="2" col="0"  orientation="horizontal" *>
                    <TextField hint="내용을 입력하세요" v-model="sendInput" width="70%" @tap="onTapTextField" />
                    <Button class="nsChatView-sendMessageArea-Button" width="30%" text="send" @tap="onClickSendBtn" />
                </StackLayout>
            </GridLayout>
        </Page>
    </frame>
</template>    
    <script>
      export default {
        data(){
            return {
                sendInput: "",
            }
        },

        methods: {
            getStrDate(){            
                var today = new Date();                
                var year = today.getFullYear();
                var month =('0' + (today.getMonth() + 1)).slice(-2);
                var day = ('0' + today.getDate()).slice(-2);        
                var hours = ('0' + today.getHours()).slice(-2); 
                var minutes = ('0' + today.getMinutes()).slice(-2);
                var seconds = ('0' + today.getSeconds()).slice(-2);         
                var milliseconds = today.getTime();
                const data = [];
        
                data[0] = year;        
                data[1] = month;
                data[2] = day;
                data[3] = hours;
                data[4] = minutes;
                data[5] = seconds;        
                var date = (data[0] + "-" + data[1] + "-" + data[2] + " " + data[3] + ":" + data[4] + ":" + data[5]);        
                
                return date.toString()
            }, 
            onTapTextField(){
                var itemSize = this.$refs["listViewUI"].items.length - 1;
                this.$refs["listViewUI"].refresh();
                //this.$refs["listViewUI"].android.smoothScrollToPosition(itemSize);

                console.log("Item Size: " + itemSize);
                //this.$refs["listViewUI"].scrollToIndex();
            },
            onClickSendBtn: async function(){                
                var params = {
                            "said": 106, 
                            "applid": 31,
                            "qnacontent": this.sendInput                                        
                        };

                console.log(JSON.stringify(params));

                await this.$store.dispatch("chat/insertMessage",params);
                
                await this.$store.dispatch("chat/getChatInfo",params);
                this.$refs["listViewUI"].refresh();
            },
            onClickBtn: async function(){
                var params = {
                    sid: 1,
                    said: 106
                }

                await this.$store.dispatch("chat/getChatInfo", params);      
                this.$refs["listViewUI"].refresh();
            },           
        }
      };
    </script>
    
    <style scoped lang="scss">
        @import '@nativescript/theme/scss/variables/blue';
    
        // Custom styles
        .nsChatView-item{
            margin: 0,32,0,32;            
        }
        .nsChatView-item-right {
            margin: 12,16,12,16;
            border-radius: 32;            
            background-color: #00b863;
            color: white;
            font-size: 11;
            margin-bottom: 12;
        }
        .nsChatView-item-left {
            margin: 12,16,12,16;
            border-radius: 32;                      
            background-color: #e8e8e8;          
            font-size: 11;
            margin-bottom: 12;
        }
        .nsChatView-avatar{
            margin: 32;
            border-radius: 32;
            width: 64;
        }
        
        .nsChatView-messageList {
            background-color: transparent;
            border-color: transparent;
            border-width: 0;
            margin: 0;
        }

        .nsChatView-sendMessageArea-Button {
            background-color: transparent;
            margin: 0;
        }
        
    </style>
    