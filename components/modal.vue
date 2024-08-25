<template>
  <UModal v-model="addModal" prevent-close>
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
            @click="addModal = false"
          />
        </div>
      </template>
      <UForm
        :state="formState"
        @submit.prevent="create"
        class="py-4 flex flex-col gap-4"
      >
        <UFormGroup label="Name" name="name">
          <UInput v-model="formState.name" required autocomplete="off" />
        </UFormGroup>
        <UFormGroup label="Title" name="title">
          <UInput v-model="formState.title" required autocomplete="off" />
        </UFormGroup>
        <UInput
          @input="handleFileChange($event.target.files[0])"
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
