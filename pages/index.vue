<script setup>
import { useCategoryStore } from "../store";
import { createCategory } from "../utils/post";
import { updateCaregory } from "../utils/put";
const toast = useToast();
const formState = useCategoryStore();

// const rowItem = ref([]);
// const selectedId = ref(null);

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
// onMounted(() => {
//   fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
//     .then((response) => response.json())
//     .then((items) => {
//       items?.data?.map((item) => {
//         formState.rowItem.value.push({
//           id: item.id,
//           name: item.name_en,
//           title: item.name_ru,
//           image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
//         });
//       });
//     });
// });

// function editModalClose(event) {
//   editModal.value = event;
//   formState.name = "";
//   formState.title = "";
// }

// const formState = reactive({
//   name: "",
//   title: "",
//   images: null, // yangi surat
//   oldImage: null, // eski surat
// });

// rasmni beckendga file qilib yuborish uchun hizmat qiladi
// function handleFileChange(event) {
//   formState.images = event;
// }

// function deleteItem(row) {
//   const token = localStorage.getItem("accessToken");

//   fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${row.id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (response.ok) {
//         toast.add({
//           title: "Deleted",
//           icon: "material-symbols:delete-outline",
//           timeout: 2000,
//           color: "red",
//         });
//         // Agar serverdan muvaffaqiyatli o‘chirilgan bo‘lsa

//         formState.rowItem.value = formState.rowItem.value.filter(
//           (p) => p.id !== row.id
//         );
//       } else {
//         console.error("Serverdan o‘chirishda xatolik:", response.status);
//       }
//     })
//     .catch((error) => {
//       console.error("DELETE so‘rovi bajarilmadi:", error);
//     });
// }

// function create() {
//   // Modalni yopish
//   addModal.value = false;

//   const token = localStorage.getItem("accessToken");
//   const formData = new FormData();
//   formData.append("name_en", formState.name);
//   formData.append("name_ru", formState.title);

//   if (formState.images) {
//     formData.append("images", formState.images);
//   }

//   fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
//     method: "POST",
//     body: formData,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       } else {
//         toast.add({
//           title: response.statusText,
//           icon: "i-heroicons-check-circle",
//           timeout: 3000,
//         });
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Yangi kategoriya qo'shilgandan keyin ma'lumotlar yangilanadi
//       rowItem.value.push({
//         id: data.data.id,
//         name: data.data.name_en,
//         title: data.data.name_ru,
//         image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data.data.image_src}`,
//       });

//       // Formani tozalash
//       formState.name = "";
//       formState.title = "";
//       formState.images = null;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function editModalFunc(row) {
//   formState.name = row.name;
//   formState.title = row.title;
//   formState.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
//   formState.oldImage = row.image; // eski suratni saqlaymiz
//   selectedId.value = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
//   editModal.value = true; // Tahrirlash oynasini ochish
// }

// categoriyani taxrirlovchi funksiya

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
    <!-- ------------------------------ Add Modal ------------------------------------ -->
    <UModal v-model="formState.addModal" prevent-close>
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
    </UModal>
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
              @click="formState.closeModal"
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

    <Table :rows="rows" :columns="columns" />
  </div>
</template>
