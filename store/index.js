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
    openEditModal(row) {
      this.name = row.name;
      this.title = row.title;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.editModal = true; // Tahrirlash oynasini ochish
    },
    closeEditModal() {
      this.editModal = false;
      this.name = "";
      this.title = "";
    },
    handleFileChange(event) {
      this.images = event;
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
