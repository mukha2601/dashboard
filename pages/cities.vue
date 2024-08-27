<script setup>
import { useCitiesStore } from "../store";
import { createCities } from "../utils/post";
import { updateCities } from "../utils/put";
import { deleteCities } from "../utils/delete";
const cities = useCitiesStore();

onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
    .then((response) => response.json())
    .then((items) => {
      console.log(items);

      items?.data?.map((item) => {
        cities.value.push({
          id: item.id,
          name: item.name,
          text: item.text,
          image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
        });
      });
    });
});

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "text",
    label: "Text",
  },
  {
    key: "image",
    label: "Image",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

// sahifada 5 ta itemdan oshib ketsa keyingi sahifadagi table saqlaydi
const page = ref(1);
const pageCount = 5;
const rows = computed(() => {
  return cities.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <!-- ------------------------------ Add Modal ------------------------------------ -->
    <UModal v-model="cities.addModal" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            Add new items to the database
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="cities.addModal = false"
            />
          </div>
        </template>
        <UForm
          :state="cities"
          @submit.prevent="createCities"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="formState.name" required autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Text" name="text">
            <UInput v-model="formState.text" required autocomplete="off" />
          </UFormGroup>
          <UInput
            @input="cities.handleFileChange($event.target.files[0])"
            type="file"
            size="sm"
            icon="i-heroicons-folder"
            accept="image/*"
          />
          <div>
            <UButton type="submit">Add</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
    <!-- ------------------------------ Add Modal End -------------------------------- -->

    <!-- ------------------------------ Edit Modal ----------------------------------- -->
    <UModal v-model="cities.editModal" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            Edit Category
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="cities.closeEditModal"
            />
          </div>
        </template>
        <UForm
          :state="cities"
          @submit.prevent="updateCities"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="cities.name" required autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Text" name="text">
            <UInput v-model="cities.text" required autocomplete="off" />
          </UFormGroup>
          <UInput
            @input="cities.handleFileChange($event.target.files[0])"
            type="file"
            size="sm"
            icon="i-heroicons-folder"
            accept="image/*"
          />
          <div>
            <UButton type="submit">Update</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

    <!-- ------------------------------ Edit Modal End ------------------------------- -->
    <div
      class="flex justify-end px-3 py-3.5 dark:border-gray-700 sticky top-0 bg-[#191A19] z-10"
    >
      <UButton
        label="Add Cities"
        class="me-4"
        @click="cities.addModal = true"
      />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="cities.rowItem.length"
      />
    </div>

    <!-- -------------------------------- Table -------------------------------------- -->
    <Table
      :rows="rows"
      :columns="columns"
      :delete-item="deleteCities"
      :open-modal="formState.openEditModal"
    />
  </div>
</template>
