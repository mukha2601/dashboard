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

export const useBrandsStore = defineStore("brands", {
  state: () => {
    return {
      rowItem: [],
      addModal: false,
      editModal: false,
      selectedId: null,
      title: "",
      images: null, // yangi surat
      oldImage: null, // eski surat
    };
  },
  actions: {
    openEditModal(row) {
      this.title = row.title;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.editModal = true; // Tahrirlash oynasini ochish
    },
    closeEditModal() {
      this.editModal = false;
      this.title = "";
    },
    handleFileChange(event) {
      this.images = event;
    },
  },
});

export const useModelsStore = defineStore("models", {
  state: () => {
    return {
      rowItem: [],
      addModal: false,
      editModal: false,
      selectedId: null,
      selectedItem: null,
      brands: [],
      name: "",
      brand_id: "",
    };
  },
  actions: {
    openEditModal(row) {
      // Hozirgi qatorning id sini yangilash
      this.selectedId = row.id;

      // Hozirgi qatorning elementini olish
      this.selectedItem = this.rowItem.find((p) => p.id === this.selectedId);

      if (this.selectedItem) {
        this.name = this.selectedItem.name || "";
        this.brand_id =
          this.brands.find((b) => b.title === this.selectedItem.brand)?.id ||
          "";
      } else {
        console.error("Qator elementi topilmadi");
      }

      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
      this.name = "";
      this.brand_id = "";
    },
    handleFileChange(event) {
      this.images = event;
    },
  },
});

export const useCitiesStore = defineStore("cities", {
  state: () => {
    return {
      rowItem: [],
      addModal: false,
      editModal: false,
      selectedId: null,
      name: "",
      text: "",
      images: null, // yangi surat
      oldImage: null, // eski surat
    };
  },
  actions: {
    openEditModal(row) {
      this.editModal = true; // Tahrirlash oynasini ochish
      this.name = row.name;
      this.text = row.text;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
    },
    closeEditModal() {
      this.editModal = false;
      this.text = "";
      this.name = "";
    },
    handleFileChange(event) {
      this.images = event;
    },
  },
});
