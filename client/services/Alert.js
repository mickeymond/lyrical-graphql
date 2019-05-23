import Swal from 'sweetalert2';

export default (type, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });
  
  Toast.fire({ type, title });
}
