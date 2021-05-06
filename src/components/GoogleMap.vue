<template>
    <v-card>
        <v-card-title 
         class="txtCenter"
        >Localização dos clientes</v-card-title>
        <v-card-text>
           
         
                 <GmapMap
                    :center="center"
                    :zoom="14"
                    style="width: 100%; height: 515px"
                >
                    <div
                        v-for="(m,index) in coords"
                        :key="index"
                        >
                            {{ changeInfoContent(m)}}
                        <GmapInfoWindow
                            :position="m.position"
                            :opened="infoWinOpen"
                        >
                            <div v-html="infoContent"></div>
                        </GmapInfoWindow>

                        
                        <!-- <GmapInfoWindow
                            :options="infoOptions"
                            :position="infoWindowPos"
                            :opened="infoWinOpen"
                            @closeclick="infoWinOpen=false"
                        >
                            <div v-html="infoContent"></div>
                        </GmapInfoWindow> -->
                        
                        <GmapMarker
                            :key="index"
                            v-for="(m, index) in coords"
                            :position="m.position"
                            :clickable="true"
                        >  
                        </GmapMarker> 
                        <!-- <GmapMarker
                            :key="index"
                            v-for="(m, index) in coords"
                            :position="m.position"
                            :clickable="true"
                            @click="toggleInfoWindow(m, index)"
                        >  
                        </GmapMarker>  -->
                        
                    </div>
                  
                    </GmapMap>

        </v-card-text>
    </v-card>
</template>
<script>
function initMap() {
    alert()
}
export default {
    name: "GoogleMap",
    data () {
       return {
            mostrarMapa: false,
    
            center: { lat: -12.717030617531089,  lng: -38.3125793488901 }, // Localização do atlantico life
            svgMarker: {
                path:
                    "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "blue",
                    fillOpacity: 0.6,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 2,
            },
            // infoWindowPos: {
            //     lat: 0,
            //     lng: 0
            // },
            infoWinOpen: true, //false,
            // infoContent: null
       }
    },
    props: {
        coords:{
            type: Array,
            required: true
        }
        
    },
    
    watch: {
        coords () {
            this.mostrarMapa = true
        }
    },

    methods: {

        toggleWindow (marker, index) {
            this.infoWindowPos = marker.position
            this.infoContent = marker.nome
            this.infoWinOpen = !this.infoWinOpen
        },

    //     toggleInfoWindow: function (marker, idx) {
    //         this.infoWindowPos = marker.position;
    //         this.infoContent = this.getInfoWindowContent(marker);

    //         //check if its the same marker that was selected if yes toggle
    //         if (this.currentMidx == idx) {
    //             this.infoWinOpen = !this.infoWinOpen;
    //         }
    //         //if different marker set infowindow to open and reset current marker index
    //         else {
    //             this.infoWinOpen = true;
    //             this.currentMidx = idx;
    //         }
    //   },
    //   getInfoWindowContent: function (marker) {
    //     return (`${marker.nome}`);
    //   },

       
        changeInfoContent (m) {
            this.infoContent = m.nome
        }
    
    
    }
 
  
}
</script>


<style scoped>
    .txtCenter {
        display: flex ;
        justify-content: center;
    }
</style>