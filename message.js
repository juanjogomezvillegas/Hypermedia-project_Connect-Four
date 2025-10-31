
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, messages of javascript file
*/

/* CONSTANTS */

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

/* FUNCTIONS */

/*
* showMsgCongratulations: show a message congratulations, reporting the name of the winning player
*/
function showMsgCongratulations(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        draggable: true
    });
}

/*
* showAlert: show a toast alert in case of error
*/
function showAlert(icon, title) {
    Toast.fire({
        icon: icon,
        title: title
    });
}
