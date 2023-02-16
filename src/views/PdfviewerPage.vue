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
                <VuePDF  :pdf="pdf" :page="currentPage" :scale="scale" :text-layer="enablement" />
            </div>
            
        </ion-content>
        <ion-footer>
        <ion-toolbar>
            <div class="text-center footer">
                <ion-button shape="round" class="primary" @click="currentPage = currentPage > 1 ? currentPage - 1 : 1">Prev</ion-button>
                <div>{{ currentPage }} / {{ pages }}</div>
                <ion-button shape="round" class="primary" @click="currentPage = currentPage < pages ? currentPage + 1 : pages">Next</ion-button>
            </div>
        </ion-toolbar>
    </ion-footer>
    </ion-page>
</template>

<script >
import { defineComponent } from 'vue'
import {usePDF, VuePDF} from '@tato30/vue-pdf'
import { IonPage,IonContent ,IonIcon,IonButton,IonFooter} from '@ionic/vue';
import { ref } from 'vue';
import { removeCircleOutline,addCircleOutline } from 'ionicons/icons';
export default defineComponent({
    components: {
        IonPage,
        IonContent,
        VuePDF,
        IonIcon,
        IonButton,
        IonFooter
    },
    mounted() {
        this.scale = (window.innerWidth *1.75) / 1000
    },
    
    setup () {
        const myPdf = ref(null);
        const scale = ref(1);
        const currentPage = ref(1);
        const enablement = ref(true)

        const { pdf, pages, info } = usePDF("/Correction_Td3_MongoDB.pdf")
        return {
            pdf,
            pages,
            info,
            currentPage,
            scale,
            myPdf,
            enablement,
            removeCircleOutline,
            addCircleOutline

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