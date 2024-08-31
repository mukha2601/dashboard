<template>
  <div
    class="w-full bg-[#191A19] h-[10vh] flex justify-end p-4 px-6 rounded-md"
  >
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        color="white"
        label="profile"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      >
        <template #leading>
          <UIcon
            name="material-symbols:account-circle-outline"
            class="w-5 h-5"
          />
        </template>
      </UButton>
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],

  [
    {
      label: "Log out",
      icon: "material-symbols:exit-to-app",
      shortcuts: ["⌘", "D"],
      click: () => {
        localStorage.removeItem("accessToken");
        router.push("/login");
      },
    },
  ],
];
</script>
