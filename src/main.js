import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList.vue';

import NotFound from '@/components/nav/NotFound.vue';

import TeamMembers from '@/components/teams/TeamMembers.vue';

import TeamsFooter from '@/components/teams/TeamsFooter.vue';

import UsersList from './components/users/UsersList.vue';

import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      path: '/teams',
      name: 'teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers },
      ],
    },
    {
      path: '/users',
      // beforeEnter(to, from, next) {
      //   console.log(to, from);
      //   next();
      // },
      components: { default: UsersList, footer: UsersFooter },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  scrollBehavior(_, _2, savedPos) {
    if (savedPos) {
      return savedPos;
    }
    return {
      left: 0,
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach(function (to, from, next) {
  console.log(to, from);
  next();
});

const app = createApp(App);

app.use(router);

app.mount('#app');
