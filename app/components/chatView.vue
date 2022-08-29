<template>
    <frame id="chatView">
        <Page  actionBarHidden="true" xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:ch="@nativescript-community/ui-chart" >
            <ActionBar  style="background-color" >
              <Label text="Chat"  horizontalAlignment="center" verticalAlignment="top" />                      
            </ActionBar>
            <GridLayout rows="*" cols="*" >
                <LineChart ref="chart" width="300" height="400" @loaded="onChartLoaded"> </LineChart>
            </GridLayout>
        </Page>
    </frame>
    </template>
    
    <script>
    import { install } from '@nativescript-community/ui-chart';
    install();

    import { LineChart } from '@nativescript-community/ui-chart/charts/LineChart';
    import { LineDataSet } from '@nativescript-community/ui-chart/data/LineDataSet';
    import { LineData } from '@nativescript-community/ui-chart/data/LineData';

    
        
      export default {
        data(){
            return{ 
                chatData: [
                {            
                    date: "",
                    isRight: true,
                    image: "~/img/me.jpg",
                    message: "My message",    
                }, {            
                    date: "",
                    isRight: false,
                    image: "~/img/friend.jpg",
                    message: "Friend's message",    
                }
                ]
            }
        },
       
        methods: {
           
            onChartLoaded() {
                const chart = LineChart;
                chart.backgroundColor = 'white';

                // enable touch gestures
                chart.setTouchEnabled(true);

                chart.setDrawGridBackground(false);

                // enable scaling and dragging
                chart.setDragEnabled(true);
                chart.setScaleEnabled(true);

                // force pinch zoom along both axis
                chart.setPinchZoom(true);

                // disable dual axis (only use LEFT axis)
                chart.getAxisRight().setEnabled(false);

                const myData = new Array(500).fill(0).map((v, i) => ({
                    index: i,
                    value: Math.random() * 1,
                }));

                const sets = [];
                const set = new LineDataSet(myData, 'Legend Label', 'index', 'value');
                set.setColor('blue');
                sets.push(set);

                // Create a data object with the data sets
                const ld = new LineData(sets);

                // Set data
                chart.setData(ld);
            },
        }
      };
    </script>
    
    <style scoped lang="scss">
        @import '@nativescript/theme/scss/variables/blue';
    
        // Custom styles
        .nsChatView-view .nsChatView-sendMessageArea {
            margin: 4,0,0,0;
            background-color: #e8e8e8;
        }

        .nsChatView-view .nsChatView-sendMessageArea Button {
            background-color: transparent;
            margin: 0;
        }

        .nsChatView-view .nsChatView-messageList {
            background-color: transparent;
            border-color: transparent;
            border-width: 0;
            margin: 0;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-avatar,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-avatar {
            margin: 8;
            border-radius: 32;
            width: 64;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-separator,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-separator {
            border-color: transparent;
            border-width: 0;
            width: 32;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-message,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-message {
            margin: 8;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-messageArea,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-messageArea {
            border-radius: 8;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-messageArea {
            background-color: #edeef2;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-messageArea {
            background-color: #00b863;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-messageArea .nsChatView-content,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-messageArea .nsChatView-content {
            margin: 12,16,12,16;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-messageArea Label,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-messageArea Label {
            margin: 0;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-messageArea .nsChatView-content Label {
            color: black;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-messageArea .nsChatView-content Label {
            color: white;
        }

        .nsChatView-view .nsChatView-messageList .nsChatView-item-left .nsChatView-messageArea .nsChatView-content .nsChatView-date,
        .nsChatView-view .nsChatView-messageList .nsChatView-item-right .nsChatView-messageArea .nsChatView-content .nsChatView-date {
            font-size: 11;
            margin-bottom: 12;
        }

        .nsChatView-view .nsChatView-messageField {
            font-size: 14;
        }
    </style>
    