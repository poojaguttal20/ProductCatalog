export default function Validation({ name, value }){
    let error = '';
    switch (name) {
      case 'name':
        error = value.length < 3 ? 'Name must be at least 3 characters long' : '';
        break;
      case 'mobile':
        error = value.length < 10 || value.length > 10 ? 'Mobile number must be at least 10 digits long' : '';
        break;
      case 'email':
        error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
        break;
      case 'password':
        error = value.length < 8 ? 'Password must be at least 8 characters long' : '';
        break;
      default:
        break;
    }
    return error;
}