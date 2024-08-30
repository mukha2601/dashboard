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
        <!-- <div v-if="true" class="flex flex-col gap-4">
          <UFormGroup label="Category" name="category">
            <USelect
              placeholder="Select Category"
              :options="
                cars.category.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              "
              v-model="cars.category_id"
            />
          </UFormGroup>

          <UFormGroup label="Brand" name="brand">
            <USelect
              placeholder="Select Brand"
              :options="
                cars.brands.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))
              "
              v-model="cars.brand_id"
            />
          </UFormGroup>

          <UFormGroup label="Model" name="model">
            <USelect
              placeholder="Select Model"
              :options="
                cars.models.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              "
              v-model="cars.model_id"
            />
          </UFormGroup>

          <UFormGroup label="Location" name="location">
            <USelect
              placeholder="Select Location"
              :options="
                cars.locations.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              "
              v-model="cars.location_id"
            />
          </UFormGroup>

          <UFormGroup label="City" name="city">
            <USelect
              placeholder="Select City"
              :options="
                cars.cities.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))
              "
              v-model="cars.city_id"
            />
          </UFormGroup>
        </div> -->

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

        <USelect
          v-if="inputSelect"
          placeholder="Brands"
          :options="
            models.brands.map((brand) => ({
              label: brand.title,
              value: brand.id,
            }))
          "
          v-model="models.brand_id"
        />

        <!-- File input handling -->
        <UInput
          v-if="inputFile"
          @input="activeState.handleFileChange($event.target.files[0])"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          accept="image/*"
          :required="!activeState.isEdit"
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
  useCarsStore,
} from "../store/index";
import {
  createCategory,
  createBrands,
  createModel,
  createCities,
  createCars,
} from "../utils/post";
import {
  updateCaregory,
  updateBrands,
  updateModels,
  updateCities,
  updateCars,
} from "../utils/put";
const route = useRoute();
const category = useCategoryStore();
const brands = useBrandsStore();
const models = useModelsStore();
const cities = useCitiesStore();
const cars = useCarsStore();
const inputSelect = ref(false);
const inputFile = ref(true);

const props = defineProps({
  modal: {
    type: Array,
    required: true,
  },
});

let activeState = undefined;
let createORupdate = undefined;
// Watch for route changes and update activeState dynamically
watchEffect(() => {
  if (route.path === "/") {
    activeState = category;
    inputSelect.value = false;
    createORupdate = activeState.isEdit ? updateCaregory : createCategory;
  } else if (route.path === "/brands") {
    inputSelect.value = false;
    inputFile.value = true;
    activeState = brands;
    createORupdate = activeState.isEdit ? updateBrands : createBrands;
  } else if (route.path === "/models") {
    inputSelect.value = true;
    inputFile.value = false;
    activeState = models;
    createORupdate = activeState.isEdit ? updateModels : createModel;
  } else if (route.path === "/cities") {
    activeState = cities;
    inputSelect.value = false;
    createORupdate = activeState.isEdit ? updateCities : createCities;
  } else if (route.path === "/cars") {
    activeState = cars;
    createORupdate = activeState.isEdit ? updateCities : createCities;
  }
});
</script>
