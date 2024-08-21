<script setup>
// import { ref, reactive, onMounted, computed } from "vue";
const router = useRouter();

const people = ref([]);
const isOpen = ref(false);
const selectedId = ref(null);
const isEditing = ref(false);

const formState = reactive({
  name: "",
  title: "",
  images: null,
});

function handleFileChange(event) {
  formState.images = event;
}

function submitCategory() {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name_en", formState.name);
  formData.append("name_ru", formState.title);

  console.log(formState);  

  if (formState.images) {
    formData.append("images", formState.images);
  }

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      people.value.push({
        id: data.data.id,
        name: data.data.name_en,
        title: data.data.name_ru,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
      });

      // Modalni yopish
      isOpen.value = false;

      // Formani tozalash
      formState.name = "";
      formState.title = "";
      formState.images = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


function editCategory() {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name_en", formState.name);
  formData.append("name_ru", formState.title);

  if (formState.images) {
    formData.append("images", formState.images);
  }

  fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedId.value}`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = people.value.find((p) => p.id === selectedId.value);
      updatedItem.name = data.name_en;
      updatedItem.title = data.name_ru;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.image_src}`;

      isOpen.value = false;
      isEditing.value = false;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then((response) => response.json())
    .then((items) => {
      items?.data?.map((item) => {
        people.value.push({
          id: item.id,
          name: item.name_en,
          title: item.name_ru,
          image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
        });
      });
    });
});

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
      click: () => {
        formState.name = row.name;
        formState.title = row.title;
        formState.images = row.image; // Agar kerak bo'lsa
        selectedId.value = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
        isEditing.value = true; // Tahrirlash rejimini o'rnatish
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        const token = localStorage.getItem("accessToken");
        fetch(
          `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${row.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(() => {
          // O'chirilgandan keyin arraydan o'chirish
          people.value = people.value.filter((p) => p.id !== row.id);
        });
      },
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
  <div>
    <!-- ------------------------------ Add Modal ------------------------------------ -->
    <UModal v-model="isOpen" prevent-close>
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
              @click="isOpen = false"
            />
          </div>
        </template>
        <UForm
          :state="formState"
          @submit.prevent="submitCategory"
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
    <!-- ------------------------------ Add Modal End ------------------------------------ -->

    <!-- ------------------------------ Edit Modal ------------------------------------ -->
    <UModal v-model="isEditing" prevent-close>
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
              @click="isEditing = false"
            />
          </div>
        </template>
        <UForm
          :state="formState"
          @submit.prevent="editCategory"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="formState.name" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Title" name="title">
            <UInput v-model="formState.title" autocomplete="off" />
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
    <!-- ------------------------------ Edit Modal End ------------------------------------ -->
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UButton label="Add categories" class="me-4" @click="isOpen = true" />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="people.length"
      />
    </div>

    <UTable :rows="rows" :columns="columns" class="overflow-y-hidden">
      <template #image-data="{ row }">
        <img
          :src="row.image"
          alt="Category Image"
          class="h-24 w-40 object-cover"
        />
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
  </div>
</template>
