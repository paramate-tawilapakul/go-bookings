// Prompt is our JavaScript module for all alerts, notifications, and custom popup dialogs
function Prompt() {
  let toast = function (c) {
    const { msg = '', icon = 'success', position = 'top-end' } = c

    const Toast = Swal.mixin({
      toast: true,
      title: msg,
      position: position,
      icon: icon,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({})
  }

  let success = function (c) {
    const { msg = '', title = '', footer = '' } = c

    Swal.fire({
      icon: 'success',
      title: title,
      text: msg,
      footer: footer
    })
  }

  let error = function (c) {
    const { msg = '', title = '', footer = '' } = c

    Swal.fire({
      icon: 'error',
      title: title,
      text: msg,
      footer: footer
    })
  }

  async function custom(c) {
    const { icon = '', msg = '', title = '', showConfirmButton = true } = c

    const { value: result } = await Swal.fire({
      icon: icon,
      title: title,
      html: msg,
      backdrop: false,
      focusConfirm: false,
      showCancelButton: true,
      showConfirmButton: showConfirmButton,
      willOpen: () => {
        if (c.willOpen !== undefined) {
          c.willOpen()
        }
      },
      didOpen: () => {
        if (c.didOpen !== undefined) {
          c.didOpen()
        }
      }
    })

    if (result) {
      // if not hit cancel button
      if (result.dismiss !== Swal.DismissReason.cancel) {
        // if has value
        if (result.value !== '') {
          // check if callback function is exist
          if (c.callback !== undefined) {
            // call the function
            c.callback(result)
          }
        } else {
          c.callback(false)
        }
      } else {
        // else hit cancel
        c.callback(false)
      }
    }
  }

  return {
    toast: toast,
    success: success,
    error: error,
    custom: custom
  }
}
