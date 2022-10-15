<template>
  <div>
    <NuxtPage />
    <ul>
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
      <li>
        <button @click="$router.push('/' + (Math.random() * 100).toFixed(2))">Random page</button>
      </li>
    </ul>
  </div>
</template>
