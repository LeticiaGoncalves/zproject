<template>
<div>
<nav class="bg-green-400 px-48" role="navigation">
  <div class="container  p-4 flex flex-wrap items-center md:flex-no-wrap">
    <div class="mr-4 md:mr-8">
      
    </div>
    <div class="w-full md:w-auto md:flex-grow md:flex md:items-center">
      <ul class="flex mt-4  -mx-4 pt-4  md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0">
        <li>
          <router-link to="/Home" class="block px-4 py-1 md:p-2 lg:px-4 text-white" active-class="active">Home</router-link>
        </li>
        <li>
           <router-link to="/Register" class="block px-4 py-1 md:p-2 lg:px-4  text-white" active-class="active">Cadastrar Usuário</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
 <router-view></router-view>
</div>

</template>


<script>


export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;


}
  .active {
   font-weight: bold;
   margin-bottom: solid 1px white;
  }
</style>
