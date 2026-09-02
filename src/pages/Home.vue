<script setup lang="ts">
import ModelSelect from '@/components/ModelSelect.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
</script>

<template>
  <div class="relative overflow-hidden w-full border border-slate rounded-md p-12 bg-[#3D425B] radial-bg">
    <h2 class="text-2xl text-light-grey font-semibold">
      What is Menelmacar?
    </h2>
    <p class="pt-2 pb-4 font-normal text-light-grey max-w-[60%]">
      Menelmacar - Making Execution of (Nearly) Every Life-science Model ACcessible to All Researchers, helps to
      visualise models from the EMBL-EBI's BioModels database. You can investigate the models' development over time,
      change parameter values and observe changes in the model trajectory, and see the model graph.
    </p>
    <div class="flex flex-col gap-2">
      <ModelSelect :inline="false" />
      <div class="flex flex-row gap-2 text-light-grey text-sm">
        Example models:
        <RouterLink to="/view/BIOMD0000000012" class="hover:underline opacity-80 hover:opacity-100">
          BIOMD0000000012
        </RouterLink>
        <RouterLink to="/view/BIOMD0000001021" class="hover:underline opacity-80 hover:opacity-100">
          BIOMD0000001021
        </RouterLink>
      </div>
    </div>

    <img src="/assets/home-image-charts.png"
         class="absolute bottom-[-20%] right-0">
  </div>

  <div class="w-full flex flex-row flex-nowrap justify-between gap-8 text-light-grey py-10 border-b border-slate">

    <router-link to="/view/BIOMD0000000012/plot?time=300"
                 class="w-1/3 flex  flex-col gap-2">
      <h2 class="text-xl text-light-grey font-semibold">
        Plot a model
      </h2>
      <img src="/assets/home-plot.png" alt="Plot a model" class="w-full h-[200px] bg-slate rounded-md overflow-hidden">
    </router-link>
    <router-link to="/view/BIOMD0000000012/variables?time=300"
                 class="w-1/3 flex  flex-col gap-2">
      <h2 class="text-xl text-light-grey font-semibold">
        Plot each variable individually
      </h2>
      <img src="/assets/home-variables.png" alt="Plot each variable individually"
           class="w-full h-[200px] bg-slate rounded-md overflow-hidden">
    </router-link>
    <router-link to="/view/BIOMD0000000012/graph"
                 class="w-1/3 flex  flex-col gap-2">
      <h2 class="text-xl text-light-grey font-semibold">
        Show as a graph
      </h2>
      <img src="/assets/home-graph-2.png" alt="Show as a graph"
           class="w-full h-[200px] bg-slate rounded-md overflow-hidden">
    </router-link>
  </div>
  <div class="w-full flex flex-col flex-nowrap justify-between gap-4 text-light-grey py-10 border-b border-slate">
    <h2 class="text-2xl">
      Frequently asked questions
    </h2>
    <Accordion type="single" collapsible class="text-light-grey-dark max-w-[80%]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is this website for?</AccordionTrigger>
        <AccordionContent>
          This website helps to visualise models from the <a href="https://www.biomodels.org/" target="_blank">EMBL-EBI's
          BioModels database</a>. You can investigate the models' development over time, change parameter values and
          observe changes in the model trajectory, and see the model graph.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Who is this website for?</AccordionTrigger>
        <AccordionContent>
          Anyone interested in visualising, investigating, or playing around with models from the BioModels database.
          Users do not need specific knowledge of mathematical modelling or coding.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>How can I visualise a specific model?</AccordionTrigger>
        <AccordionContent>
          You can search for models from the BioModels database by using the model's name, the submission ID, or the
          publication ID (if the model is curated).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>How do I know which models are available and how can I find models for a specific topic or
          organism?
        </AccordionTrigger>
        <AccordionContent>
          For this, it is easiest to go to the <a href="https://www.biomodels.org/" target="_blank">BioModels
          database</a>, search for models of interest, and then come back to this website for visualisation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>What information can be found in the different tabs of the website?</AccordionTrigger>
        <AccordionContent>
          <ul>
            <li>
              <b>The model trajectory over time.</b>
              <br>
              In this plot, you can see the model development over time with all its components in one plot. Both the
              x-axis and y-axis have sliders to adapt the time and parameter values to visualise. You can also change
              parameter values and see the changes in the model trajectory.
            </li>
            <li class="mt-4">
              <b>Individual components trajectories over time.</b>
              <br>
              In these plots, you can see the model development over time with each component in a separate plot. Having
              the components in separate plots can help to see the components' development, independent of scale. In
              these plots, too, the x-axis scale and the initial parameters can be chosen by the user. The y-axes will
              automatically adapt to these changes to optimally display the components.
            </li>
            <li class="mt-4">
              <b>Model graph.</b>
              <br>
              The model graph shows the components of the model as nodes and interactions as edges. The layout can be
              manually adjusted and the graph downloaded as an image.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style scoped>
.radial-bg {
  background: radial-gradient(27.5% 102.53% at 91.52% 91.79%, #613A66 0%, rgba(61, 66, 91, 0) 100%), radial-gradient(52.57% 116.28% at 54.78% 92.44%, #51757A 0%, rgba(61, 66, 91, 0) 100%), radial-gradient(28.86% 74.9% at 13.39% 100%, #735A30 0%, rgba(61, 66, 91, 0) 100%);
}
</style>
