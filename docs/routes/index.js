import Layout from '../components/Layout';
import Index from '../pages/Index';

import Affix from '../pages/AffixPage';
import NotifyPage from '../pages/NotifyPage';
import ModalPage from '../pages/ModalPage';
import DataTablePage from '../pages/DataTablePage';
import PaginationPage from '../pages/PaginationPage';
import MenuPage from '../pages/MenuPage';

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
    }, {
      path: 'datatable',
      component: DataTablePage,
    }, {
      path: 'pagination',
      component: PaginationPage,
    }, {
      path: 'menu',
      component: MenuPage,
    }],
  },
];
