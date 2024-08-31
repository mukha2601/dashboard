<template>
  <UTable :rows="rows" :columns="columns">
    <template #image-data="{ row }">
      <NuxtImg
        width="100"
        height="50"
        densities="x1"
        :src="row.image"
        alt="Category Image"
        class="object-cover rounded-md bg-[#292b29] p-1"
      />
    </template>
    <template #actions-data="{ row }">
      <div class="flex gap-4">
        <UButton label="Edit" color="gray" @click="openModal(row)" />
        <UPopover overlay>
          <UButton
            color="white"
            label="Delete"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />

          <template #panel="{ close }">
            <div class="p-4 flex flex-col gap-4">
              <div class="flex gap-3">
                <UIcon
                  name="ph:warning-circle-bold"
                  color="yellow"
                  class="w-5 h-5"
                />
                <p>Do you want to delete this brand?</p>
              </div>
              <div class="flex gap-4">
                <UButton
                  label="OK"
                  color="primary"
                  variant="outline"
                  @click="
                    () => {
                      deleteItem(row);
                      close();
                    }
                  "
                />
                <UButton label="Cencel" variant="outline" color="orange" @click="close" />
              </div>
            </div>
          </template>
        </UPopover>
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
  deleteItem: {
    type: Function,
    required: true,
  },
  openModal: {
    type: Function,
    required: true,
  },
});
</script>
