
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

function showMsgCongratulations(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        draggable: true
    });
}

function showAlert(icon, title) {
    Toast.fire({
        icon: icon,
        title: title
    });
}
