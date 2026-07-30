<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { cn } from '@/lib/utils.ts'
import { PkgWrapper } from '@reside-ic/odinjs'
import { extractParameters, range } from '@/utils/models.ts'
import type { ModelDetails, ModelResults } from '@/utils/types.ts'
import { getModelData } from '@/utils/api.ts'
import { ArrowDown, ArrowUp, Download, ExternalLink, Maximize2, Minimize2 } from 'lucide-vue-next'
import { LineChart } from '@/components/ui/chart-line'
import { download, rangeAndDomain, scale_y } from '@/utils/charts.ts'
import ModelGraph from '@/components/ModelGraph.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const router = useRouter()
const modelId = ref(router.currentRoute.value.params.modelId)
const activeTab = ref(router.currentRoute.value.params.tab || 'plot')

const expandDescription = ref(false)
const expandVar = ref({})

const parameters = ref(null)
const paramsDropdownOpen = ref(false)

const modelResults: ModelResults = ref(null)

const logScale = ref(false)
const time = ref([Number(router.currentRoute.value.query.time) || 5])
const times = ref([])

const ymax = ref([Number(router.currentRoute.value.query.ymax) || 100])

const chartData = ref([])

const hasResults = computed(() => modelResults.value !== null)

const modelDetails: ModelDetails = ref(null)

const chartColors = ref([
  '#FF6B6B',
  '#4ECDC4',
  '#FFA726',
  '#9C27B0',
  '#00BCD4',
  '#8BC34A',
  '#FF9800',
  '#673AB7',
  '#03A9F4',
  '#E91E63',
  '#FF5722',
  '#2196F3',
  '#FFEB3B',
  '#4CAF50',
  '#9E9E9E',
  '#F44336',
  '#2980B9',
  '#F39C12',
  '#8E44AD',
  '#16A085',
  '#34495E',
  '#D35400',
  '#27AE60',
  '#7F8C8D',
  '#C0392B'
])

const generateColorPalette = (count: number) => {
  const newColors = [...chartColors.value]

  while (newColors.length < count) {
    const hue = Math.floor(Math.random() * 360)
    const saturation = 70 + Math.floor(Math.random() * 30)
    const lightness = 40 + Math.floor(Math.random() * 20)
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`

    if (!newColors.includes(color)) {
      newColors.push(color)
    }
  }

  return newColors
}

watch(router.currentRoute, () => {
  if (router.currentRoute.value.params.modelId) {
    modelId.value = router.currentRoute.value.params.modelId

    document.title = `Menelmacar | ${modelId.value}`
  }

  if (router.currentRoute.value.params.tab) {
    activeTab.value = router.currentRoute.value.params.tab
  }
})

const runModel = async () => {
  if (!modelId.value) return

  if (!parameters.value) {
    parameters.value = await extractParameters(modelId.value)
  }

  const models = await import(`../../public/models/${modelId.value}.js`)
  const model = models.model

  const mod = new PkgWrapper(model, parameters.value, 'error')
  times.value = range(0, time.value[0], 100)

  modelResults.value = mod.run(times.value, null, { maxSteps: 1_000_000 })

  if (modelResults.value.names.length > chartColors.value.length) {
    chartColors.value = generateColorPalette(modelResults.names.length)
  }

  const { yDomain, yRange } = rangeAndDomain(
    modelResults.value,
    ymax.value,
    logScale.value
  )

  chartData.value = modelResults.value.y
    .map((d, i) => (
      ({
        time: times.value[i],
        ...modelResults.value.names.reduce((acc, i, ix) => ({
          ...acc,
          [i]: scale_y(d[ix], logScale.value, yDomain, yRange)
        }), {})
      })
    ))
}

const updateParam = (parameter: string, value: number) => {
  parameters.value = {
    ...parameters.value,
    [parameter]: value
  }
}

const applyParameters = () => {
  void runModel()
  paramsDropdownOpen.value = false
}

const resetParams = () => {
  parameters.value = null
  void runModel()
  paramsDropdownOpen.value = false
}

watch([time, ymax], () => {
  router.push({
    query: {
      time: time.value[0].toString(),
      ymax: ymax.value[0],
    }
  })
})

watch([modelId, time, ymax, logScale], () => {
  void runModel()
})

watch(modelId, async () => {
  modelResults.value = null
  parameters.value = null
  ymax.value = 100

  void runModel()

  modelDetails.value = null
  modelDetails.value = await getModelData(modelId.value)
})

watch(activeTab, () => {
  if (activeTab.value === 'variables') {
    ymax.value = [100]
    void runModel()
  }
})

onMounted(async () => {
  void runModel()

  parameters.value = null
  modelDetails.value = null
  modelDetails.value = await getModelData(modelId.value)
})

</script>

<template>
  <div class="flex flex-col items-center justify-content-start py-10">
    <div class="flex flex-col max-w-[1120px] w-full">
      <div class="text-light-grey flex flex-row items-center gap-2">
        <div class="flex flex-col items-start gap-2">
          <h1 class="text-2xl font-semibold">
            {{ modelDetails?.name || 'Loading...' }}
          </h1>

          <a class="font-normal text-light-grey flex flex-row items-center gap-1 hover:underline"
             :href="`https://biomodels.org/${modelId}`"
             target="_blank">
            {{ modelId }}
            <ExternalLink size="16" />
          </a>

          <div v-if="modelDetails?.description"
               :class="cn('relative rounded-md max-h-36 overflow-hidden transition-all text-gray-300', expandDescription && 'max-h-full')">

            <div class="description-content" v-html="modelDetails?.description"></div>

            <div v-if="modelDetails?.description.length > 1000"
                 :class="cn('absolute bottom-0 left-0 h-20 pb-2 bg-gradient-to-t from-slate-darker to-slate-darker/30 w-full flex flex-row items-end justify-center cursor-pointer', expandDescription && 'relative items-start h-8 mt-2')"
                 @click="expandDescription = !expandDescription">
              <ArrowDown v-if="!expandDescription" size="16" />
              <ArrowUp v-if="expandDescription" size="16" />
            </div>
          </div>
        </div>

      </div>
      <div class="flex flex-row gap-8 pt-8">
        <router-link :to="'/view/'+modelId+'/plot'"
                     :class="cn('text-light-grey opacity-80 hover:opacity-100 pb-4 px-2 border-b-4 border-transparent', activeTab==='plot'?'border-blue':'')">
          Overall plot
        </router-link>
        <router-link :to="'/view/'+modelId+'/variables'"
                     :class="cn('text-light-grey opacity-80 hover:opacity-100 pb-4 px-2 border-b-4 border-transparent', activeTab==='variables'?'border-blue':'')">
          Individual variables
        </router-link>
        <router-link :to="'/view/'+modelId+'/graph'"
                     :class="cn('text-light-grey opacity-80 hover:opacity-100 pb-4 px-2 border-b-4 border-transparent', activeTab==='graph'?'border-blue':'')">
          Graph of the model
        </router-link>
      </div>
    </div>

    <div class="border-t border-slate w-full h-1"></div>

    <div v-if="hasResults"
         class="flex flex-col max-w-[1120px] w-full py-8 text-light-grey">
      <div v-if="activeTab !== 'graph'"
           class="flex flex-row w-full gap-6 items-center">
        <Popover :open="parameters && paramsDropdownOpen">
          <PopoverTrigger as-child>
            <Button variant="outline" class="uppercase rounded-md bg-transparent border-white"
                    @click="paramsDropdownOpen = !paramsDropdownOpen">
              Initial parameters
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom"
                          align="start"
                          :prioritize-position="true"
                          class="w-fit flex flex-col gap-1">
            <div class="flex flex-col gap-2 max-h-[350px] overflow-y-auto">
              <div v-for="parameter in Object.keys(parameters)"
                   class="flex flex-row w-[400px] items-center">
                <label :for="`param_${parameter}`" class="inline-block w-11/12 whitespace-nowrap">
                  {{ parameter }}:
                </label>
                <Input type="number"
                       :name="`param_${parameter}`"
                       :id="`param_${parameter}`"
                       :value="parameters[parameter]"
                       @input="event => updateParam(parameter, Number(event.target.value))"
                       class="w-6/12 outline-none focus-visible:ring-0" />
              </div>
            </div>
            <div class="flex flex-row justify-end mt-2 pt-4 gap-2 border-t">
              <Button variant="outline" @click="resetParams">
                Reset
              </Button>
              <Button @click="applyParameters">
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <label class="flex items-center gap-2">
          <Checkbox :checked="logScale" @update:checked="logScale = !logScale" />
          Y axis log scale
        </label>

        <div class="flex flex-row flex-grow gap-4 items-center">
          <label class="whitespace-nowrap">Time: {{ time[0] }}</label>
          <Slider
            v-model="time"
            :default-value="[5]"
            :max="500"
            :min="5"
            :step="1"
          />
        </div>
      </div>

      <div v-if="activeTab === 'plot'">
        <div class="relative bg-slate-dark rounded-md p-4 mt-8 flex flex-col gap-4 h-[60vh]">
          <Button class="absolute top-0 right-0 bg-transparent hover:bg-transparent shadow-none pt-6"
                  @click="() => download()">
            <Download />
          </Button>

          <div class="flex-grow flex flex-row gap-2 h-full">
            <div class="flex flex-col flex-grow w-[80px] h-full items-center">
              <p class="whitespace-nowrap mb-4">Max Y</p>
              <Slider
                v-model="ymax"
                :max="100"
                :min="0"
                :step="0.1"
                orientation="vertical"
              />
            </div>
            <LineChart
              class="h-full w-full"
              :data="chartData"
              :colors="chartColors"
              :categories="modelResults.names"
              :show-x-axis="true"
              :show-y-axis="true"
              :show-grid-line="false"
              :x-formatter="(tick) =>Number(chartData[tick].time).toFixed(4)"
              index="time" />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'variables'">
        <div class="mt-8 flex flex-row flex-wrap gap-4">
          <div v-for="(variable, index) in modelResults.names"
               :class="cn('relative bg-slate-dark rounded-md p-4 flex-grow w-1/3', expandVar[index] && 'w-full h-[500px]')">
            <div class="flex flex-row gap-0 absolute top-0 right-0 ">
              <Button @click="expandVar[index] = !expandVar[index]"
                      class="p-2 pr-1 text-light-grey bg-transparent shadow-none hover:bg-transparent">
                <Maximize2 v-if="!expandVar[index]" size="16" />
                <Minimize2 v-if="expandVar[index]" size="16" />
              </Button>
              <Button class="bg-transparent hover:bg-transparent shadow-none p-2 pl-1"
                      @click="() => download(index)">
                <Download />
              </Button>
            </div>
            <div class="w-full text-center text-sm font-semibold">
              {{ variable }}
            </div>
            <LineChart
              :class="cn('h-full w-full max-h-[200px] mt-4', expandVar[index] && 'max-h-[420px]')"
              :data="chartData"
              :colors="[chartColors[index]]"
              :categories="[variable]"
              :show-x-axis="true"
              :show-y-axis="true"
              :show-grid-line="false"
              :show-legend="false"
              :x-formatter="(tick) => Number(chartData[tick].time).toFixed(4)"
              index="time" />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'graph'">
        <ModelGraph :model-reference="modelId" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.description-content {
  * {
    background: transparent !important;
  }
}
</style>

