<template>
  <div class="flex h-screen gap-4 p-4">
    <Sidebar />
    <div class="w-full flex flex-col h-screen gap-4">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

watch(() => route.fullPath,(newPath) => {
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
