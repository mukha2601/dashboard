// stores/counter.js
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      rowItem: [],
      openModal: false,
      name: "",
      title: "",
      selectedId: null,
      images: null, // yangi surat
      oldImage: null, // eski surat
      isEdit: false,
    };
  },
  actions: {
    openEditModal(row) {
      this.openModal = true; // Tahrirlash oynasini ochish
      this.name = row.name;
      this.title = row.title;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.isEdit = true;
    },
    closeModal() {
      this.openModal = false;
      this.name = "";
      this.title = "";
      this.oldImage = null; // eski suratni saqlaymiz
      this.selectedId = null; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.isEdit = false;
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
      openModal: false,
      selectedId: null,
      title: "",
      images: null, // yangi surat
      oldImage: null, // eski surat
      isEdit: false,
    };
  },
  actions: {
    openEditModal(row) {
      this.openModal = true; // Tahrirlash oynasini ochish
      this.title = row.title;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.isEdit = true;
    },
    closeModal() {
      this.openModal = false;
      this.title = "";
      this.oldImage = null; // eski suratni saqlaymiz
      this.selectedId = null; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.isEdit = false;
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
      openModal: false,
      isEdit: false,
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

      this.openModal = true;
      this.isEdit = true;
    },
    closeModal() {
      this.selectedItem = null
      this.selectedId = null;
      this.openModal = false;
      this.isEdit = false;
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
      openModal: false,
      isEdit: false,
      selectedId: null,
      name: "",
      text: "",
      images: null, // yangi surat
      oldImage: null, // eski surat
    };
  },
  actions: {
    openEditModal(row) {
      this.openModal = true; // Tahrirlash oynasini ochish
      this.name = row.name;
      this.text = row.text;
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.oldImage = row.image; // eski suratni saqlaymiz
      this.selectedId = row.id; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.isEdit = true;
    },
    closeModal() {
      this.openModal = false;
      this.isEdit = false;
      this.oldImage = null; // eski suratni saqlaymiz
      this.selectedId = null; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.text = "";
      this.name = "";
    },
    handleFileChange(event) {
      this.images = event;
    },
  },
});
