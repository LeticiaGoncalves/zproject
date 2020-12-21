<template>
  <div class="md:container md:mx-auto">
    <div class="border-gray-800 p-8 container  mx-auto">
      <div class="flex justify-between">
        <div>
          <h1>Cadastro de perfil</h1>
          <p>Insira suas informações pessoais e o valor atual em conta corrente</p>
        </div>
        <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
          class="w-16 rounded-full	"
        />
      </div>

      <form @submit.prevent="submitForm">
        <input
          v-model="user.name"
          type="text"
          placeholder="Nome completo"
          class="my-input"
        />
        <span v-if="!$v.user.name.required && $v.user.name.$dirty" class="my-disclaimer">Insira seu nome completo</span>

        <input
          v-model="user.email"
          class="my-input"
          placeholder="E-mail"
        />
        <span v-if="(!$v.user.email.required || !$v.user.email.email ) && $v.user.email.$dirty" class="my-disclaimer">Insira um email válido</span>
        
        <div class="flex">
          <div class="flex-grow mr-3">
            <the-mask :mask="['###.###.###-##']"
              v-model="user.cpf"
              class="my-input "
              type="text"
              placeholder="CPF"
            />
            <span v-if="(!$v.user.cpf.required || !$v.user.cpf.minLength ) && $v.user.cpf.$dirty" class="my-disclaimer">Insira um cpf válido</span>
          </div>
          <div class="flex-grow">
            <the-mask :mask="['(##) ####-####', '(##) #####-####']"
              v-model="user.phone"
              class="my-input"
              type="text"
              placeholder="Telefone"
            />
            <span v-if="(!$v.user.phone.required || !$v.user.phone.minLength ) && $v.user.phone.$dirty" class="my-disclaimer">Insira telefone válido</span>
          </div>
        </div>
        <div class="flex ">
          <div class="flex-grow mr-3">
            <vc-date-picker v-model="user.birthDate"> 
              <template  v-slot="{ inputValue, inputEvents }"> 
                <input
                 placeholder="Data de nascimento"
                class="my-input"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </vc-date-picker>
            <span v-if="(!$v.user.birthDate.required || !$v.user.birthDate.minLength ) && $v.user.birthDate.$dirty" class="my-disclaimer">Insira data de aniverário</span>
          </div>
          <div  class="flex flex-grow-3  items-center self-center">
            <p class="mr-3">Gênero:</p>
            <div>
            <input  type="radio" id="male" value="homem" v-model="user.gender" class="mr-2">
            <label for="male" class="mr-3">Homem</label>
            <input type="radio" id="woman" value="mulher" v-model="user.gender" class="mr-2">
            <label for="woman" class="mr-3">Mulher</label>
            <input type="radio" id="other" value="outro" v-model="user.gender" class="mr-2">
            <label for="other" class="mr-3">Outro</label>
            </div>        
             <span v-if="!$v.user.gender.required && !$v.user.gender.dirty  " class="my-disclaimer">Informe seu gênero</span>
          </div>
        </div>

        <div class="flex">
          <div class="flex-grow mr-3">
            <input
              v-model="user.street"
              class="my-input"
              type="text"
              placeholder="Endereço"
            />
            <span v-if="(!$v.user.street.required || !$v.user.street.minLength ) && $v.user.street.$dirty" class="my-disclaimer">Insira nome da rua</span>
          </div>
          <div class="flex-grow-2">
            <the-mask :mask="['#####-###',]"
              v-model="user.cep"
              class="my-input"
              type="text"
              placeholder="CEP"
              v-on:keyup.native="searchCep()"
            />
            <span v-if="(!$v.user.cep.required || !$v.user.cep.minLength ) && $v.user.cep.$dirty" class="my-disclaimer">Insira CEP válido</span>
          </div>
        </div>

        <div class="flex">
          <div class="flex-grow mr-3">
            <input
              v-model="user.number"
              class="my-input"
              type="text"
              placeholder="Número"
            />
            <span v-if="!$v.user.number.required && $v.user.number.$dirty" class="my-disclaimer">Insira número do endereço</span>
          </div>
          <div class="flex-grow mr-3">
            <input
              v-model="user.city"
              class="my-input"
              type="text"
              placeholder="Cidade"
            />
            <span v-if="(!$v.user.city.required || !$v.user.city.minLength ) && $v.user.city.$dirty" class="my-disclaimer">Insira nome da cidade</span>
          </div>
          <div class="flex-grow">
            <input
              v-model="user.state"
              class="my-input"
              type="text"
              placeholder="Estado"
            />
           <span v-if="(!$v.user.state.required || !$v.user.state.minLength ) && $v.user.street.$dirty" class="my-disclaimer">Insira nome da rua</span>
          </div>
        </div>
        <div
          class="text-center mt-6 bg-green-50 border-2	 border-green-200 border-dashed	h-50">
          <p class=" text-center mt-6 mb-4 font-bold text-gray-500">
            Insira uma foto de perfil
          </p>
          <input  class="confirm-btn inline-flex" type="file" @change="onFileSelected">
          <p class=" text-center mt-6 mb-4 text-green-500">
            Ou arraste e solte a imagem aqui
          </p>
        </div>

        <p class="mt-6 mb-4 font-bold text-gray-500	">
          Insira o valor inicial da sua conta:
        </p>
        <currency-input
          v-model="user.amountInAccount"
          class="my-input"
          placeholder="Valor em conta corrente"
        />
        <span v-if="(!$v.user.amountInAccount.required || !$v.user.amountInAccount.minLength ) && $v.user.amountInAccount.$dirty" class="my-disclaimer">Insira o valor atual em conta</span>
        <div class="flex mt-12" >
          <button v-if="isEdit" @click="cancelRegistration()" class="cancel-btn flex-grow mr-3">Cancelar</button>
          <button v-if="!isEdit" @click.prevent="registerUser(user)" class="confirm-btn flex-grow">Cadastrar</button>
          <button v-if="isEdit" @click.prevent="updateUser(user)" class="confirm-btn flex-grow">Salvar ediaçao</button>
        </div>
      </form>
    </div>
  <div v-for="user in users" :key="user.id" class="border-2 rounded-md shadow-lg  p-7 my-7">
    <h1 class="mb-3">{{ user.name }}</h1>
    <div><span class="label">Email:</span>{{ user.email }}</div>
    <div><span class="label">CPF:</span>{{ user.cpf }}</div>
    <div><span class="label">Telephone:</span>{{ user.phone }}</div>
    <div><span class="label">Data de nascimento:</span>{{ user.birthDate }}</div>
    <div><span class="label">Genero:</span>{{ user.gender }}</div>
    <div><span class="label">Endereço:</span>{{user.street}}, {{user.number}} {{ user.cep }}, {{user.city}}, {{user.state}} </div>
    <div><span class="label">Foto:</span>{{user.photo}} </div>
    <div><span class="label">Saldo em conta:</span>R$ {{user.amountInAccount}}  </div>
    <div class="flex justify-end  pt-7">
      <button class="confirm-btn bg-yellow-400 mr-3" @click.prevent="editUser(user)">Editar Cadastro</button>
      <button class="confirm-btn bg-red-400" @click.prevent="removeUser(user.id)">Apagar cadastro</button>
    </div>
  </div>
  </div>
<!--
* não subir código com console.log
* Salvar está dando um reload - não pode dar reload pq pesa a aplicação
* Bloquear cadastro vazio ( validação do form não está ok )
* Criar confirmação ao realizar operação de excluir cadastro
* criar um modo de gerenciar o ID
* Evitar repetição de código, caso ocorra criar funções específicas, com nomes descritivos de fácil entendimento.
* exibir o path da imagem ao salvar 
  -->
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      users: [],
      user: {},
      //userToSave : {}, depois a gente pensa nisso.
      isEdit: false
    };
  },
  validations: {
    user: {
      name: {
      required, 
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    cpf:{
      required,
      minLength: minLength(11)
    }, 
    phone: {
      required,
       minLength: minLength(10)
    },
    birthDate: {
      required,
      minLength:(10)
    },
    gender:  {
      required,
    }, 
    cep: {
      required,
      minLength:(8)
    },
    street:  {
      required,
      minLength:(3)
    },
    number: {
      required,
      minLength:(1)
      
    },
    city:  {
      required,
      minLength:(3)
    },
    state: {
      required,
      minLength:(2)
    },
    photo: {
      required,
    },
    amountInAccount:{
      required,
      minLength:(1)
    },
}
  },
  created() {
      this.users = JSON.parse(localStorage.getItem('usersApp'));
      this.user = this.createUserFromScratch()
  },
  methods: {
    createUserFromScratch () {
      return {
        id:'', // o número tem q ser incrementado, a partir do zero. Criar uma função pra incrementar o id a partir do zero.
        // saber se tem algum usuário salvo, se tiver pega o id e soma 1. senão começa do zero.
        // criar um campo no formulário, para exibir o id do usuário ( o campo pode ser um label ou um input desabilitado.)
        name: '',
        email: '',
        cpf: '', 
        phone: '',
        birthDate: '',
        gender: ' ',
        cep: '',
        street: '',
        number: '',
        city: '',
        state: '',
        photo: null,
        amountInAccount: 0,
      } 
    },
    searchCep(){
      if(this.user.cep.length === 8) {
         axios.get(`https://viacep.com.br/ws/${ this.user.cep }/json/`)
        .then( (response) => {
              console.log(response.data);
              this.user.street = response.data.logradouro,
              this.user.city = response.data.localidade,
              this.user.state = response.data.uf
        })
        .catch( (error) => console.log(error))
      }
    },
    submitForm () {
      this.registerUser()
    },
    onFileSelected(event) {
      console.log(event);
      this.photo = event.target.files[0];
    },

    /* registerUser() {  
      const newUser = {name:'', phone:'' };
      this.users.push(newUser);
    }, */

    registerUser(user){ // mudar pra saveUser()
     
      this.$v.$touch();
      let users = localStorage.getItem('usersApp');
      user.id = new Date().getTime();
      
      if (users) {
        //se já tem contatos...
        users = JSON.parse(users);
        users.push(user);
      }  else {
        users = [user];
      }
      this.users = users;
      localStorage.setItem('usersApp', JSON.stringify(users))
      //this.$router.go();
      this.user = this.createUserFromScratch()
    },

    removeUser(userId) { 
      console.log('chamou o remove user')

      let users = localStorage.getItem('usersApp');
      
      if (!users) return;
      
      users = JSON.parse(users);
      
      users = users.filter((user) => {
         return user.id != userId;
       });
      this.users = users;
       localStorage.setItem('usersApp', JSON.stringify(users))
    },
    editUser(user) {
      this.user = user;
      this.isEdit = true;
    },
    updateUser(user){
     let users = this.users.map( userMap => {
       if (userMap.id === user.id) {    
         return user;
       }
       return userMap;
     });

     this.users = users;
     this.isEdit = false;
     
     localStorage.setItem = ('usersApp', JSON.stringify(users));

     // location.reload(); não faz isso pelo amor de Deus XD 
    this.user = this.createUserFromScratch()
    },
    cancelRegistration: function() {
     this.user = this.createUserFromScratch() 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 24px;
  font-weight: 700;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
