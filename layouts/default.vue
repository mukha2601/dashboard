<template>
  <div class="flex h-screen gap-4 p-4">
    <Sidebar />
    <div class="w-full flex flex-col gap-4">
      <Header />
      <div class="bg-[#191A19] h-[100%] rounded-md overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>