<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <UNotifications />
  <UModals />
</template>

<style>
body {
  background-color: #0c0c0c;
}

::-webkit-scrollbar {
  width: 0.4rem;
  background-color: rgb(75, 75, 75);
}

::-webkit-scrollbar-thumb {
  background: rgb(167, 167, 167);
}
</style>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

useHead({
  title: "Dashboard",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      content:
        "Bu sayt uchun admin panel hisoblanadi va websahyt uchun ma'lumotlar shu yerdan qoshiladi",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }],
});

useSeoMeta({
  ogTitle: "My Dashboard",
  ogDescription:
    "Bu sayt uchun admin panel hisoblanadi va websahyt uchun ma'lumotlar shu yerdan qoshiladi",
  ogImage: "https://dashboard-six-alpha-33.vercel.app/logo.ico",
  ogUrl: "https://dashboard-six-alpha-33.vercel.app/",
  ogType: "website",
});

watch(
  () => route.fullPath,
  (newPath) => {
    localStorage.setItem("lastPage", newPath);
  }
);

onMounted(() => {
  const token = localStorage.getItem("accessToken");
  const lastPage = localStorage.getItem("lastPage");

  if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
    // Agar token mavjud bo'lsa, home sahifada qoladi yoki boshqa sahifaga yo'naltiradi
    router.push(lastPage);
  } else {
    // Agar token mavjud bo'lmasa, login sahifasiga yo'naltiradi
    router.push("/login");
  }
});
</script>
