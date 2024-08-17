<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="w-full flex flex-col h-screen">
      <Header />
      <slot />
    </div>
  </div>
</template>
