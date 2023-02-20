<template>
    <ion-page>
        <ion-content>
            <div class="header">
                <button fill="outline" class="loop"  @click="scale = scale > 0.25 ? scale - 0.25 : 0.25">
                    <ion-icon :icon="removeCircleOutline"></ion-icon>
                </button>
                <button fill="outline" class="loop" shape="round" @click="scale = scale < 2 ? scale + 0.25 : 2">
                    <ion-icon :icon="addCircleOutline"></ion-icon>
                </button>
            </div>
            <div class="text-center" ref="myPdf" >
                <!-- <pdf   :src="pdf" 
                        v-for="i in numPages" :key="i" :id="i" 
                        :page="i" 
                        :scale="scale" 
                        style="width:100%;margin:20px auto;" 
                        :resize="true" /> -->
                <pdf    :scale="scale"   
                        :src="pdfUrl" 
                        @numpages="getPages"
                        :page="currentPage"
                        :annotation="true"
                        :text="true" />

            </div>
            
        </ion-content>
        <ion-footer>
        <ion-toolbar>
            <div class="text-center footer">
                <ion-button shape="round" class="primary" @click="currentPage = currentPage > 1 ? currentPage - 1 : 1">Prev</ion-button>
                <div>{{ currentPage }} / {{ numPages }}</div>
                <ion-button shape="round" class="primary" @click="currentPage = currentPage < numPages ? currentPage + 1 : numPages">Next</ion-button>
            </div>
        </ion-toolbar>
    </ion-footer>
    </ion-page>
</template>

<script lang="js" >
import { defineComponent } from 'vue'
// import {usePDF, VuePDF} from '@tato30/vue-pdf'
import pdf   from 'pdfvuer';

import { IonContent ,
    IonIcon,
    IonButton,
    IonFooter ,IonToolbar,IonPage} from '@ionic/vue';
import { ref } from 'vue';
import { removeCircleOutline,addCircleOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import store from '@/store';
export default defineComponent({
    components: {
        IonContent,
        pdf ,
        IonIcon,
        IonButton,
        IonFooter,
        IonToolbar,
        IonPage,
    },
    mounted() {
        this.scale = (window.innerWidth *1.5) / 1000
    },
    watch: {
        '$route'(currentRoute){
            this.pdfId = currentRoute.params.id
        }
    },
    computed: {
        Pdf(){
            return store.getters.Pdf(this.pdfId)
        }
    },
    
    setup () {
        const route = useRoute();
        const myPdf = ref(null);
        const scale = ref(1);
        const currentPage = ref(1);
        const pdfId = route.params.id
        const enablement = ref(true)
        const numPages = ref(0);
        // const { pdf, pages, info } = usePDF(store.getters.Pdf(pdfId).url);
        const pdfUrl = store.getters.Pdf(pdfId).url
        store.getters.Pdf(pdfId)
        const getPages = (pages) => {
            numPages.value = pages
        }
        return {
            pdfUrl,
            numPages,
            currentPage,
            scale,
            myPdf,
            enablement,
            removeCircleOutline,
            addCircleOutline,
            pdfId: route.params.id,
            getPages,
        }
    }
})
</script>

<style scoped>
    .primary {
        background-color: #3880ff;
        color: white;
        border: none;
        padding: 10px 10px;
        border-radius: 4px;
        cursor: pointer;
        margin: 0 10px;
    }
    .primary:hover {
        background-color: #3171e0;
    }
    .text-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 10px;
    }
    .loop  {
        border-radius: 50%;
        padding: 2 !important;
        color: #3880ff;
        margin: 0 5px;
        font-size: 20px;

    }


</style>