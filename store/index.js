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
      this.selectedItem = null;
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

export const useCarsStore = defineStore("cars", {
  state: () => {
    return {
      category_id: "",
      brand_id: "",
      model_id: "",
      location_id: "",
      city_id: "",
      rowItem: [],
      category: [],
      brands: [],
      models: [],
      locations: [],
      cities: [],
      openModal: false,
      color: "",
      year: "",
      seconds: "",
      max_speed: "",
      max_people: "",
      transmission: "",
      motor: "",
      drive_side: "",
      petrol: "",
      limitperday: "",
      deposit: "",
      premium_protection: "",
      price_in_aed: "",
      price_in_usd: "",
      price_in_aed_sale: "",
      price_in_usd_sale: "",
      inclusive: false,
      images: null, // car images
      imagesMain: null, // main image
      cover: null, // cover image
      oldImage: null, // eski surat
      selectedId: null,
      selectedItem: null,
      isEdit: false,
    };
  },
  actions: {
    openEditModal(row) {
      this.openModal = true; // Tahrirlash oynasini ochish
      this.images = null; // yangi fayl tanlanmagan bo'lsa bo'sh qoldiriladi
      this.color = row.color;
      this.year = row.year;
      this.seconds = row.seconds;
      this.max_speed = row.max_speed;
      this.max_people = row.max_people;
      this.transmission = row.transmission;
      this.motor = row.motor;
      this.drive_side = row.drive_side;
      this.petrol = row.petrol;
      this.limitperday = row.limitperday;
      this.deposit = row.deposit;
      this.premium_protection = row.premium_protection;
      this.price_in_aed = row.price_in_aed;
      this.price_in_usd = row.price_in_usd;
      this.price_in_aed_sale = row.price_in_aed_sale;
      this.price_in_usd_sale = row.price_in_usd_sale;
      this.inclusive = false;
      this.isEdit = true;
      this.selectedId = row.id;
      this.selectedItem = this.rowItem.find((p) => p.id === this.selectedId);
      this.category_id =
        this.category.find((b) => b.name === this.selectedItem.category.name_en)
          ?.id || "";
      this.brand_id =
        this.brands.find((b) => b.title === this.selectedItem.brand)?.id || "";
      this.model_id =
        this.models.find((b) => b.name === this.selectedItem.models.name)?.id ||
        "";
      this.location_id =
        this.locations.find((b) => b.name === this.selectedItem.location.name)
          ?.id || "";
      this.city_id =
        this.cities.find((b) => b.name === this.selectedItem.cities.name)?.id ||
        "";
    },
    closeModal() {
      this.openModal = false;
      this.color = "";
      this.title = "";
      this.oldImage = null; // eski suratni saqlaymiz
      this.selectedId = null; // Tahrirlanayotgan qatorning ID'sini saqlash
      this.isEdit = false;
    },
    handleFileChange(event) {
      this.images = event;
    },
    handleFileChangeMain(event) {
      this.imagesMain = event;
    },
    handleFileChangeCover(event) {
      this.cover = event;
    },
  },
});
