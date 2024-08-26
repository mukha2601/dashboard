// stores/counter.js
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("formState", {
  state: () => {
    return {
      rowItem: [],
      addModal: false,
      editModal: false,
      name: "",
      title: "",
      selectedId: null,
      images: null, // yangi surat
      oldImage: null, // eski surat
    };
  },
  actions: {
    openModal(row) {
      this.name = row.name;
      this.title = row.title;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.editModal = true; // Tahrirlash oynasini ochish
    },
    closeModal() {
      this.editModal = false;
      this.name = "";
      this.title = "";
    },
    handleFileChange(event) {
      this.images = event;
    },
    deleteItem(row) {
      const token = localStorage.getItem("accessToken");

      fetch(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${row.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            toast.add({
              title: "Deleted",
              icon: "material-symbols:delete-outline",
              timeout: 2000,
              color: "red",
            });
            // Agar serverdan muvaffaqiyatli o‘chirilgan bo‘lsa

            formState.rowItem.value = formState.rowItem.value.filter(
              (p) => p.id !== row.id
            );
          } else {
            console.error("Serverdan o‘chirishda xatolik:", response.status);
          }
        })
        .catch((error) => {
          console.error("DELETE so‘rovi bajarilmadi:", error);
        });
    },
  },
});

export const useBrandsStore = defineStore("formState", {
  state: () => {
    return {
      title: "",
      images: null, // yangi surat
      oldImage: null, // eski surat
    };
  },
});

export const useModelsStore = defineStore("formState", {
  state: () => {
    return {
      name: "",
      brand_id: "",
    };
  },
});

export const useCitiesStore = defineStore("formState", {
  state: () => {
    return {
      open: false,
      name: "",
      text: "",
      images: null, // yangi surat
      oldImage: null, // eski surat
    };
  },
  actions: {
    closeModal() {
      this.open = false;
      this.name = "";
      this.text = "";
    },
    handleFileChange(event) {
      this.images = event;
    },
  },
});
