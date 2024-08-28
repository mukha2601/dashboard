<script setup>
import { useModelsStore } from "../store";
import { createModel } from "../utils/post";
import { updateModels } from "../utils/put";
import { deleteModels } from "../utils/delete";
const models = useModelsStore();

onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
    .then((response) => response.json())
    .then((items) => {
      models.rowItem = [];
      items?.data?.map((item) => {
        models.rowItem.push({
          id: item.id,
          name: item.name,
          brand: item.brand_title, // To'g'ri brendni olish
        });
      });
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((response) => response.json())
    .then((data) => {
      if (data?.data) {
        models.brands = [];
        data.data.map((el) => {
          models.brands.push({ id: el.id, title: el.title });
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
    });
});

const modal = [
  {
    key: "name",
    label: "Name",
    value: "name",
  },
];

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const page = ref(1);
const pageCount = 8;
const rows = computed(() => {
  return models.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div
    class="flex justify-end px-3 py-3.5 dark:border-gray-700 sticky top-0 bg-[#191A19] z-10"
  >
    <UButton label="Add Model" class="me-4" @click="models.openModal = true" />
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="models.rowItem.length"
    />
  </div>

  <Modal :modal="modal" />
  <!-- -------------------------------- Table -------------------------------------- -->
  <Table
    :rows="rows"
    :columns="columns"
    :delete-item="deleteModels"
    :open-modal="models.openEditModal"
  />
</template>
