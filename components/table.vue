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
        <UButton label="Edit" color="gray" @click="editModalFunc(row)" />
        <UButton label="Delete" color="red" @click="deleteItem(row)" />
      </div>
    </template>
  </UTable>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  editModalFunc: {
    type: Function,
    required: true,
  },
  deleteItem: {
    type: Function,
    required: true,
  },
});
</script>
