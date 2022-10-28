import jwtDecode from 'jwt-decode';
import { JWT_TOKEN } from '../../utils/constants';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const getNavConfig = () => {
  let config = [
    {
      title: 'Products',
      path: '/',
      icon: getIcon('eva:shopping-bag-fill'),
    },
  ];
  const token = localStorage.getItem('Token');
  if (token) {
    const decodedToken = jwtDecode(token, JWT_TOKEN);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('Token');
    } else if (decodedToken.user.role === 'seller') {
      config.push({ title: 'My Products', path: '/my-item', icon: getIcon('eva:file-text-fill') });
    }
  }
  return config;
};

export default getNavConfig;
