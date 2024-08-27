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
  <div>
    <UModal v-model="models.addModal" prevent-close>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            Add new items to the database
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="models.addModal = false"
            />
          </div>
        </template>
        <UForm
          :state="models"
          @submit.prevent="createModel"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="models.name" required autocomplete="off" />
          </UFormGroup>
          <USelect
            placeholder="Brands"
            :options="
              models.brands.map((brand) => ({
                label: brand.title,
                value: brand.id,
              }))
            "
            v-model="models.brand_id"
          />
          <div>
            <UButton type="submit">Add</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

    <UModal v-model="models.editModal" prevent-close>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            Edit Category
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="models.editModal = false"
            />
          </div>
        </template>
        <UForm
          :state="models"
          @submit.prevent="updateModels()"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Title" name="title">
            <UInput v-model="models.name" autocomplete="off" />
          </UFormGroup>
          <USelect
            placeholder="Brands"
            :options="
              models.brands.map((brand) => ({
                label: brand.title,
                value: brand.id,
              }))
            "
            v-model="models.brand_id"
          />
          <div>
            <UButton type="submit">Update</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

    <div
      class="flex justify-end px-3 py-3.5 dark:border-gray-700 sticky top-0 bg-[#191A19] z-10"
    >
      <UButton label="Add Model" class="me-4" @click="models.addModal = true" />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="models.rowItem.length"
      />
    </div>

    <!-- <UTable :rows="rows" :columns="columns">
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable> -->

    <!-- -------------------------------- Table -------------------------------------- -->
    <Table
      :rows="rows"
      :columns="columns"
      :delete-item="deleteModels"
      :open-modal="models.openEditModal"
    />
  </div>
</template>
