<script setup>
import { useCategoryStore } from "../store";
import { createCategory } from "../utils/post";
import { updateCaregory } from "../utils/put";
import { deleteCategory } from "../utils/delete";
const category = useCategoryStore();

// sahifa ishga tushishidan oldin ishlaydigan funksiya
onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then((response) => response.json())
    .then((items) => {
      category.rowItem = items?.data?.map((item) => ({
        id: item.id,
        name: item.name_en,
        title: item.name_ru,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
      }));
    });
});

const modal = [
  {
    key: "name",
    label: "Name",
    value: "name",
  },
  {
    key: "title",
    label: "Title",
    value: "title",
  },
];

const columns = [
  {
    key: "name",
    label: "Name",
  },
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

// table da nechta qator ko'rinishini hisoblaydi
const page = ref(1);
const pageCount = 4;
const rows = computed(() => {
  return category.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <div class="flex justify-end px-3 py-3.5 sticky top-0 bg-[#191A19] z-10">
      <UButton
        label="Add categories"
        class="me-4"
        @click="category.openModal = true"
      />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="category.rowItem.length"
      />
    </div>

    <Modal :modal="modal" />
    <Table
      :rows="rows"
      :columns="columns"
      :delete-item="deleteCategory"
      :open-modal="category.openEditModal"
    />
  </div>
</template>
