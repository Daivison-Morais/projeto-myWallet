import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export default function notify(msg) {
    return Toastify({
      text: msg,
      position: "center",
      style: {
        background: "linear-gradient(to right, #a258f3, #e649e6",
      },
    }).showToast();
  }