<script setup>
const rowItem = ref([]);
const addModal = ref(false);
const editModal = ref(false);
const selectedId = ref(null);
const brands = ref([]);

function editModalFunc() {
  const editModal = ref(false);
  formState.name = "";
}

// inputga kiritilgan ma'lumotlarni saqlab turish uchun
const formState = reactive({
  name: "",
  brand_id: "",
});

// function submitModel() {
//   // Modalni yopish
//   addModal.value = false;

//   const token = localStorage.getItem("accessToken");
//   const formData = new FormData();
//   formData.append("name", formState.name);
//   formData.append("brand_id", formState.brand_id);

//   fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
//     method: "POST",
//     body: formData,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);

//       // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
//       rowItem.value.push({
//         id: data.id,
//         name: data.name,
//         brand: data.brand_title,
//       });

//       // Formani tozalash
//       formState.name = "";
//       formState.brand_id = "";
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
function submitModel() {
  // Konsol orqali formState va formData'ni tekshiramiz
  console.log("formState:", formState);

  // Modalni yopish
  addModal.value = false;

  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name", formState.name);
  formData.append("brand_id", formState.brand_id); // brand_id to'g'ri ID bo'lishi kerak

  // Konsol orqali formData'ni tekshirish
  console.log("FormData:", formData.get("name"), formData.get("brand_id"));

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
      console.log(data);

      // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
      rowItem.value.push({
        id: data?.data.id,
        name: data?.data.name,
        brand: data?.data.brand_title,
      });

      // Formani tozalash
      formState.name = "";
      formState.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editCategory() {
  editModal.value = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  formData.append(
    "name",
    formState.name || rowItem.value.find((p) => p.id === selectedId.value).name
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
      updatedItem.name = data?.data.name;

      // Formani tozalash
      formState.name = "";
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
          brand_id: item.brand_title,
        });
      });
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((response) => response.json())
    .then((data) => {
      if (data?.data) {
        data.data.map((el) => {
          brands.value.push({ id: el.id, title: el.title }); // Brend ID va title qo'shiladi
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching brands:", error); // Handle errors
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
        formState.name = row.name;
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

          <!-- <USelect
            placeholder="Brands"
            :options="brands"
            v-model="formState.brand_id"
          /> -->
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
              @click="editModal = false"
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
