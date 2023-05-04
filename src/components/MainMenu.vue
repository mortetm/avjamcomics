<template>
  <nav>
    <router-link to="/latest"><img src="@/assets/logo.png" /></router-link>
    <div>
      <router-link to="/latest">Latest</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/">Other Comics</router-link>
    </div>
  </nav>
</template>

<style scoped>
img {
  max-width: 200px;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: calc(1024px - 5%);
  margin: 0 auto;
  padding: 30px 3%;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
}

nav a.router-link-exact-active {
  color: #d4af37;
}
</style>
