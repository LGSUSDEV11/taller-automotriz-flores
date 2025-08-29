// Función para registrar usuarios
async function registrarUsuario(email, password, nombre, apellido, telefono) {
  try {
    // Registrar usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password
    });
    
    if (authError) throw authError;
    
    // Si el registro fue exitoso, guardar información adicional en la tabla perfiles
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('perfiles')
        .insert([
          {
            id: authData.user.id,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono || null,
            rol: 'cliente'
          }
        ]);
      
      if (profileError) throw profileError;
    }
    
    return authData;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

// Función para iniciar sesión
async function iniciarSesion(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) throw error;
    
    // Actualizar última conexión
    if (data.user) {
      await supabase
        .from('perfiles')
        .update({ ultima_conexion: new Date() })
        .eq('id', data.user.id);
    }
    
    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

// Función para cerrar sesión
async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
}

// Verificar estado de autenticación
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    console.log("Usuario conectado:", session.user.id);
    // Aquí puedes actualizar la interfaz para usuarios conectados
    actualizarInterfazUsuarioConectado(session.user);
  } else if (event === 'SIGNED_OUT') {
    console.log("Usuario desconectado");
    // Aquí puedes actualizar la interfaz para usuarios desconectados
    actualizarInterfazUsuarioDesconectado();
  }
});

// Función para actualizar la interfaz cuando un usuario inicia sesión
function actualizarInterfazUsuarioConectado(user) {
  // Ocultar botones de login/registro
  document.querySelector('.login-btn').style.display = 'none';
  document.querySelector('.register-btn').style.display = 'none';
  
  // Crear botón de perfil y cerrar sesión si no existen
  if (!document.querySelector('.profile-btn')) {
    const authButtons = document.querySelector('.auth-buttons');
    
    const profileBtn = document.createElement('button');
    profileBtn.className = 'profile-btn';
    profileBtn.textContent = 'Mi Perfil';
    profileBtn.addEventListener('click', () => {
      // Navegar a la sección de perfil
      document.querySelector('a[href="#perfil"]')?.click();
    });
    
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.textContent = 'Cerrar Sesión';
    logoutBtn.addEventListener('click', async () => {
      await cerrarSesion();
    });
    
    authButtons.appendChild(profileBtn);
    authButtons.appendChild(logoutBtn);
  }
}

// Función para actualizar la interfaz cuando un usuario cierra sesión
function actualizarInterfazUsuarioDesconectado() {
  // Mostrar botones de login/registro
  document.querySelector('.login-btn').style.display = 'block';
  document.querySelector('.register-btn').style.display = 'block';
  
  // Eliminar botones de perfil y cerrar sesión
  document.querySelector('.profile-btn')?.remove();
  document.querySelector('.logout-btn')?.remove();
}