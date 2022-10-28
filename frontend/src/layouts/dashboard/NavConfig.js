// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Products',
    path: '/',
    icon: getIcon('eva:shopping-bag-fill'),
  },
];

const token = localStorage.getItem('Token');
if (token)
  navConfig.push({
    title: 'My Products',
    path: '/my-item',
    icon: getIcon('eva:file-text-fill'),
  });

export default navConfig;
