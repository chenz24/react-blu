import Layout from '../components/Layout';
import Index from '../pages/Index';

import Affix from '../pages/AffixPage';
import NotifyPage from '../pages/NotifyPage';

export default [
  {
    path: '',
    component: Layout,
    childRoutes: [
      {
        path: '/',
        component: Index,
      },
    ],
  },
  {
    path: 'components',
    component: Layout,
    childRoutes: [{
      path: 'affix',
      component: Affix,
    }, {
      path: 'notify',
      component: NotifyPage,
    }],
  },
];
