import Layout from '../components/Layout';
import Index from '../pages/Index';

import Affix from '../pages/AffixPage';
import NotifyPage from '../pages/NotifyPage';
import ModalPage from '../pages/ModalPage';
import DataTablePage from '../pages/DataTablePage';
import PaginationPage from '../pages/PaginationPage';
import MenuPage from '../pages/MenuPage';
import AlertPage from '../pages/AlertPage';
import TagPage from '../pages/TagPage';
import TabPage from '../pages/TabPage';
import AsidePage from '../pages/AsidePage';
import TooltipPage from '../pages/TooltipPage';

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
    }, {
      path: 'alert',
      component: AlertPage,
    }, {
      path: 'tag',
      component: TagPage,
    }, {
      path: 'tabs',
      component: TabPage,
    }, {
      path: 'aside',
      component: AsidePage,
    }, {
      path: 'tooltip',
      component: TooltipPage,
    }],
  },
];
