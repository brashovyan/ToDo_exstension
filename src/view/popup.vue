<template>
  <div class="main__div">

    <!-- Логин -->
    <template v-if="login_status == false && login == true">
      <div class="login">
        <input type="email" placeholder="Email" v-model="login_email">
        <input type="password" placeholder="Password" v-model="login_password">
        <button @click="login_try">Войти</button>
        <button @click="login_try_google">Гугл</button>
        <button @click="register_show">Зарегистрироваться</button>
      </div>
    </template>

    <!-- Регистрация -->
    <template v-if="login_status == false && register == true">
      <div class="login">
        <input type="email" placeholder="Email" v-model="register_email">
        <input type="password" placeholder="Password" v-model="register_password">
        <button @click="register_func">Регистрация</button>
        <button @click="login_show">Назад</button>
      </div>
    </template>

    <!-- Формочка добавления задачи -->
    <template v-if="login_status == true && add_task == true">
      <button class="login__back" @click="list_task_show">Назад</button>
      <div class="calendar__main__div">
        <div class="calendar__div">
          <DatePicker v-model="date" mode="dateTime" :min-date='new Date()' is24hr/>
        </div>

        <div class="add__task">
          <textarea cols="29" rows="8" name="user_task" class="user__task" v-model="user_task"></textarea>
          <button @click="create_task" class="btn__task">Создать</button>
        </div>
      </div>
    </template>

    <!-- Список задач (главная) -->
    <template v-if="login_status == true && list_task == true ">
      <div class="main__buttons">
        <button class="main__btn" @click="logout_func">Выйти</button>
        <div>
          <button class="main__btn" @click="add_task_show">Добавить задачу</button>
          <button class="main__btn" @click="statistic_show">Статистика</button>
        </div>
      </div>
      <div class="list__task__main">
        <template v-for="(task, index) in received_tasks.tasks" :key="index">
          <div class="task__div">
            <p>{{ task.header }}</p>
            <p>{{ task.text }}</p>
            <p>{{ task.start_time }}</p>
            <P>{{ task.status }}</P>
          </div>
        </template>
      </div>
    </template>

    <!-- Статистика -->
    <template v-if="login_status == true && statistics == true ">
      <button class="login__back" @click="list_task_show">Назад</button>
      <p>Статистика</p>
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
      // переменные для навигации
      login_status: false,
      add_task: false,
      list_task: false,
      statistics: false,
      register: false,
      login: false,

      // переменные для регистрации
      register_email: "",
      register_password: "",

      // переменные для логина
      login_email: "",
      login_password: "",
      user_id: "",
      google_token: "huy",
      google_email: "email",
      google_id: "id",
      register_status: "",

      // переменные для создания задачи
      date: new Date(),
      user_task: "",
      answer: "",
      answer_error: "",
      test: "",

      // переменные для списка задач
      received_tasks: [],
      tasks_error: "",
    }
  },

  mounted() {
      // при открытии расширения
      this.login_func();
  },

  methods: {
    // здесь проверяю залогинен ли чувак
    // получается у него должен быть user_id либо в localStorage, либо в глобальной пременной user_id
    // если ни того, ни другого, то показываю ему окно логина
    login_func(){
      if(this.user_id != "" && this.user_id){
          this.list_task_show();
      }
      else{
        chrome.storage.local.get(["user_id"]).then((result) => {
          if(result['user_id']){
            this.user_id = result['user_id'].toString();
            this.list_task_show();
          }
          else{
            this.login_show();
          }
        });
      }
    },

    // здесь чел пытается залогиниться
    login_try(){
      let article = { email: this.login_email,
                      password: this.login_password,
                    };
      axios.post("https://663b-130-0-219-137.ngrok-free.app/login_user", article)
        .then(response => {this.user_id = response.data.user_id; this.save_user();})
        .catch(error => { console.log(error.message); });
    },

    login_try_google(){

      chrome.identity.getAuthToken({ interactive: true },  (token) => {
        //setTimeout(() => this.google_token = token, 3000);
        //this.google_token = token;
        this.google_token = token;

        chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (user_info) => {
        //setTimeout(() => this.google_email = user_info.email, 3000);
        //console.log(user_info.email)
        this.google_email = user_info.email;
        this.google_id = user_info.id;

        // при регистрации я посылю ему post запрос
        let article = { email: this.google_email,
                        password: this.google_id,
                        auth_token: this.google_token,
                      };
        axios.post("https://663b-130-0-219-137.ngrok-free.app/create_user", article)
          .then(response => {
                              if(response.data.status == "user_exist"){

                                let article = { email: this.google_email,
                                                  password: this.google_id, 
                                              };
                                axios.post("https://663b-130-0-219-137.ngrok-free.app/login_user", article)
                                  .then(response => {this.user_id = response.data.user_id; this.save_user();})
                                  .catch(error => { console.log(error.message);
                                });
                              }
                              else{
                                this.user_id = response.data.id;
                                this.save_user();
                              }
                               
                            })
          .catch(error => { console.log(error.message); });
        }); 
      }); 
    },

    // регистрация
    register_func(){
      // при регистрации я посылю ему post запрос
      let article = { email: this.register_email,
                      password: this.register_password,
                    };
      axios.post("https://663b-130-0-219-137.ngrok-free.app/create_user", article)
        .then(response => {this.user_id = response.data.user_id; this.save_user();})
        .catch(error => { console.log(error.message); });
    },

    save_user(){
      chrome.storage.local.set({ user_id: this.user_id.toString() }).then(() => {
        console.log("Добавлен user_id");
      });

      this.login_func();
    },

    logout_func(){
      this.user_id = "";
      chrome.storage.local.clear();
      this.login_show();
    },

    login_show(){
      this.login_status = false;
      this.list_task = false;
      this.add_task = false;
      this.statistics = false;
      this.register = false;
      this.login = true;
    },

    add_task_show(){
      this.login_status = true;
      this.list_task = false;
      this.add_task = true;
      this.statistics = false;
      this.register = false;
      this.login = false;
    },

    statistic_show(){
      this.login_status = true;
      this.list_task = false;
      this.add_task = false;
      this.statistics = true;
      this.register = false;
      this.login = false;
    },

    register_show(){
      this.login_status = false;
      this.list_task = true;
      this.add_task = false;
      this.statistics = false;
      this.register = true;
      this.login = false;
    },

    list_task_show(){
      this.login_status = true;
      this.list_task = true;
      this.add_task = false;
      this.statistics = false;
      this.register = false;
      this.login = false;

      // здесь я получаю список задач
      let article = { user_id: this.user_id,
                    };
      axios.post("https://663b-130-0-219-137.ngrok-free.app/get_user_tasks", article)
        .then(response => {this.received_tasks = response.data;})
        .catch(error => { console.log(error.message); });
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
      let article = { user_id: this.user_id,
                        header: task_text,
                        start_time: task_date,
                      };
      axios.post("https://663b-130-0-219-137.ngrok-free.app/create_task", article)
        .then(response => {this.test = response.data; this.list_task_show()})
        .catch(error => { this.test = error.message; this.list_task_show()});
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
  margin-top: 10px;
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
  background-color: rgb(218, 218, 255);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.btn__task:hover{
  background-color: rgb(194, 194, 255);
}

.login__back{
  margin-top: 10px;
  margin-left: 10px;
  margin-left: 7px;
  margin-bottom: 7px;
  background-color: rgb(207, 255, 185);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.login__back:hover{
  background-color: rgb(152, 255, 159);
}

.main__buttons{
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.main__btn{
  background-color: rgb(207, 255, 185);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 5px;
}

.main__btn:hover{
  background-color: rgb(152, 255, 159);
}

.list__task__main{
  height: 100%;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 5px;
}

.task__div{
  background-color: rgb(240, 240, 240);
  border-radius: 0.5rem;
  margin: 5px;
  padding: 5px;
}
</style>
