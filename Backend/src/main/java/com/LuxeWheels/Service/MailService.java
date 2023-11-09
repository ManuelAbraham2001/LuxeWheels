package com.LuxeWheels.Service;

import com.LuxeWheels.Entity.Usuario;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(Usuario usuario, String subject) throws MessagingException {

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("luxe.wheels2023@gmail.com");
        helper.setTo(usuario.getEmail());
        helper.setSubject(subject);

        String htmlContent = "<html>\n" +
                "<body>\n" +
                "    <p>Hola <strong> " + usuario.getNombre() + " </strong>,</p>\n" +
                "    <p>Tu registro en nuestro sitio ha sido exitoso. ¡Bienvenido a LuxeWheels!</p>\n" +
                "    <p>Estamos emocionados de tenerte como parte de nuestra comunidad.</p>\n" +
                "    <p>Por favor, verifica que la información que proporcionaste sea correcta:</p>\n" +
                "    <ul>\n" +
                "        <li><strong>Nombre de Usuario:</strong> " + usuario.getNombre() + " " + usuario.getApellido() + " </li>\n" +
                "        <li><strong>Correo Electrónico:</strong>"+ usuario.getEmail() + "</li>\n" +
                "    </ul>\n" +
                "    <p>Si los datos son correctos, puedes iniciar sesión haciendo clic en el siguiente botón:</p>\n" +
                "    <a href=\"http://localhost:5173/login\">\n" +
                "        <button style=\"background-color: #007bff; color: #fff; padding: 10px 20px; border: none; cursor: pointer;\">Iniciar Sesión</button>\n" +
                "    </a>\n" +
                "    <p>Si necesitas realizar alguna corrección, por favor contáctanos lo antes posible.</p>\n" +
                "</body>\n" +
                "</html>";

        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }

}
