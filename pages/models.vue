<script setup>
const rowItem = ref([]);
const addModal = ref(false);
const editModal = ref(false);
const selectedId = ref(null);
const brands = ref([]);

function editModalFunc(event) {
  editModal.value = event;

  formState.brand_id = "";
  formState.name = "";
}

const formState = reactive({
  name: "",
  brand_id: "",
});

function submitModel() {
  addModal.value = false;

  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name", formState.name);
  formData.append("brand_id", formState.brand_id);

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
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
      // Yangi modelni jadvalga qo'shish
      rowItem.value.push({
        id: data.data.id,
        name: data.data.name,
        brand: brands.value.find((b) => b.id === data.data.brand_id)?.title,
      });

      // Forma ma'lumotlarini tozalash
      formState.name = "";
      formState.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editCategory() {
  editModal.value = false;
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  const selectedItem = rowItem.value.find((p) => p.id === selectedId.value);
  formData.append("name", formState.name || selectedItem.name);
  formData.append(
    "brand_id",
    formState.brand_id ||
      brands.value.find((b) => b.title === selectedItem?.brand)?.id
  );

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/models/${selectedId.value}`,
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
      const updatedItem = rowItem.value.find((p) => p.id === selectedId.value);
      updatedItem.name = data?.data.name;
      updatedItem.brand =
        brands.value.find((b) => b.id === data.data.brand_id)?.title ||
        updatedItem.brand;

      formState.name = "";
      formState.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
    .then((response) => response.json())
    .then((items) => {
      items?.data?.map((item) => {
        rowItem.value.push({
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
        data.data.map((el) => {
          brands.value.push({ id: el.id, title: el.title });
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
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        const selectedItem = rowItem.value.find(
          (p) => p.id === selectedId.value
        );
        formState.name = selectedItem?.name || "";
        formState.brand_id =
          brands.value.find((b) => b.title === selectedItem?.brand)?.id || "";
        editModal.value = true;
      },
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        const token = localStorage.getItem("accessToken");
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${row.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          rowItem.value = rowItem.value.filter((p) => p.id !== row.id);
        });
      },
    },
  ],
];

const page = ref(1);
const pageCount = 10;
const rows = computed(() => {
  return rowItem.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <UModal v-model="addModal" prevent-close>
      <UCard>
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
          @submit.prevent="submitModel"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="formState.name" required autocomplete="off" />
          </UFormGroup>
          <USelect
            placeholder="Brands"
            :options="
              brands.map((brand) => ({ label: brand.title, value: brand.id }))
            "
            v-model="formState.brand_id"
          />
          <div>
            <UButton type="submit">Add</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

    <UModal v-model="editModal" prevent-close>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            Edit Category
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="editModalFunc(false)"
            />
          </div>
        </template>
        <UForm
          :state="formState"
          @submit.prevent="editCategory"
          class="py-4 flex flex-col gap-4"
        >
          <UFormGroup label="Title" name="title">
            <UInput v-model="formState.name" autocomplete="off" />
          </UFormGroup>
          <USelect
            placeholder="Brands"
            :options="
              brands.map((brand) => ({ label: brand.title, value: brand.id }))
            "
            v-model="formState.brand_id"
          />
          <div>
            <UButton type="submit">Update</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>

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
