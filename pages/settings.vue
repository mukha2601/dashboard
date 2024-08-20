<script setup>
const people = ref([]);

onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then((response) => response.json())
    .then((items) => {
      console.log(items.data);

      items?.data?.map((item) => {
        people.value.push({
          id: item.id,
          name: item.name_en,
          title: item.name_ru,
          email: item.name_ru,
          role: item.name_ru,
          image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
        });
      });
    });
});

console.log(people.value);

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
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => console.log(row.id),
    },
  ],
];

const page = ref(1);
const pageCount = 5;

const rows = computed(() => {
  return people.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <UTable :rows="rows" :columns="columns">
    <template #image-data="{ row }">
      <img :src="row.image" alt="Category Image" class="h-24 w-max object-cover" />
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
  <div
    class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
  >
    <UButton label="Add categories" class="me-4" />
    <UPagination
      v-model="page"
      :page-count="pageCount"
      :total="people.length"
    />
  </div>
</template>
