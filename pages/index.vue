<script setup>
import { useCategoryStore } from "../store";
import { createCategory } from "../utils/post";
import { updateCaregory } from "../utils/put";
import { deleteCategory } from "../utils/delete";
const toast = useToast();
const formState = useCategoryStore();

// sahifa ishga tushishidan oldin ishlaydigan funksiya
onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then((response) => response.json())
    .then((items) => {
      formState.rowItem = items?.data?.map((item) => ({
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
    val: formState.name,
  },
  {
    key: "title",
    label: "Title",
    val: formState.title,
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
  return formState.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <Modal :modal="modal"/>
    <!-- ------------------------------ Add Modal ------------------------------------ -->
    <!-- <UModal v-model="formState.addModal" prevent-close>
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
              @click="formState.addModal = false"
            />
          </div>
        </template>
        <UForm
          :state="formState"
          @submit.prevent="createCategory()"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="formState.name" required autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="formState.title" required autocomplete="off" />
          </UFormGroup>
          <UInput
            @input="formState.handleFileChange($event.target.files[0])"
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
    </UModal> -->
    <!-- ------------------------------ Add Modal End -------------------------------- -->

    <!-- ------------------------------ Edit Modal ----------------------------------- -->
    <UModal v-model="formState.editModal" prevent-close>
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
              @click="formState.closeEditModal"
            />
          </div>
        </template>
        <UForm
          :state="formState"
          @submit.prevent="updateCaregory"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="formState.name" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="formState.title" autocomplete="off" />
          </UFormGroup>
          <UInput
            @input="formState.handleFileChange($event.target.files[0])"
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
        label="Add categories"
        class="me-4"
        @click="formState.addModal = true"
      />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="formState.rowItem.length"
      />
    </div>

    <Table
      :rows="rows"
      :columns="columns"
      :delete-item="deleteCategory"
      :open-modal="formState.openEditModal"
    />
  </div>
</template>
