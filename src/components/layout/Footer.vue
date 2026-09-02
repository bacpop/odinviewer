<template>
  <div :class="cn('py-12 items-center gap-4 text-light-grey-dark flex flex-col', isHome ? '' : 'px-4')">
    <a v-if="modelId"
       target="_blank"
       :href="`https://github.com/bacpop/odinviewer/issues/new?title=Model%20error:%20${modelId}`">
      Noticed an error with a model? Report it here.
    </a>
    <a target="_blank"
      :href="`https://github.com/bacpop/SBMLtoOdin`">
      Want to run a model locally on your machine? Install SBMLtoOdin following these instructions.
    </a>
    <p> And translate the model using SBMLtoOdin::importSBMLfromBioModels(BioModel_ID, file_name)</p>
    <br>
    <p> <b> Project idea and SBMLtoOdin: </b> Leonie Lorenz and John Lees,</p>
    <p> <b> Development of Menelmacar website: </b> Antoine Andréoletti, </p>
    <p> <b> Web design: </b> Andrea Epifani, Zeqing Lu (Gomoku Studio) </p>
    <a target="_blank" class="router-link-active router-link-exact-active flex items-center gap-2 text-light-grey opacity-80 hover:opacity-100"
    :href="`https://www.biomodels.org/`">
    Models are sourced from EMBL-EBI's
      <img src="/assets/BioModels_Database_logo_2014.png" alt="BioModels" class="h-12 w-12">
      <b class="text-xl font-semibold text-white">
        BioModels
      </b>
    </a>
  </div>
</template>

<script setup lang="ts">
  import { cn } from '@/lib/utils.ts'
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const props = defineProps<{ isHome: boolean }>()
  const isHome = ref(props.isHome)

  const modelId = ref('')

  watch(router.currentRoute, () => {
    if (router.currentRoute.value.params.modelId) {
      modelId.value = router.currentRoute.value.params.modelId
    }
  })

  watch(props, () => {
    isHome.value = props.isHome
  })
</script>
