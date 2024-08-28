<script setup>
import { useBrandsStore } from "../store";
import { createBrands } from "../utils/post";
import { updateBrands } from "../utils/put";
import { deleteBrands } from "../utils/delete";
const toast = useToast();
const brands = useBrandsStore();

onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((response) => response.json())
    .then((items) => {
      brands.rowItem = [];
      items?.data?.map((item) => {
        brands.rowItem.push({
          id: item.id,
          title: item.title,
          image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
        });
      });
    });
});

const modal = [
  {
    key: "title",
    label: "Title",
    value: "title",
  },
];

const columns = [
  {
    key: "title",
    label: "Title",
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
const pageCount = 4;
const rows = computed(() => {
  return brands.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div
    class="flex justify-end px-3 py-3.5 dark:border-gray-700 sticky top-0 bg-[#191A19] z-10"
  >
    <UButton label="Add Brand" class="me-4" @click="brands.openModal = true" />
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="brands.rowItem.length"
    />
  </div>

  <!-- -------------------------------- Modal -------------------------------------- -->
  <Modal :modal="modal" />

  <!-- -------------------------------- Table -------------------------------------- -->
  <Table
    :rows="rows"
    :columns="columns"
    :delete-item="deleteBrands"
    :open-modal="brands.openEditModal"
  />
</template>
