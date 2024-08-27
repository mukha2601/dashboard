<template>
  <UModal v-model="formState.addModal" prevent-close>
    <UCard>
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
        @submit.prevent="createCategory()"
        class="py-4 flex flex-col gap-4"
      >
        <!-- Dynamic form inputs -->
        <div v-for="(item, index) in modal" :key="item.key">
          <UFormGroup :label="item.label" :name="item.key">
            <!-- Bind v-model to the formState's properties -->
            <UInput v-model="formState[item.key]" required autocomplete="off" />
          </UFormGroup>
        </div>

        <!-- File input handling -->
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
  </UModal>
</template>

<script setup>
import { useCategoryStore } from "../store/index";
import { createCategory } from "../utils/post";

const formState = useCategoryStore();

const props = defineProps({
  modal: {
    type: Array,
    required: true,
  },
});
</script>
