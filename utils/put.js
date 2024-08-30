import {
  useCategoryStore,
  useBrandsStore,
  useModelsStore,
  useCitiesStore,
  useCarsStore
} from "../store/index";

function updateCaregory() {
  const category = useCategoryStore();
  category.openModal = false; // Modalni yopish
  const formData = new FormData();
  const token = localStorage.getItem("accessToken");
  formData.append(
    "name_en",
    category.name ||
      category.rowItem.find((p) => p.id === category.selectedId).name
  );
  formData.append(
    "name_ru",
    category.title ||
      category.rowItem.find((p) => p.id === category.selectedId).title
  );

  // Agar yangi rasm tanlangan bo'lsa, uni formData'ga qo'shing, aks holda eski rasmni oling
  if (category.images) {
    formData.append("images", category.images); // yangi surat
  } else {
    formData.append("image_src", category.oldImage); // eski suratni yuborish
  }

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${category.selectedId}`,
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
        //   toast.add({
        //     title: "Edited",
        //     icon: "i-heroicons-check-circle",
        //     timeout: 3000,
        //   });
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = category.rowItem.find(
        (p) => p.id === category.selectedId
      );
      updatedItem.name = data?.data.name_en;
      updatedItem.title = data?.data.name_ru;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      // Formani tozalash
      category.name = "";
      category.title = "";
      category.images = null;
      category.oldImage = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateBrands() {
  const brands = useBrandsStore();
  brands.openModal = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  formData.append(
    "title",
    brands.title || rowItem.find((p) => p.id === selectedId).title
  );

  // Agar yangi rasm tanlangan bo'lsa, uni formData'ga qo'shing, aks holda eski rasmni oling
  if (brands.images) {
    formData.append("images", brands.images); // yangi surat
  } else {
    formData.append("image_src", brands.oldImage); // eski suratni yuborish
  }

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${brands.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = brands.rowItem.find(
        (p) => p.id === brands.selectedId
      );
      updatedItem.title = data?.data.title;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      // Formani tozalash
      brands.title = "";
      brands.images = null;
      brands.oldImage = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateModels() {
  const models = useModelsStore();
  models.openModal = false;
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  // selectedItem.value = rowItem.value.find((p) => p.id === selectedId.value);
  formData.append("name", models.name || models.selectedItem.name);
  formData.append(
    "brand_id",
    models.brand_id ||
      models.brands.find((b) => b.title === models.selectedItem?.brand)?.id
  );

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/models/${models.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      const updatedItem = models.rowItem.find(
        (p) => p.id === models.selectedId
      );
      updatedItem.name = data?.data.name;
      updatedItem.brand =
        models.brands.find((b) => b.id === data.data.brand_id)?.title ||
        updatedItem.brand;

      models.name = "";
      models.brand_id = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateCities() {
  const cities = useCitiesStore();
  cities.openModal = false; // Modalni yopish
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();

  formData.append(
    "name",
    cities.name || cities.value.find((p) => p.id === cities.selectedId).name
  );
  formData.append(
    "text",
    cities.text || cities.value.find((p) => p.id === cities.selectedId).text
  );

  // Agar yangi rasm tanlangan bo'lsa, uni formData'ga qo'shing, aks holda eski rasmni oling
  if (cities.images) {
    formData.append("images", cities.images); // yangi surat
  } else {
    formData.append("image_src", cities.oldImage); // eski suratni yuborish
  }

  fetch(
    `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${cities.selectedId}`,
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
        // toast.add({
        //   title: "Edited",
        //   icon: "i-heroicons-check-circle",
        //   timeout: 3000,
        // });
      }
      return response.json();
    })
    .then((data) => {
      // Ma'lumotni yangilash
      const updatedItem = cities.rowItem.find(
        (p) => p.id === cities.selectedId
      );
      updatedItem.name = data?.data.name;
      updatedItem.text = data?.data.text;
      updatedItem.image = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${data?.data.image_src}`;

      // Formani tozalash
      cities.name = "";
      cities.text = "";
      cities.images = null;
      cities.oldImage = null;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateCars() {
  const cars = useCarsStore();
  cars.openModal = false;
  const token = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("category_id", cars.category_id);
  formData.append("brand_id", cars.brand_id);
  formData.append("model_id", cars.model_id);
  formData.append("location_id", cars.location_id);
  formData.append("city_id", cars.city_id);
  formData.append("color", cars.color);
  formData.append("year", cars.year);
  formData.append("seconds", cars.seconds);
  formData.append("max_speed", cars.max_speed);
  formData.append("max_people", cars.max_people);
  formData.append("transmission", cars.transmission);
  formData.append("motor", cars.motor);
  formData.append("drive_side", cars.drive_side);
  formData.append("petrol", cars.petrol);
  formData.append("limitperday", cars.limitperday);
  formData.append("deposit", cars.deposit);
  formData.append("premium_protection", cars.premium_protection);
  formData.append("price_in_aed", cars.price_in_aed);
  formData.append("price_in_usd", cars.price_in_usd);
  formData.append("price_in_aed_sale", cars.price_in_aed_sale);
  formData.append("price_in_usd_sale", cars.price_in_usd_sale);
  formData.append("inclusive", cars.inclusive);

  if (cars.images) {
    formData.append("images", cars.images);
  }
  if (cars.imagesMain) {
    formData.append("imagesMain", cars.imagesMain);
  }
  if (cars.cover) {
    formData.append("cover", cars.cover);
  }

  fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${cars.selectedId}`, {
    method: "PUT",
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
    .then((item) => {
      console.log(item);

      // Find the item to update
      const index = cars.rowItem.findIndex((p) => p.id === cars.selectedId);

      if (index !== -1) {
        // Update the item with the new data
        cars.rowItem[index] = {
          id: item.data.id,
          brand: cars.brands.find((b) => b.id === item.data.brand_id)?.title,
          category: cars.category.find((b) => b.id === item.data.category_id)
            ?.name,
          city: cars.cities.find((b) => b.id === item.data.city_id)?.name,
          model: cars.models.find((b) => b.id === item.data.model_id)?.name,
          location: cars.locations.find((b) => b.id === item.data.location_id)
            ?.name,
          color: item.data.color,
          car_images: item.data.car_images,
          deposit: item.data.deposit,
          drive_side: item.data.drive_side,
          limitperday: item.data.limitperday,
          max_people: item.data.max_people,
          max_speed: item.data.max_speed,
          motor: item.data.motor,
          petrol: item.data.petrol,
          premium_protection: item.data.premium_protection,
          price_in_aed: item.data.price_in_aed,
          price_in_aed_sale: item.data.price_in_aed_sale,
          price_in_usd: item.data.price_in_usd,
          price_in_usd_sale: item.data.price_in_usd_sale,
          seconds: item.data.seconds,
          three_days_price: item.data.three_days_price,
          transmission: item.data.transmission,
          two_days_price: item.data.two_days_price,
          year: item.data.year,
          image: item.data.image_src
            ? `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.data.image_src}`
            : "default-image.jpg", // Fallback image
        };
      }

      // Clear form values
      cars.closeModal(); // Assuming you have a clearForm method
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export { updateCaregory, updateBrands, updateModels, updateCities, updateCars };
