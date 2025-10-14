export const verifyEmail = (name, verificationLink) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>¡Hola, ${name}! 👋</h2>
    <p>Gracias por registrarte en <strong>Tu App</strong>.</p>
    <p>Para activar tu cuenta, hacé clic en el siguiente botón:</p>
    <a href="${verificationLink}"
       style="background-color: #28a745; color: white; padding: 10px 20px; border-radius: 5px;
              text-decoration: none; display: inline-block; margin-top: 10px;">
      Verificar mi cuenta
    </a>
    <p>Este enlace expirará en 24 horas.</p>
    <br/>
    <p>Si no te registraste, ignorá este mensaje.</p>
  </div>
`;
