document.addEventListener('DOMContentLoaded', function() {
  // Botones de autenticación en la barra de navegación
  const loginBtn = document.querySelector('.login-btn');
  const registerBtn = document.querySelector('.register-btn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      document.querySelector('a[href="#login"]')?.click();
    });
  }
  
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      document.querySelector('a[href="#register"]')?.click();
    });
  }
  
  // Formulario de registro
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nombre = document.getElementById('register-nombre').value;
      const apellido = document.getElementById('register-apellido').value;
      const email = document.getElementById('register-email').value;
      const telefono = document.getElementById('register-telefono').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      
      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      try {
        // Llamar a la función de registro
        await registrarUsuario(email, password, nombre, apellido, telefono);
        alert('¡Registro exitoso! Por favor verifica tu correo electrónico para confirmar tu cuenta.');
        // Redirigir al login
        document.querySelector('a[href="#login"]')?.click();
      } catch (error) {
        alert(`Error al registrarse: ${error.message}`);
      }
    });
  }
  
  // Formulario de inicio de sesión
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      try {
        // Llamar a la función de inicio de sesión
        await iniciarSesion(email, password);
        alert('¡Inicio de sesión exitoso!');
        // Redirigir al inicio
        document.querySelector('a[href="#inicio"]')?.click();
      } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
      }
    });
  }
});