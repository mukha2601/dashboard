<template>
  <UModal v-model="activeState.openModal" prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          Add new items to the database
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="activeState.closeModal"
          />
        </div>
      </template>
      <UForm
        :state="activeState"
        @submit.prevent="createORupdate()"
        class="py-4 flex flex-col gap-4"
      >
        <!-- Dynamic form inputs -->
        <div v-for="item in modal" :key="item.key">
          <UFormGroup :label="item.label" :name="item.key">
            <UInput
              v-model="activeState[item.value]"
              required
              autocomplete="off"
            />
          </UFormGroup>
        </div>

        <!-- File input handling -->
        <UInput
          @input="activeState.handleFileChange($event.target.files[0])"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          accept="image/*"
          :required="isRequired"
        />
        <div>
          <UButton type="submit">Add</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
import {
  useCategoryStore,
  useBrandsStore,
  useCitiesStore,
  useModelsStore,
} from "../store/index";
import {
  createCategory,
  createBrands,
  createModel,
  createCities,
} from "../utils/post";
import {
  updateCaregory,
  updateBrands,
  updateModels,
  updateCities,
} from "../utils/put";
const route = useRoute();
const category = useCategoryStore();
const brands = useBrandsStore();
const models = useModelsStore();
const cities = useCitiesStore();

const tru = false;

const props = defineProps({
  modal: {
    type: Array,
    required: true,
  },
});

let activeState = undefined;
let createORupdate = undefined;
// Watch for route changes and update activeState dynamically
watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/") {
      activeState = category;
      if (category.isEdit) {
        createORupdate = updateCaregory;
      } else {
        createORupdate = createCategory;
      }
    } else if (newPath === "/brands") {
      activeState = brands;
      createORupdate = createBrands;
    } else if (newPath === "/models") {
      activeState = models;
      createORupdate = createModel;
    } else if (newPath === "/cities") {
      activeState = cities;
      createORupdate = createCities;
    }
  },
  { immediate: true }
);

const isRequired = computed(() => activeState.modalRequired);
</script>
