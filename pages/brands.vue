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
      items?.data?.map((item) => {
        brands.rowItem.push({
          id: item.id,
          title: item.title,
          image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
        });
      });
    });
});

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
const pageCount = 5;
const rows = computed(() => {
  return brands.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <!-- ------------------------------ Add Modal ------------------------------------ -->
    <UModal v-model="brands.addModal" prevent-close>
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
              @click="brands.addModal = false"
            />
          </div>
        </template>
        <UForm
          :state="brands"
          @submit.prevent="createBrands"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Title" name="title">
            <UInput v-model="brands.title" required autocomplete="off" />
          </UFormGroup>
          <UInput
            @input="brands.handleFileChange($event.target.files[0])"
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
    <UModal v-model="brands.editModal" prevent-close>
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
              @click="brands.editModal = false"
            />
          </div>
        </template>
        <UForm
          :state="brands"
          @submit.prevent="updateBrands"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Title" name="title">
            <UInput v-model="brands.title" autocomplete="off" />
          </UFormGroup>
          <UInput
            @input="brands.handleFileChange($event.target.files[0])"
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
      <UButton label="Add Brand" class="me-4" @click="brands.addModal = true" />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="brands.rowItem.length"
      />
    </div>

    <!-- -------------------------------- Table -------------------------------------- -->
    <Table
      :rows="rows"
      :columns="columns"
      :delete-item="deleteBrands"
      :open-modal="brands.openEditModal"
    />
  </div>
</template>
