<script setup>
import { useModelsStore } from "../store";
const toast = useToast();
const rowItem = ref([]);
const addModal = ref(false);
const editModal = ref(false);
const selectedId = ref(null);
const selectedItem = ref(null);
const brands = ref([]);

function editModalFunc(event) {
  editModal.value = event;

  formState.brand_id = "";
  formState.name = "";
}

const formState = useModelsStore();

// const formState = reactive({
//   name: "",
//   brand_id: "",
// });

function submitModel() {
  addModal.value = false;

  const token = localStorage.getItem("accessToken");
  // const formData = new FormData();
  // formData.append("name", formState.name);
  // formData.append("brand_id", formState.brand_id);

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
    method: "POST",
    // body: formData,
    body: JSON.stringify({
      name: formState.name,
      brand_id: formState.brand_id,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        toast.add({
          title: response.statusText,
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
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

  // selectedItem.value = rowItem.value.find((p) => p.id === selectedId.value);
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
      } else {
        toast.add({
          title: "Edited",
          icon: "i-heroicons-check-circle",
          timeout: 3000,
        });
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
        // Hozirgi qatorning id sini yangilash
        selectedId.value = row.id;

        // Hozirgi qatorning elementini olish
        selectedItem.value = rowItem.value.find(
          (p) => p.id === selectedId.value
        );

        if (selectedItem.value) {
          formState.name = selectedItem.value.name || "";
          formState.brand_id =
            brands.value.find((b) => b.title === selectedItem.value.brand)
              ?.id || "";
        } else {
          console.error("Qator elementi topilmadi");
        }

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
        })
          .then((response) => {
            if (response.ok) {
              toast.add({
                title: "Deleted",
                icon: "material-symbols:delete-outline",
                timeout: 2000,
                color: "red",
              });
              // Agar serverdan muvaffaqiyatli o‘chirilgan bo‘lsa
              rowItem.value = rowItem.value.filter((p) => p.id !== row.id);
            } else {
              toast.add({
                title: response.statusText,
                icon: "carbon:close-filled",
                timeout: 2000,
                color: "red",
              });
            }
          })
          .catch((error) => {
            console.error("DELETE so‘rovi bajarilmadi:", error);
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
      class="flex justify-end px-3 py-3.5 dark:border-gray-700 sticky top-0 bg-[#191A19] z-10"
    >
      <UButton label="Add Model" class="me-4" @click="addModal = true" />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="rowItem.length"
      />
    </div>

    <UTable :rows="rows" :columns="columns">
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
