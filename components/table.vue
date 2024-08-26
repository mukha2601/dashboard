<template>
  <UTable :rows="rows" :columns="columns">
    <template #image-data="{ row }">
      <img
        :src="row.image"
        alt="Category Image"
        class="h-20 w-28 object-cover rounded-md bg-[#292b29] p-1"
      />
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-4">
        <UButton
          label="Edit"
          color="gray"
          @click="formState.openEditModal(row)"
        />
        <UButton label="Delete" color="red" @click="deleteCategory(row)" />
      </div>
    </template>
  </UTable>
</template>

<script setup>
import { useCategoryStore } from "../store";
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  deleteCategory: {
    type: Function,
    required: true,
  },
});

const formState = useCategoryStore();
</script>
