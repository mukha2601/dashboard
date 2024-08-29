<script setup>
import { useCarsStore } from "../store";
import { deleteCars } from "../utils/delete";
const cars = useCarsStore();

// sahifa ishga tushishidan oldin ishlaydigan funksiya
onMounted(() => {
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
    .then((response) => response.json())
    .then((items) => {
      console.log(items);

      cars.rowItem = items?.data?.map((item) => ({
        id: item.id,
        brand: item.brand.title,
        category: item.category,
        city: item.city.name,
        models: item.model,
        location: item.location,
        model: item.model.name,
        color: item.color,
        cities: item.city,
        car_images: item.car_images,
        deposit: item.deposit,
        drive_side: item.drive_side,
        limitperday: item.limitperday,
        max_people: item.max_people,
        max_speed: item.max_speed,
        motor: item.motor,
        petrol: item.petrol,
        premium_protection: item.premium_protection,
        price_in_aed: item.price_in_aed,
        price_in_aed_sale: item.price_in_aed_sale,
        price_in_usd: item.price_in_usd,
        price_in_usd_sale: item.price_in_usd_sale,
        seconds: item.seconds,
        three_days_price: item.three_days_price,
        transmission: item.transmission,
        two_days_price: item.two_days_price,
        year: item.year,
        image: `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`,
      }));
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then((response) => response.json())
    .then((items) => {
      cars.category = [];
      cars.category = items?.data?.map((item) => ({
        id: item.id,
        name: item.name_en,
      }));
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
    .then((response) => response.json())
    .then((items) => {
      console.log(items);
      
      cars.models = [];
      items?.data?.map((item) => {
        cars.models.push({
          id: item.id,
          name: item.name, // To'g'ri brendni olish
        });
      });
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
    .then((response) => response.json())
    .then((data) => {
      if (data?.data) {
        cars.brands = [];
        data.data.map((el) => {
          cars.brands.push({ id: el.id, title: el.title });
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
    .then((response) => response.json())
    .then((data) => {
      if (data?.data) {
        cars.locations = [];
        data.data.map((el) => {
          cars.locations.push({ id: el.id, name: el.name });
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching brands:", error);
    });

  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
    .then((response) => response.json())
    .then((items) => {
      cars.cities = [];
      items?.data?.map((item) => {
        cars.cities.push({
          id: item.id,
          name: item.name,
        });
      });
    });
});

const modal = [
  {
    key: "color",
    label: "Color",
    value: "color",
  },
  {
    key: "year",
    label: "Year",
    value: "year",
  },
  {
    key: "seconds",
    label: "Seconds",
    value: "seconds",
  },
  {
    key: "max_speed",
    label: "Max speed",
    value: "max_speed",
  },
  {
    key: "seconds",
    label: "Seconds",
    value: "seconds",
  },
  {
    key: "max_people",
    label: "Max people",
    value: "max_people",
  },
  {
    key: "transmission",
    label: "Transmission",
    value: "transmission",
  },
  {
    key: "motor",
    label: "Motor",
    value: "motor",
  },
  {
    key: "drive_side",
    label: "Drive Side",
    value: "drive_side",
  },
  {
    key: "petrol",
    label: "Petrol",
    value: "petrol",
  },
  {
    key: "deposit",
    label: "Deposit",
    value: "deposit",
  },
  {
    key: "limitperday",
    label: "Limit Per Day",
    value: "limitperday",
  },
  {
    key: "premium_protection",
    label: "Premium Protection Price",
    value: "premium_protection",
  },
  {
    key: "price_in_aed",
    label: "Price in Aed",
    value: "price_in_aed",
  },
  {
    key: "price_in_usd",
    label: "Price in Usd",
    value: "price_in_usd",
  },
  {
    key: "price_in_aed_sale",
    label: "Price in Aed(Otd)",
    value: "price_in_aed_sale",
  },
  {
    key: "price_in_usd_sale",
    label: "Price in Usd(Otd)",
    value: "price_in_usd_sale",
  },
];

const columns = [
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "model",
    label: "Model",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

// table da nechta qator ko'rinishini hisoblaydi
const page = ref(1);
const pageCount = 7;
const rows = computed(() => {
  return cars.rowItem.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>

<template>
  <div>
    <div class="flex justify-end px-3 py-3.5 sticky top-0 bg-[#191A19] z-10">
      <UButton
        label="Add categories"
        class="me-4"
        @click="cars.openModal = true"
      />
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="cars.rowItem.length"
      />
    </div>

    <Modal :modal="modal" />
    <Table
      :rows="rows"
      :columns="columns"
      :delete-item="deleteCars"
      :open-modal="cars.openEditModal"
    />
  </div>
</template>
