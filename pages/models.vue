<script setup>
const rowItem = ref([]);
const addModal = ref(false);
const editModal = ref(false);
const selectedId = ref(null);
const brands = ref([]);

function editModalFunc() {
  editModal.value = false;
}

const formState = reactive({
  name: "",
  brand: "",
});

function handleFileChange(event) {
  formState.images = event;
}

function submitCategory() {
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name", formState.name);
  formData.append("brand", formState.name);

  console.log(formState);

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
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
      rowItem.value.push({
        id: data.data.id,
        title: data.data.title,
      });

      // Modalni yopish
      addModal.value = false;

      // Formani tozalash
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

  formData.append(
    "title",
    formState.title ||
      rowItem.value.find((p) => p.id === selectedId.value).title
  );

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${selectedId.value}`,
    {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = rowItem.value.find((p) => p.id === selectedId.value);
      updatedItem.title = data?.data.title;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      editModal.value = false; // Modalni yopish

      // Formani tozalash
      formState.title = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
    .then((response) => response.json())
    .then((items) => {
      console.log(items.data, "get Modales");

      items?.data?.map((item) => {
        rowItem.value.push({
          id: item.id,
          name: item.name,
          brand: item.brand_title,
        });
      });
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((response) => response.json())
    .then((data) => {
      console.log(data?.data);

      if (data?.data) {
        data.data.map((el) => {
          brands.value.push(el.title); // Push each brand title to the brands array
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching brands:", error); // Handle errors
    });
});

console.log(brands.value, "brands");

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
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        formState.title = row.title;
        formState.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
        formState.oldImage = row.image; // eski suratni saqlaymiz
        selectedId.value = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
        editModal.value = true; // Tahrirlash oynasini ochish
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        const token = localStorage.getItem("accessToken");
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${row.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          // O'chirilgandan keyin arraydan o'chirish
          rowItem.value = rowItem.value.filter((p) => p.id !== row.id);
        });
      },
    },
  ],
];

// sahifada 5 ta itemdan oshib ketsa keyingi sahifadagi table saqlaydi
const page = ref(1);
const pageCount = 5;
const rows = computed(() => {
  return rowItem.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <!-- ------------------------------ Add Modal ------------------------------------ -->
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
          @submit.prevent="submitCategory"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="formState.title" required autocomplete="off" />
          </UFormGroup>
          <USelect
            placeholder="Brands"
            :options="brands"
            :model-value="formState.brand"
          />
          <div>
            <UButton type="submit">Add</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
    <!-- ------------------------------ Add Modal End -------------------------------- -->

    <!-- ------------------------------ Edit Modal ----------------------------------- -->
    <UModal v-model="editModal" prevent-close>
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
              @click="editModalFunc"
            />
          </div>
        </template>
        <UForm
          :state="formState"
          @submit.prevent="editCategory"
          class="py-4 flex flex-col gap-4"
        >
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
            <UButton type="submit">Update</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

    <!-- ------------------------------ Edit Modal End ------------------------------- -->
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UButton label="Add Model" class="me-4" @click="addModal = true" />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="rowItem.length"
      />
    </div>

    <!-- -------------------------------- Table -------------------------------------- -->
    <div class="h-[600px] overflow-y-scroll">
      <UTable :rows="rows" :columns="columns" class="overflow-y-hidden">
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
  </div>
</template>
