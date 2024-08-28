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
      cities.rowItem = [];
      items?.data?.map((item) => {
        cities.rowItem.push({
          id: item.id,
          name: item.name,
          text: item.text,
          image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
        });
      });
    });
});

const modal = [
  {
    key: "name",
    label: "Name",
    value: "name",
  },
  {
    key: "text",
    label: "Text",
    value: "text",
  },
];

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
  <div
    class="flex justify-end px-3 py-3.5 dark:border-gray-700 sticky top-0 bg-[#191A19] z-10"
  >
    <UButton label="Add Cities" class="me-4" @click="cities.openModal = true" />
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="cities.rowItem.length"
    />
  </div>

  <Modal :modal="modal" />

  <!-- -------------------------------- Table -------------------------------------- -->
  <Table
    :rows="rows"
    :columns="columns"
    :delete-item="deleteCities"
    :open-modal="cities.openEditModal"
  />
</template>
