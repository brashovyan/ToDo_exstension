<template>
  <div class="main__div">
    <!-- Логин -->
    <template v-if="login_status == false">
      <div class="login">
        <input type="email" placeholder="Email" v-model="login_text">
        <input type="password" placeholder="Password" v-model="password_text">
        <button @click="login">Войти</button>
      </div>
    </template>

    <!-- Основная формочка -->
    <template v-if="login_status == true">
      <div class="calendar__main__div">
        <div class="calendar__div">
          <DatePicker v-model="date" mode="dateTime" :min-date='new Date()' is24hr/>
        </div>

        <div class="add__task">
          <textarea cols="29" rows="8" name="user_task" class="user__task" v-model="user_task"></textarea>
          {{ test }}
          <button @click="create_task" class="btn__task">Создать</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import axios, {isCancel, AxiosError} from 'axios';

export default {
  components: {
    DatePicker,
  },
  name: 'popupView',
  data () {
    return {
      login_status: false,
      login_text: "",
      password_text: "",
      user_id: "",
      task_list: false,

      date: new Date(),
      user_task: "",
      test: "",
    }
  },

  mounted() {
      // при открытии расширения
      this.login();
      
  },

  methods: {
    // здесь логика логина. По хорошему сервак просто должен вернуть true или false
    login(){
      // пытаюсь получить логин и пароль с локального хранилища
      // в будущем там можно хранить токены
      let login = localStorage.getItem('login');
      let password = localStorage.getItem('password');
      this.user_id = localStorage.getItem('user_id');

      if(login && password){
        if(this.login_text == login && this.password_text == password){
          this.login_status = true;
        }
      }
      else{
        localStorage.setItem('login', "admin");
        localStorage.setItem('password', "123");
        localStorage.setItem('user_id', "1");
      }
      this.login_status = true;
    },

    // создать задачу
    create_task(){
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();
     
      // getHours не работает, поэтому костыли
      let s = this.date.toString();
      s = s.split(":");
      let hours = s[0].slice(-2);
      let minutes = s[1]

      // дата задачи (строка) в формате %Y-%m-%d %H:%M:%S
      let task_date = `${year}-${month}-${day} ${hours}:${minutes}:00`;

      // текст задачи
      let task_text = this.user_task;

      // post запрос бэку
      let info = "";
      let error_msg = "";
      let article = { user_id: this.user_id,
                        header: task_text,
                        start_time: task_date,
                      };
      axios.post("http://192.168.142.50:8000/create_task", article)
        .then(response => this.test = response.data)
        .catch(error => {
          this.test = error.message;     
      });
    

    },
  },
}
</script>

<style>
body{
  background: linear-gradient(rgb(164, 164, 254), rgb(189, 255, 191));
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 350px;
  height: 100%;
  
  margin: 0;
  padding: 0;
}

.app{
  width: 350px;
  height: 100%;
}

.main__div{
  width: 350px;
  height: 100%;
}

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 450px;
  flex-direction: column;
}

.calendar__main__div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.calendar__div{
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
}

.add__task{
  width: 250px;
  height: 100%;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 30px;
  border-radius: 0.5rem;
}

.user__task{
  margin: 7px;
}

.btn__task{
  margin-left: 7px;
  margin-bottom: 7px;
  background-color: rgb(239, 239, 254);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn__task:hover{
  background-color: rgb(194, 194, 255);
}
</style>
