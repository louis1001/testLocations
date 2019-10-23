<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 400px; width: 90vw"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker
        :lat-lng="myLocation"
      />
      <l-marker
        v-for="(id, data) in markers"
        v-bind:key="id"
        :lat-lng="data.location"
      />
      <v-locatecontrol/>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import { db } from '../utils/db'

const locationsRef = db.ref('locations')

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  mounted(){
    this.updateMyMarker()

    locationsRef.on('child_added', this.markerAdded)
    locationsRef.on('child_changed', this.markerUpdated)
    locationsRef.on('child_removed', this.markerDeleted)
  },
  data() {
    return {
      zoom: 14.5,
      center: latLng(13.481114,-86.585985),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        'OpenStreetMap',
      currentZoom: 11.5,
      myLocation: latLng(13.475460, -86.583397),
      currentCenter: latLng(13.475460, -86.583397),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.1
      },
      showMap: true,
      markers: {},
      userId: localStorage.getItem('userId')
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    showLongText() {
      this.showParagraph = !this.showParagraph
    },
    innerClick() {
      alert("Click!")
    },
    markerAdded(data){
      console.log('newData')
      if(!this.markers.hasOwnProperty(data.key)){
        this.markers[data.key] = data.val()
      }
    },
    markerDeleted(data) {
      console.log('deletedData')
      console.log(data)
      if(this.markers.hasOwnProperty(data.key)){
        delete this.markers[data.key]
      }
    },
    markerUpdated(data) {
      console.log('updatedData')
      console.log(data.val())
      this.markers[data.key] = data.val()
    },
    updateMyMarker(loc) {
        if (loc){
            const llUp = latLng(loc.coords.latitude, loc.coords.longitude)
            this.myLocations = llUp

            this.userId = localStorage.getItem('userId')
            if (!this.userId) {
                this.userId = ''
                for(let i = 0; i < 7; i++){
                    this.userId += String.fromCharCode(Math.floor(Math.random() * 26) + 98)
                }

                window.localStorage.setItem('userId', this.userId)
            }

            locationsRef.child(this.userId).set({
              location: llUp
            })
        }
        setTimeout(
            () => navigator.geolocation.getCurrentPosition(this.updateMyMarker),
            500
        )
    }
  }
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

</style>