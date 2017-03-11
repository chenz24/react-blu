import Layout from '../components/Layout';
import Index from '../pages/Index';

import Affix from '../pages/AffixPage';
import NotifyPage from '../pages/NotifyPage';
import ModalPage from '../pages/ModalPage';

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
    }, {
      path: 'modal',
      component: ModalPage,
    }],
  },
];
