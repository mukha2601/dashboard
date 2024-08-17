<template>
  <div class="w-full bg-[#1f2937] h-[10vh] flex justify-end p-4">
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        color="white"
        label="profile"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      >
        <template #leading>
          <UAvatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            size="2xs"
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
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      disabled: true,
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      shortcuts: ["D"],
      disabled: true,
    },
  ],
  [
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
      disabled: true,
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
